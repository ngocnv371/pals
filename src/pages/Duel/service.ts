import { Chance } from "chance";
import { uniqBy } from "lodash";
import {
  Side,
  CardStance,
  Battle,
  ClassAnimationSegment,
  Fusion,
  BreedingResult,
  ReserveItem,
  TargetCell as DeploymentTarget,
} from "./model";
import { breedPals, getAllPals, getPalById } from "../pals/service";
import { DECK_SIZE, DUMMY_CARD } from "../Deck/model";
import { getDungeon } from "../Dungeons/service";
import { linearScale } from "../../utils/linearScale";
import { getConfig } from "../config/service";
const chance = new Chance();

export function generateTheirDeck() {
  return chance.n(
    () => chance.pickone(getAllPals().filter((p) => p.rarity < 5)).id,
    DECK_SIZE
  );
}

/**
 * get a reward from the graveyard
 * @param side
 * @returns
 */
export function getReward(side: Side): string {
  return chance.pickone(side.graveyard) || DUMMY_CARD;
}

export function initSide(level: number): Side {
  return {
    level,
    life: getMaxLife(level),
    deck: [],
    graveyard: [],
    reserves: [],
    forward: [null, null, null, null, null],
    support: [null, null, null, null, null],
  };
}

export function getMaxLife(level: number) {
  if (level <= 0) {
    return 1;
  }

  const config = getConfig().duel.life.scale.byLevel;
  if (level >= config.level) {
    return config.linear.to;
  }

  const scale = linearScale(
    config.linear.from,
    config.linear.to,
    config.level - 1
  );
  const value = scale.find((i) => i > level) || 1;
  return Math.floor(value);
}

export function getDeckSize(level: number) {
  if (level <= 0) {
    return 1;
  }

  const config = getConfig().deck.size.scale.byLevel;
  if (level >= config.level) {
    return config.linear.to;
  }

  const scale = linearScale(
    config.linear.from,
    config.linear.to,
    config.level - 1
  );
  const value = scale.find((i) => i > level) || 1;
  return Math.floor(value);
}

export function refillReserves(side: Side, size: number) {
  while (side.reserves.length < size) {
    const item = side.deck.pop();
    if (!item) {
      console.warn("not enough cards to fill up reserves");
      break;
    }

    side.reserves.push(item);
  }
}

export interface EvaluatedPlan {
  indices: number[];
  targetIndex: number;
  result: string;
  power: number;
}

/**
 * get all unique combinations of 2 items in an array
 * @example getCombinations([1,2]) => [[0, 1], [1, 0]]
 * @param items
 * @returns array of indices, not values
 */
function getCombinations<T>(items: T[]) {
  const combinations: number[][] = [];

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      combinations.push([i, j]);
      combinations.push([j, i]);
    }
  }

  return combinations;
}

/**
 * breed the item in reserves as indicated by the indices and return the result `attack power`
 * @param reserves
 * @param indices
 * @returns
 */
function getCombinationPower(reserves: ReserveItem[], indices: number[]) {
  if (indices.length == 1) {
    const card = reserves[indices[0]].cardId;
    return {
      breed: card,
      power: getPalById(card).attack,
    };
  }

  const breed =
    breedPals(reserves[indices[0]].cardId, reserves[indices[1]].cardId) ||
    reserves[indices[1]].cardId;
  const power = getPalById(breed).attack;
  return { breed, power };
}

export function getValidDeploymentTargets(side: Side): DeploymentTarget[] {
  const allTargets = side.forward.map((f, index) => ({
    index,
    cardId: f?.cardId || "",
  }));
  const targets = uniqBy(allTargets, (t) => t.cardId);
  return targets;
}

interface Plan {
  combination: EvaluatedCombination;
  target: DeploymentTarget;
}

interface EvaluatedCombination {
  indices: number[];
  breed: string;
  power: number;
}

function evaluatePlan(plan: Plan): EvaluatedPlan {
  if (plan.target.cardId) {
    const breed =
      breedPals(plan.combination.breed, plan.target.cardId) ||
      plan.target.cardId;
    const power = getPalById(breed).attack;
    return {
      indices: plan.combination.indices,
      targetIndex: plan.target.index,
      result: breed,
      power: power,
    } as EvaluatedPlan;
  } else {
    return {
      indices: plan.combination.indices,
      targetIndex: plan.target.index,
      result: plan.combination.breed,
      power: plan.combination.power,
    };
  }
}

export function getDeploymentPlans(side: Side): EvaluatedPlan[] {
  const reserves: ReserveItem[] = side.reserves.map((cardId, index) => ({
    index,
    cardId,
  }));
  console.debug(`reserves`, side.reserves);
  const singles = reserves.map((r) => [r.index]);
  const combinations = getCombinations(reserves).concat(singles);
  const sortedByPower: EvaluatedCombination[] = combinations
    .map((c) => ({ indices: c, ...getCombinationPower(reserves, c) }))
    .sort((a, b) => a.power - b.power);
  console.debug(`sorted reserves`, sortedByPower);

  const validTargets = getValidDeploymentTargets(side);
  // place all the combinations into each targets, see which one yield the best result
  const plans = sortedByPower.flatMap((p) =>
    validTargets.map((v) => ({ combination: p, target: v }))
  );
  const evalPlans: EvaluatedPlan[] = plans
    .map(evaluatePlan)
    .sort((a, b) => a.power - b.power);
  console.debug(`eval plans`, evalPlans);

  return evalPlans;
}

