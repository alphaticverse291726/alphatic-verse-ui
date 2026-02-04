import { motion } from "framer-motion";

export default function Card({ title, children }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.015,
        boxShadow: `
          0 0 20px rgba(255, 45, 149, 0.35),
          0 0 30px rgba(127, 60, 255, 0.30),
          0 0 40px rgba(59, 130, 246, 0.25)
        `,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="
        glass
        p-5
        cursor-pointer
        border border-white/10
        hover:border-white/20
      "
    >
      {title && (
        <h3 className="text-lg font-semibold mb-3 text-white/90">
          {title}
        </h3>
      )}

      <div className="text-white/80 text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}
