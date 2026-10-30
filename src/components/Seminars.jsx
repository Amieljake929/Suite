import { motion } from "framer-motion";

// Same blur-in fade-up reveal as Hero.jsx
const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-10% 0px" };

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: VIEWPORT,
  transition: { duration: 0.7, delay, ease: EASE },
});

// Horizontal lines: fade in while drawing left to right
const line = (delay = 0) => ({
  initial: { opacity: 0, scaleX: 0 },
  whileInView: { opacity: 1, scaleX: 1 },
  viewport: VIEWPORT,
  transition: { duration: 0.9, delay, ease: EASE },
});

export default function Seminars({ title = "Seminars", items = [], href }) {
  return (
    <section>
      {/* Heading row (title and link styled like Block.jsx headings) */}
      <div className="mb-8 flex items-center justify-between md:mb-11">
        <motion.h2
          {...reveal(0.1)}
          className="text-xs font-normal uppercase tracking-[0.25em] text-(color:--muted) md:text-[0.9375rem]"
        >
          {title}
        </motion.h2>
        {href && (
          <motion.a
            {...reveal(0.14)}
            href={href}
            className="-mr-[0.25em] text-xs font-normal tracking-[0.25em] text-(color:--muted) transition-opacity hover:opacity-70 focus-visible:opacity-70 md:text-[0.9375rem]"
          >
            Details →
          </motion.a>
        )}
      </div>

      {/* Top line */}
      <motion.div
        {...line(0.18)}
        className="h-px origin-left bg-current/15"
      />

      {/* Rows */}
      <ul>
        {items.map(({ year, title: name, topic }, i) => {
          const rowDelay = 0.2 + i * 0.08; // rows cascade top to bottom
          return (
            <li
              key={`${year}-${name}-${i}`}
              className="relative grid grid-cols-[4rem_1fr] items-baseline gap-x-4 gap-y-1 py-4 md:grid-cols-[10rem_1fr_auto] md:gap-x-6 md:py-[18px]"
            >
              <motion.span
                {...reveal(rowDelay)}
                className="text-[12px] font-light text-(color:--soft) md:text-[14px]"
              >
                {year}
              </motion.span>
              <motion.span
                {...reveal(rowDelay + 0.04)}
                className="text-[14px] font-normal md:text-base"
              >
                {name}
              </motion.span>
              <motion.span
                {...reveal(rowDelay + 0.08)}
                className="col-start-2 text-[12px] font-light text-(color:--soft) md:col-start-3 md:text-right md:text-[14px]"
              >
                {topic}
              </motion.span>

              {/* Row bottom line */}
              <motion.span
                {...line(rowDelay + 0.1)}
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-current/15"
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}