import { motion } from "framer-motion";

export default function Card({ title, children }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
        boxShadow: "0 0 25px rgba(255,45,149,0.35)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="glass p-5 cursor-pointer"
    >
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </motion.div>
  );
}
