import React from 'react'
import { Tooltip } from '@nextui-org/react';
import SkillLevel from './SkillLevel';
import { Skill } from '@/_common/interfaces/Skill';



interface SkillCardProps {
  skill: Skill;
  selectedStudent: string;
  handleClick: (pos: number, item: Skill, selectedStudent: string) => void;
  canClick: (pos: number, item: Skill) => boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({skill, selectedStudent, canClick, handleClick,}) => (
  <div
    className="relative border border-sepia bg-black/30 rounded-md p-2 bg-cover bg-center"
    style={{ backgroundImage: `url(${skill.image})` }}
  >
    <div className="absolute inset-0 bg-black/60 z-0"></div>
    <div className="relative z-10">
      <div className="flex flex-wrap text-white justify-center gap-2 mb-4">
        <Tooltip
          className="w-auto text-3xl mb-4 border-1 rounded-lg border-sepia bg-black/90"
          placement="top"
          size="sm"
          showArrow={true}
          content={skill.description}
        >
          <div className="bg-black/30 border border-black rounded-md p-2 text-medievalSepia">
            <h2 className="text-3xl p-2">{skill.epicName}</h2>
          </div>
        </Tooltip>
      </div>
      <div className="flex gap-4 justify-around m-4">
        {skill.levels.map((level, index) => (
          <SkillLevel
            key={index}
            level={level}
            index={index}
            skill={skill}
            selectedStudent={selectedStudent}
            canClick={canClick}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  </div>
);

export default SkillCard