import { motion } from "framer-motion";

const MagicParticles = () => {
  const particles = Array.from({ length: 10 });

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => {
        const size = Math.floor(Math.random() * 8) + 4;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              y: [-10, -40],
              opacity: [0.3, 0.8, 0],
              scale: [0.5, 1.2],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-emerald-400/40 blur-md"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
            }}
          />
        );
      })}
    </div>
  );
};

export default MagicParticles;