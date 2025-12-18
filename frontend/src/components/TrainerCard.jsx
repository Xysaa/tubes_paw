import React from "react";
import { motion } from "framer-motion";

const TrainerCard = ({ trainer }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260 }}
      className="
        group
        w-[280px]
        rounded-[28px]
        overflow-hidden
        bg-black
        border border-[#53B602]/60
        shadow-[0_0_20px_rgba(83,182,2,0.25)]
        transition-colors duration-300
        hover:bg-[#53B602]
      "
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={trainer.image}
          alt={trainer.name}
          className="
            w-full h-[340px] object-cover
            transition duration-300
            group-hover:opacity-90
          "
        />
      </div>

      {/* CONTENT */}
      <div className="px-6 py-5 text-center transition-colors duration-300">
        <h3
          className="
            text-white text-xl font-bold
            transition-colors duration-300
            group-hover:text-black
          "
        >
          {trainer.name}
        </h3>

        <p
          className="
            mt-1 text-white/70 text-sm
            transition-colors duration-300
            group-hover:text-black/80
          "
        >
          {trainer.role}
        </p>
      </div>

      {/* SOCIAL */}
      <div className="pb-6 flex justify-center gap-4">
        {[
          { key: "facebook", icon: FacebookIcon },
          { key: "x", icon: XIcon },
          { key: "instagram", icon: InstagramIcon },
          { key: "linkedin", icon: LinkedinIcon },
        ].map(({ key, icon: Icon }) => (
          <a
            key={key}
            href={trainer.social?.[key] || "#"}
            aria-label={key}
            className="
              w-10 h-10 rounded-full
              flex items-center justify-center
              bg-white text-black
              transition-all duration-300

              group-hover:bg-black
              group-hover:text-[#53B602]

              hover:bg-[#53B602]
              hover:text-black
            "
          >
            <Icon />
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default TrainerCard;
const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.12 8.44 9.88v-6.99H8.9v-2.89h1.54V9.41c0-1.52.9-2.36 2.28-2.36.66 0 1.35.12 1.35.12v1.49h-.76c-.75 0-.98.47-.98.95v1.14h1.67l-.27 2.89h-1.4v6.99C18.34 21.12 22 17 22 12z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm5 5a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2H21l-6.516 7.45L22 22h-6.828l-5.348-6.657L3.85 22H1l6.97-7.964L2 2h7l4.843 6.02L18.244 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v12h-4V8zm7 0h3.6v1.71h.05c.5-.95 1.72-1.95 3.54-1.95 3.78 0 4.48 2.49 4.48 5.74V20h-4v-5.02c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.31-1.93 2.66V20H7.5V8z" />
  </svg>
);
