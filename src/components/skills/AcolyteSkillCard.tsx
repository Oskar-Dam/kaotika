import { motion } from "framer-motion";
import MagicParticles from "../effects/MagicParticles";
import MagicMist from "../effects/MagicMist";

interface Level {
  description: string;
  image: string;
  epicName: string;
  exp: number;
  gold: number;
  unique: boolean;
  active: boolean;
}

interface AcolyteSkillCard {
  level: Level;
  isActive: boolean;
}

const AcolyteSkillCard : React.FC<AcolyteSkillCard> = ({ level, isActive }) => {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full md:w-1/3 p-4 relative overflow-hidden group ${
        isActive ? "" : "opacity-50 grayscale pointer-events-none"
      }`}
    >
      {isActive && <MagicMist />}
      {isActive && <MagicParticles />}

      {/* Borde mágico */}
      <div
        className={`absolute inset-0 rounded-xl border-4 transition-all duration-500 z-0 ${
          isActive
            ? "border-emerald-400 shadow-[0_0_30px_#10b981] animate-glow"
            : "border-gray-600"
        }`}
      />

      {/* Candado si está bloqueado */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <img
            src="/images/skills/lock.webp"
            alt="locked"
            className="w-20 h-20 drop-shadow-xl"
          />
        </div>
      )}

      {/* Contenido */}
      <div className="relative z-10 bg-gray-900/90 backdrop-blur-md rounded-xl p-4 space-y-3 shadow-2xl">
        <div className="h-24 flex items-center justify-center bg-black rounded">
          <img
            src={level.image}
            alt={level.epicName}
            className="h-full object-contain"
          />
        </div>

        <h3 className="text-lg font-bold text-white text-center">
          {level.epicName}
        </h3>

        <p className="text-sm text-gray-300 text-center">{level.description}</p>

        <div className="text-sm text-yellow-400 text-center">
          ✦ EXP: {level.exp} • 💰 Oro: {level.gold}
        </div>
      </div>
    </motion.div>
  );
};

export default AcolyteSkillCard;