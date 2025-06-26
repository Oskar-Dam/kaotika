import React from 'react';
import SkillCard from './SkillCard';
import { Skill } from '@/_common/interfaces/Skill';

interface SkillGridProps {
  skills: Skill[];
  selectedStudent: string;
  handleClick: (pos: number, item: Skill, selectedStudent: string) => void;
  canClick: (pos: number, item: Skill) => boolean; 
}

const SkillGrid: React.FC<SkillGridProps> = ({ skills, selectedStudent, canClick, handleClick }) => (
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {skills.map((skill, i) => (
      <SkillCard
        key={i}
        skill={skill}
        selectedStudent={selectedStudent}
        canClick={canClick}
        handleClick={handleClick}
      />
    ))}
  </div>
);

export default SkillGrid;