export function selectReserves(side: Side, indices: number[]) {
  side.deploymentPlan = {
    selectedReservesIndices: indices,
    queue: [],
  };
}

export function selectDeploymentTarget(side: Side, index: number) {
  if (!side.deploymentPlan) {
    console.error("deployment plan not initiated");
    return;
  }

  side.deploymentPlan!.targetIndex = index;
}

function removeFrom(source: string[], deleteItems: string[]) {
  while (deleteItems.length > 0) {
    const item = deleteItems.pop()!;
    const index = source.indexOf(item);
    source.splice(index, 1);
  }
}

export function prepareDeployment(side: Side) {
  if (!side.deploymentPlan) {
    console.error("deployment plan not initiated");
    return;
  }

  const index = side.deploymentPlan!.targetIndex!;

  const selectedReserves = side.deploymentPlan.selectedReservesIndices.map(
    (idx) => side.reserves[idx]!
  );
  console.debug("selected for deployment", selectedReserves);
  side.deploymentPlan.queue.push(...selectedReserves);
  if (side.forward[index]) {
    const existed = side.forward[index]!.cardId;
    console.debug("existed unit joined", existed);
    side.deploymentPlan!.queue.push(existed);
  }

  side.forward[index] = null;
  removeFrom(side.reserves, selectedReserves);
}

export function resetAction(side: Side) {
  side.forward.forEach((f) => {
    if (!f) {
      return;
    }

    f.acted = false;
  });
}

export function fuseOne(side: Side) {
  if (!side.deploymentPlan) {
    console.error("deployment plan not initiated");
    return;
  }

  if (side.deploymentPlan.queue.length < 2) {
    console.error("not enough cards to fuse");
    return;
  }

  const [card1, card2, ...rest] = side.deploymentPlan.queue;
  const result = breedPals(card1, card2);

  if (!result) {
    console.debug(`failed to fuse ${card1} and ${card2}`);
    side.deploymentPlan.queue = [card2, ...rest];
    return { card1, card2, result: "" };
  }

  console.debug(`fusing ${card1} and ${card2} into ${result}`);
  side.deploymentPlan.queue = [result, ...rest];
  return { card1, card2, result };
}

export function deploy(side: Side) {
  if (!side.deploymentPlan) {
    console.error("deployment plan not initiated");
    return;
  }

  side.forward[side.deploymentPlan.targetIndex!] = {
    cardId: side.deploymentPlan.queue[0],
    stance: CardStance.Offensive,
    acted: false,
  };
  console.debug(
    `deployed ${side.deploymentPlan.queue[0]} to forward position ${side.deploymentPlan.targetIndex}`
  );

  side.deploymentPlan = undefined;
}

export function changeStanceToDefensive(side: Side, index: number) {
  if (!side.forward[index]) {
    console.error(`No unit at forward position ${index}`);
    return;
  }

  side.forward[index]!.stance = CardStance.Defensive;
  side.forward[index]!.acted = true;
}

export function selectUnitForOffensive(side: Side, index: number) {
  side.offensivePlan = {
    unitIndex: index,
  };
}

export function selectTargetForOffensive(side: Side, index: number) {
  if (!side.offensivePlan) {
    console.error("offensive plan not initiated");
    return;
  }

  side.offensivePlan.targetIndex = index;
}

/**
 * returns positive if card1 wins
 * @param card1
 * @param card2
 * @returns
 */
export function simulateBattle(
  card1: string,
  card2: string,
  card2Stance: CardStance
) {
  const c1 = getPalById(card1);
  const life1 = c1.attack;
  if (!card2) {
    // direct attack
    console.debug(
      `battle simulation: ${card1} (${life1}) vs nothing -> ${life1}`
    );
    return life1;
  }

  const c2 = getPalById(card2);
  const life2 = card2Stance == CardStance.Offensive ? c2.attack : c2.defense;
  const result = life1 - life2;
  console.debug(
    `battle simulation: ${card1} (${life1}) vs ${card2} (${life2}) -> ${result}`
  );
  return result;
}

export function getBattle(side: Side, otherSide: Side): Battle | undefined {
  if (!side.offensivePlan) {
    console.error("offensive plan not initiated");
    return undefined;
  }

  const { targetIndex, unitIndex } = side.offensivePlan;
  const card1 = side.forward[unitIndex!]!.cardId;
  const target = otherSide.forward[targetIndex!];
  // target is unavailable if attack the heart
  return {
    card1,
    card2: target?.cardId || "",
    card2Stance: target?.stance || CardStance.Offensive,
  };
}

function destroyPosition(side: Side, index: number) {
  const cardId = side.forward[index]?.cardId;
  side.forward[index!] = null;
  if (cardId) {
    console.debug("sending to graveyard", cardId);
    side.graveyard.push(cardId);
  }
}

