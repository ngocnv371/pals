export interface State {
  my: Side;
  their: Side;
  turn: number;
  dungeon: string | null;
  result: Result;
  fusion: Fusion | null;
  battle: Battle | null;
  spotlightIndex: number | null;
  stage: Stage;
}

export enum Stance {
  Offensive,
  Defensive,
}

export interface Unit {
  cardId: string;
  /**
   * the stance of the unit, take no damage to `life` when `defensive`, can't change to `defensive` if acted in this turn
   */
  stance: Stance;
  /**
   * indicated if this unit has acted (attacked) in this turn
   *
   * each unit  can only acted once in a turn
   */
  acted: boolean;
}

export type Formation = Unit[];

export interface Battle {
  attacker: string;
  receiver: string;
  stance: Stance;
}

export interface Side {
  level: number;
  /**
   *  loose when reach 0
   */
  life: number;
  /**
   * all owned cards, `DECK_SIZE` at the start
   */
  deck: string[];
  /**
   * drawed from deck to 5 each turn
   */
  hand: string[];
  /**
   * dead cards
   */
  graveyard: string[];
  /**
   * first line for offensive/defensive
   */
  deployed: Formation;

  deploymentPlan: {
    /**
     * indices of item in `hand` to be deployed
     */
    handIndices: number[];
    /**
     * index of `deployed` formation to place
     */
    unitIndex: number | null;
    /**
     * list of cards to be fused
     */
    queue: string[];
  } | null;

  offensivePlan: {
    /**
     * index of unit in `deployed` formation to be used for the attack
     */
    unitIndex: number | null;
    /**
     * index of unit in ene's `deployed` formation to receive the attack
     */
    targetUnitIndex: number | null;
  } | null;
}

export enum Stage {
  Started = "Started",
  Drawing = "Drawing",
  PresentingHand = "PresentingHand",
  PresentingDeploymentFormation = "PresentingDeploymentFormation",
  FusionQueue = "FusionQueue",
  Fusion = "Fusion",
  Placing = "Placing",
  Battle = "Battle",
  BattleCheck = "BattleCheck",
  PresentingBattleFormation = "PresentingBattleFormation",
  PresentingTargets = "PresentingTargets",
  BattleVisualizer = "BattleVisualizer",
  BattleResultCheck = "BattleResultCheck",
  NewTurn = "NewTurn",
  Ended = "Ended",
}

export interface Fusion {
  card1: string;
  card2: string;
  result: string;
}

export interface DeploymentUnit {
  cardId: string | null;
  index: number;
}

export enum Result {
  Win,
  Loose,
  Tie,
  Unresolved,
}
