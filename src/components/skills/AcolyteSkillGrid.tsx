import React from 'react'
import AcolyteSkillCard from './AcolyteSkillCard'
import { Skill } from '@/_common/interfaces/Skill';

interface AcolyteSkillGridProps {
  skills: Skill[];
}

const AcolyteSkillGrid: React.FC<AcolyteSkillGridProps> = ({ skills }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {skills.map((skill) =>
        skill.levels.map((level, i) => (
          <AcolyteSkillCard key={`${skill.id}-${i}`} level={level} isActive={level.active} />
        ))
      )}
    </div>
  );
}

export default AcolyteSkillGrid
