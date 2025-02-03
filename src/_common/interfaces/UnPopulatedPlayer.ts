import { Profile } from "./Profile";
import { Modifier } from "./Modifier";
import { Task } from "./Task";

export interface UnPopulatedPlayer {
  _id: string;
  name: string;
  nickname: string;
  avatar: string;
  email: string;
  experience: number;
  level: number;
  gold: number;
  is_active: boolean;
  created_date: string;
  profile: Profile | null;
  attributes: Modifier;
  classroom_id: string | null;
  equipment: {
    helmet: string,
    weapon: string,
    armor: string,
    shield: string,
    artifact: string,
    boot: string,
    ring: string,
    healing_potion: string,
    antidote_potion: string,
    enhancer_potion: string,
  },
  inventory: {
    helmets: string[],
    weapons: string[],
    armors: string[],
    shields: string[],
    artifacts: string[],
    boots: string[],
    rings: string[],
    healing_potions: string[],
    antidote_potions: string[],
    enhancer_potions: string[],
    ingredients: string[],
  },
  tasks: Task[]
}