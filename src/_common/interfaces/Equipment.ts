import { Armor } from "./Armor";
import { Artifact } from "./Artifact";
import { Boot } from "./Boot";
import { Helmet } from "./Helmet";
import { Ring } from "./Ring";
import { Shield } from "./Shield";
import { Weapon } from "./Weapon";

export interface Equipment {
  weapon: Weapon,
  shield: Shield,
  helmet: Helmet,
  armor: Armor,
  boot: Boot,
  ring: Ring,
  artifact: Artifact,
}