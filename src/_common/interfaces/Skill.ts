interface Bonus {
  attribute: string;
  value:number;
}

interface Level {
  description: string;
  image: string;
  epicName: string;
  exp: number;
  gold: number;
  unique: boolean;
  active: boolean;
  bonus: Bonus;
} 

export interface Skill {
  _id: string,
  epicName: string,
  description: string,
  image: string,
  levels: Level[]
}