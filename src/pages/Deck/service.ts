import { Chance } from "chance";
import breed, { breedById } from "../../data/palBreed";
import getPalMetadata, { getPalMetadataById } from "../../data/palMetadata";
import { Side, CardStance, Battle } from "./model";
import pals from "../../data/pals.json";
const chance = new Chance();

export function generateSide(): Side {
  return {
    life: 4000,
    deck: chance.n(() => chance.pickone(pals).id, 30),
    reserves: [],
    forward: chance.n(
      () =>
        chance.bool()
          ? {
              cardId: chance.pickone(pals).id,
              stance: chance.bool()
                ? CardStance.Offensive
                : CardStance.Defensive,
              acted: false,
            }
          : null,
      5
    ),
    support: [null, null, null, null, null],
  };
}

export function refillReserves(side: Side) {
  while (side.reserves.length < 5) {
    const item = side.deck.pop();
    if (!item) {
      console.warn("not enough cards to fill up reserves");
      break;
    }

    side.reserves.push(item);
  }
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
  const result = breedById(card1, card2);
  side.fusion = { card1, card2, result };

  console.debug(`fusing ${card1} and ${card2} into ${result}`);
  side.deploymentPlan.queue = [result, ...rest];
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
  const c1 = getPalMetadataById(card1);
  const c2 = getPalMetadataById(card2);
  const life1 = c1.content.baseAttack;
  const life2 =
    card2Stance == CardStance.Offensive
      ? c2.content.baseAttack
      : c2.content.defense;
  const result = life1 - life2;
  console.debug(
    `battle simulation: ${card1} (${life1}) vs ${card2} (${life2}) -> ${result}`
  );
  return result;
}

export function getBattle(side: Side, otherSide: Side): Battle | null {
  if (!side.offensivePlan) {
    console.error("offensive plan not initiated");
    return null;
  }

  const { targetIndex, unitIndex } = side.offensivePlan;
  const card1 = side.forward[unitIndex!]!.cardId;
  const target = otherSide.forward[targetIndex!]!;
  return { card1, card2: target.cardId, card2Stance: target.stance };
}

export function endBattle(side: Side, other: Side) {
  const { card1, card2, card2Stance } = getBattle(side, other)!;
  const result = simulateBattle(card1, card2, card2Stance);
  const damage = Math.abs(result);
  const won = result > 0;
  const lost = result < 0;

  if (won) {
    other.life -= damage;
    if (other.life < 0) {
      other.life = 0;
    }

    // destroy target
    other.forward[side.offensivePlan?.targetIndex!] = null;
    side.forward[side.offensivePlan?.unitIndex!]!.acted = true;
    // attacked unit is always offensive
    side.forward[side.offensivePlan?.unitIndex!]!.stance = CardStance.Offensive;
  } else if (lost) {
    side.life -= damage;
    if (side.life < 0) {
      side.life = 0;
    }

    // destroy unit
    side.forward[side.offensivePlan?.unitIndex!] = null;
  } else {
    // tie
    if (card2Stance == CardStance.Offensive) {
      // mutual destruction
      side.forward[side.offensivePlan?.unitIndex!] = null;
      other.forward[side.offensivePlan?.targetIndex!] = null;
    } else {
      // attacked unit is always offensive
      side.forward[side.offensivePlan?.unitIndex!]!.stance =
        CardStance.Offensive;
    }
  }

  side.offensivePlan = {};
}
