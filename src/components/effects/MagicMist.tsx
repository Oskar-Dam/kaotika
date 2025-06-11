import { motion } from "framer-motion";

const MagicMist = () => {
  return (
    <motion.div
      className="absolute inset-0 z-0 pointer-events-none"
      initial={{ rotate: 0, opacity: 0.3 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400/10 via-transparent to-transparent blur-3xl opacity-60 rounded-full" />
    </motion.div>
  );
};

export default MagicMist;