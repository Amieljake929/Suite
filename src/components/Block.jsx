import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Same blur-in fade-up reveal as Hero.jsx, staggered per item
const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Block({ title, items }) {
  return (
    <motion.section
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.h2
        variants={item}
        className="mb-8 text-xs font-normal uppercase tracking-[0.25em] text-(color:--muted) md:mb-11 md:text-[0.9375rem]"
      >
        {title}
      </motion.h2>

      <ul>
        {items.map(({ label, href }) => (
          <motion.li key={label} variants={item} className="text-sm leading-[1.625rem] md:text-lg md:leading-[2.1875rem]">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1 focus-visible:underline"
              >
                <span>{label}</span>
                <ArrowUpRight
                  size="0.75rem"
                  className="-translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </a>
            ) : (
              <span>{label}</span>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}