import { AntidotePotion } from "./AntidotePotion";
import { Armor } from "./Armor";
import { Artifact } from "./Artifact";
import { Boot } from "./Boot";
import { EnhancerPotion } from "./EnhancerPotion";
import { HealingPotion } from "./HealingPotion";
import { Helmet } from "./Helmet";
import { Ingredient } from "./Ingredient";
import { Ring } from "./Ring";
import { Shield } from "./Shield";
import { Weapon } from "./Weapon";

export interface inventory {
  helmets: Helmet[],
  weapons: Weapon[],
  armors: Armor[],
  shields: Shield[],
  artifacts: Artifact[],
  boots: Boot[],
  rings: Ring[],
  healing_potions: HealingPotion[],
  antidote_potions: AntidotePotion[],
  enhancer_potions: EnhancerPotion[],
  ingredients: Ingredient[],
}