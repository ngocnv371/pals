import { breedPals } from "../../pals/service";
import { Result, Fusion, Side, State, Stage, Stance } from "./model";

export class DuelStateMachine {
  private readonly HAND_SIZE = 5;

  constructor(private state: State) {}

  private get side() {
    return [this.state.my, this.state.their][this.state.turn % 2];
  }

  private get otherSide() {
    return [this.state.their, this.state.my][this.state.turn % 2];
  }

  start() {
    Object.assign(this.state, DuelStateMachine.getInitialState());
  }

  private static getInitialSide(): Side {
    return {
      level: 0,
      life: 0,
      deck: [],
      deployed: [],
      graveyard: [],
      hand: [],
      deploymentPlan: null,
      offensivePlan: null,
    };
  }

  private static getInitialState(): State {
    return {
      my: DuelStateMachine.getInitialSide(),
      their: DuelStateMachine.getInitialSide(),
      battle: null,
      fusion: null,
      dungeon: null,
      result: Result.Unresolved,
      spotlightIndex: null,
      stage: Stage.Started,
      turn: 0,
    };
  }

  nextTurn() {
    this.state.turn++;
    console.debug("new turn", this.state.turn);
    this.state.battle = null;
    this.state.fusion = null;
    this.state.spotlightIndex = null;
    this.resetUnitActions();

    this.advanceTo(Stage.Drawing);
  }

  private resetUnitActions() {
    this.side.deployed.forEach((d) => (d.acted = false));
  }

  /**
   * attempt to fill the hand with cards from deck
   * @returns number of drawn cards
   */
  drawCards() {
    if (this.state.stage !== Stage.Drawing) {
      console.error("invalid stage");
      return 0;
    }

    console.debug("draw cards");
    const cardsInDeck = this.side.deck.length;
    if (cardsInDeck <= 0) {
      console.debug("out of cards");
      this.advanceTo(Stage.PresentingHand);
      return 0;
    }

    const neededCards = this.HAND_SIZE - this.side.hand.length;
    if (neededCards <= 0) {
      console.debug("hand is full");
      this.advanceTo(Stage.PresentingHand);
      return 0;
    }

    const items = this.side.deck.splice(0, neededCards);
    this.side.hand = this.side.hand.concat(items);
    console.debug("drawn", items);
    this.advanceTo(Stage.PresentingHand);
    return items.length;
  }

  selectCardsForDeployment(indices: number[]) {
    if (this.state.stage !== Stage.PresentingHand) {
      console.error("invalid stage");
      return;
    }

    console.debug(
      "select cards",
      indices.map((i) => this.side.hand[i])
    );
    this.side.deploymentPlan = {
      handIndices: indices,
      queue: [],
      unitIndex: null,
    };
    this.advanceTo(Stage.PresentingDeploymentFormation);
  }

  selectTargetDeploymentPosition(index: number) {
    if (this.state.stage !== Stage.PresentingDeploymentFormation) {
      console.error("invalid stage");
      return;
    }

    const plan = this.side.deploymentPlan;
    if (!plan) {
      console.error("deployment plan missing");
      return;
    }

    plan.unitIndex = index;

    // calculate fusion queue
    plan.queue = plan.handIndices
      .map((idx) => this.side.hand[idx])
      .concat(this.side.deployed[index].cardId)
      .filter(Boolean);
    console.debug("fusion queue", plan.queue);

    this.advanceTo(Stage.FusionQueue);
  }

  fuse() {
    if (this.state.stage !== Stage.FusionQueue) {
      console.error("invalid stage");
      return;
    }

    const plan = this.side.deploymentPlan;
    if (!plan) {
      console.error("deployment plan missing");
      return;
    }

    if (plan.queue.length < 1) {
      console.error("fusion queue invalid");
      return;
    }

    if (plan.queue.length == 1) {
      console.debug("queue finished");
      this.advanceTo(Stage.Placing);
      return;
    }

    const [card1, card2] = plan.queue.splice(0, 2);
    const result = breedPals(card1, card2);
    console.debug(`fused ${card1} + ${card2} => ${result}`);
    this.state.fusion = {
      card1,
      card2,
      result,
    };
    this.advanceTo(Stage.Fusion);
  }

  skipDeployment() {
    if (this.state.stage !== Stage.PresentingHand) {
      console.error("invalid stage");
      return;
    }

    console.debug("skip deployment");
    this.advanceTo(Stage.Battle);
  }

  selectUnitForBattle(index: number) {
    if (this.state.stage !== Stage.PresentingBattleFormation) {
      console.error("invalid stage");
      return;
    }

    console.debug("selected unit for battle", this.side.deployed[index].cardId);
    this.side.offensivePlan = {
      unitIndex: index,
      targetUnitIndex: null,
    };

    this.advanceTo(Stage.PresentingTargets);
  }

  selectTargetUnit(index: number) {
    if (this.state.stage !== Stage.PresentingTargets) {
      console.error("invalid stage");
      return;
    }

    if (!this.side.offensivePlan) {
      console.error("offensive plan missing");
      return;
    }

    console.debug(
      "selected target unit",
      this.otherSide.deployed[index].cardId
    );
    this.side.offensivePlan.targetUnitIndex = index;

    this.advanceTo(Stage.BattleVisualizer);
  }

  skipBattle() {
    if (this.state.stage !== Stage.Battle) {
      console.error("invalid stage");
      return;
    }

    console.debug("skip battle");
    this.nextTurn();
  }

  changeUnitToDefensive(index: number) {
    if (this.state.stage !== Stage.Battle) {
      console.error("invalid stage");
      return;
    }

    const unit = this.side.deployed[index];
    if (!unit || !unit.cardId) {
      console.error("invalid unit");
      return;
    }

    console.debug("change unit to defensive", unit.cardId);
    unit.acted = true;
    unit.stance = Stance.Defensive;
  }

  surrender() {
    console.debug("surrendered");
    this.state.result = Result.Loose;
    this.advanceTo(Stage.Ended);
  }

  advanceTo(stage: Stage) {
    console.debug("advancing to", stage);
    this.state.stage = stage;
  }
}
