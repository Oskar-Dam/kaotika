import { Skill } from '@/_common/interfaces/Skill';
import { Tooltip } from '@nextui-org/react';
import React from 'react'
import IconLevel from './IconLevel';

interface Level {
  description: string;
  image: string;
  epicName: string;
  exp: number;
  gold: number;
  unique: boolean;
  active: boolean;
} 

interface SkillLevelProps {
  level: Level;
  index: number;
  skill: Skill;
  selectedStudent: string;
  handleClick: (pos: number, item: Skill, selectedStudent: string) => void;
  canClick: (pos: number, item: Skill) => boolean;
}

const SkillLevel: React.FC<SkillLevelProps> = ({ level, index, skill, selectedStudent, canClick, handleClick }) => (
  <Tooltip
    className="w-96 text-3xl mb-4 border-1 rounded-lg border-sepia bg-black/90"
    placement="top"
    size="sm"
    showArrow={true}
    content={level.description}
  >
    <div className="flex flex-col items-center gap-1 border-1 rounded-lg border-black bg-black/30 p-2">
      <IconLevel
        unlock={level.active}
        position={index}
        canClick={canClick}
        handleClick={handleClick}
        skill={skill}
        selectedStudent={selectedStudent}
      />
      <div className="flex flex-col items-center text-2xl text-medievalSepia">
        <span className={!level.active ? "text-gray-800" : ""}>{level.epicName}</span>
        <span className={!level.active ? "text-gray-800" : ""}>+ {level.exp} exp</span>
        <span className={!level.active ? "text-gray-800" : ""}>+ {level.gold} gold coins</span>
      </div>
    </div>
  </Tooltip>
);

export default SkillLevel