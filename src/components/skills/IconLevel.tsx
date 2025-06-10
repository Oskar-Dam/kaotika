import React from 'react'
import Image from 'next/image';
import { motion } from "framer-motion";
import { Skill } from '@/_common/interfaces/Skill';


interface IconLevelProps {
  unlock: boolean;
  position: number;
  handleClick: (pos: number, item: Skill, selectedStudent: string) => void;
  canClick: (pos: number, item: Skill) => boolean;
  skill: Skill;
  selectedStudent: string;
}

const IconLevel: React.FC<IconLevelProps> = ({unlock , position, handleClick, canClick, skill, selectedStudent}) => {
  if (unlock) {
    return (
      <motion.div
        className="text-green-300 border-1 rounded-full border-sepia bg-black/70"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image 
          src={skill.levels[position].image}
          width={300}
          height={300}
          alt="Unlocked book"
          className="w-16 h-16 rounded-full" 
        />
      </motion.div>
    );
  } else {
    return (
      <div className={canClick(position, skill) ? 'cursor-pointer' : ''} onClick={() => handleClick(position, skill, selectedStudent)}>
        <div className="relative w-16 h-16">
          <motion.div
            className="text-green-300"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            
            <Image 
              src="/images/skills/lock.webp"
              width={300}
              height={300}
              alt="Locked"
              className="sepia  w-16 h-16" 
            />
          </motion.div>
        </div>
      </div>
    )
    
  }
};

export default IconLevel