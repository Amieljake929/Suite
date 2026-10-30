import { motion } from "framer-motion";
import Hero from "./Hero";

// Shared layout for About / Projects / Gear / Blogs
export default function SubPage({ intro, lead, children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {intro && (
        <div className="mt-[20vh]">
          <Hero text={intro} />
        </div>
      )}
      {lead && <div className="mt-[20vh]">{lead}</div>}
      <div className="mt-[20vh] grid grid-cols-[5fr_4fr] gap-x-6 gap-y-[14vh] md:grid-cols-[5fr_3fr]">
        {children}
      </div>
    </motion.div>
  );
}