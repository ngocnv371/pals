export enum CardStance {
  Offensive,
  Defensive,
}

export interface Unit {
  cardId: string;
  /**
   * the stance of the unit, take no damage to `life` when `defensive`, can't change to `defensive` if acted in this turn
   */
  stance: CardStance;
  /**
   * indicated if this unit has acted (attacked) in this turn
   *
   * each unit  can only acted once in a turn
   */
  acted: boolean;
}

export type Formation = (Unit | null)[];

export interface Battle {
  card1: string;
  card2: string;
  card2Stance: CardStance;
}

export interface Side {
  /**
   *  loose when reach 0
   */
  life: number;
  /**
   * all owned cards, 40 at the start
   */
  deck: string[];
  /**
   * drawed from deck to 5 each turn
   */
  reserves: string[];
  /**
   * first line for offensive/defensive
   */
  forward: Formation;
  /**
   * second line for support spells/effects
   */
  support: Formation;

  /**
   * phase 1 plan
   */
  deploymentPlan?: {
    /**
     * indices of item in `reserves` to be deployed
     */
    selectedReservesIndices: number[];
    /**
     * index of `forward` formation to place
     */
    targetIndex?: number;
    /**
     * list of cards to be fused
     */
    queue: string[];
  };

  /**
   * fusion data
   */
  fusion?: {
    card1: string;
    card2: string;
    result: string;
  };

  /**
   * phase 2 data
   */
  offensivePlan?: {
    /**
     * index of unit in `forward` formation to be used for the attack
     */
    unitIndex?: number;
    /**
     * index of unit in enemy's `forward` formation to receive the attack
     */
    targetIndex?: number;
    /**
     * calculated outcome of the attack:
     *
     * 0        - tie: both units destroyed
     *
     * positive - win: offensive unit wins, the target unit is destroyed
     *
     * negative - win: offensive unit loose, the offensive unit is destroyed
     */
    result?: number;
  };
}

export enum DuelStage {
  Start = "Start",
  MyDrawing = "MyDrawing",
  MyPlacing = "MyPlacing",
  MyFusion = "MyFusion",
  MyAttack = "MyAttack",
  MyTargetting = "MyTargetting",
  MyBattle = "MyBattle",
  TheirDrawing = "TheirDrawing",
  TheirPlacing = "TheirPlacing",
  TheirFusion = "TheirFusion",
  TheirAttack = "TheirAttack",
  End = "End",
}
