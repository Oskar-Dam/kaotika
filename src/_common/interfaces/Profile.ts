import { Attribute } from "./Attribute";
import { AntidotePotion } from "./AntidotePotion";
import { HealingPotion } from "./HealingPotion";
import { EnhancerPotion } from "./EnhancerPotion";
import { Artifact } from "./Artifact";
import { Armor } from "./Armor";
import { Weapon } from "./Weapon";

export interface Profile {
  _id: string;
  name: string;
  image: string;
  description: string;
  attributes: Attribute[];
}