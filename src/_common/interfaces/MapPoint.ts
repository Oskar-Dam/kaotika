export interface MapPoint {
  id: string;
  name: string;
  xPercent: number;
  yPercent: number;
  isUnlocked: boolean;
  description: string;
  video: string;
  image: string;
  blockedSkills: string[],
  exp: number;
  gold: number;
};