export function endBattle(side: Side, other: Side) {
  const battle = getBattle(side, other)!;
  const { card1, card2, card2Stance } = battle;
  const result = simulateBattle(card1, card2, card2Stance);
  const damage = Math.abs(result);
  const won = result > 0;
  const lost = result < 0;
  const plan = side.offensivePlan!;
  const isDefensive = card2Stance == CardStance.Defensive;

  if (won) {
    if (!isDefensive) {
      other.life -= damage;
      if (other.life < 0) {
        other.life = 0;
      }
    }

    // destroy target
    if (plan.targetIndex! >= 0) {
      destroyPosition(other, plan.targetIndex!);
    }
    side.forward[plan.unitIndex!]!.acted = true;
    // attacked unit is always offensive
    side.forward[plan.unitIndex!]!.stance = CardStance.Offensive;
  } else if (lost) {
    if (!isDefensive) {
      side.life -= damage;
      if (side.life < 0) {
        side.life = 0;
      }

      // destroy unit
      destroyPosition(side, plan.unitIndex!);
    } else {
      side.forward[plan.unitIndex!]!.acted = true;
    }
  } else {
    // tie
    if (card2Stance == CardStance.Offensive) {
      // mutual destruction
      destroyPosition(side, plan.unitIndex!);
      destroyPosition(other, plan.targetIndex!);
    } else {
      // attacked unit is always offensive
      side.forward[plan.unitIndex!]!.stance = CardStance.Offensive;
      side.forward[plan.unitIndex!]!.acted = true;
    }
  }

  side.offensivePlan = undefined;
  return { ...battle, result };
}

export function calculateFusionAnimationSequence(
  fusion: Fusion
): ClassAnimationSegment[] {
  const segments = [
    { className: "fusion-visualizer--intro", duration: 1000 },
    { className: "fusion-visualizer--fusing", duration: 2000 },
    { className: "fusion-visualizer--result", duration: 1000 },
    { className: "fusion-visualizer--done", duration: 10 },
  ];

  const failedSegments = [
    { className: "fusion-visualizer--intro", duration: 1000 },
    { className: "fusion-visualizer--failed1", duration: 2000 },
    { className: "fusion-visualizer--failed2", duration: 2000 },
    { className: "fusion-visualizer--result", duration: 1000 },
    { className: "fusion-visualizer--done", duration: 10 },
  ];

  return fusion.result ? segments : failedSegments;
}

export function calculateFusionAnimationDuration(fusion: Fusion) {
  const sequence = calculateFusionAnimationSequence(fusion);
  const sum = sequence.reduce((prev, current) => prev + current.duration, 0);
  return sum;
}

export function calculateBattleAnimationSequence(
  result: number,
  defensive: boolean
): ClassAnimationSegment[] {
  const winSequence = [
    { className: "battle-visualizer--intro", duration: 1000 },
    { className: "battle-visualizer--damage2", duration: 2000 },
    { className: "battle-visualizer--dead2", duration: 1000 },
    { className: "battle-visualizer--end", duration: 10 },
  ];
  const looseSequence = [
    { className: "battle-visualizer--intro", duration: 1000 },
    { className: "battle-visualizer--damage1", duration: 2000 },
    { className: "battle-visualizer--dead1", duration: 1000 },
    { className: "battle-visualizer--end", duration: 10 },
  ];
  const tieSequence = [
    { className: "battle-visualizer--intro", duration: 1000 },
    { className: "battle-visualizer--damage-both", duration: 2000 },
    { className: "battle-visualizer--dead-both", duration: 1000 },
    { className: "battle-visualizer--end", duration: 10 },
  ];

  const defensiveWinSequence = [
    { className: "battle-visualizer--intro", duration: 1000 },
    { className: "battle-visualizer--damage2", duration: 2000 },
    { className: "battle-visualizer--dead2", duration: 2000 },
    { className: "battle-visualizer--end", duration: 10 },
  ];
  const defensiveLooseSequence = [
    { className: "battle-visualizer--intro", duration: 1000 },
    { className: "battle-visualizer--damage1", duration: 2000 },
    { className: "battle-visualizer--end", duration: 10 },
  ];
  const defensiveTieSequence = [
    { className: "battle-visualizer--intro", duration: 1000 },
    { className: "battle-visualizer--damage-both", duration: 2000 },
    { className: "battle-visualizer--end", duration: 10 },
  ];

  const win = result > 0;
  const tie = result == 0;
  console.debug("simulate", result, defensive);
  console.debug(
    `${defensive ? "defensive" : "offensive"} ${
      tie ? "tie" : win ? "win" : "loose"
    }`
  );

  const sequence = tie ? tieSequence : win ? winSequence : looseSequence;
  const defensiveSequence = tie
    ? defensiveTieSequence
    : win
    ? defensiveWinSequence
    : defensiveLooseSequence;
  return defensive ? defensiveSequence : sequence;
}

export function calculateBattleAnimationDuration(
  result: number,
  defensive: boolean
) {
  const sequence = calculateBattleAnimationSequence(result, defensive);
  const sum = sequence.reduce((prev, current) => prev + current.duration, 0);
  return sum;
}
