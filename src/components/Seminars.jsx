import { motion } from "framer-motion";
import { useLanguage, useLocalized } from "../context/LanguageContext";

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

export default function Seminars({ title: titleProp, items: itemsProp = [], href }) {
  const { t } = useLanguage();
  const title = useLocalized(titleProp) ?? t("section.seminars");
  const items = useLocalized(itemsProp);

  return (
    <section>
      {/* Heading row (title and link styled like Block.jsx headings) */}
      <div className="mb-8 flex items-center justify-between gap-4 md:mb-11">
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
            className="-mr-[0.25em] shrink-0 whitespace-nowrap text-xs font-normal uppercase tracking-[0.25em] text-(color:--muted) transition-opacity hover:opacity-70 focus-visible:opacity-70 md:text-[0.9375rem]"
          >
            {t("seminars.details")} →
          </motion.a>
        )}
      </div>

      {/* Cards: 1 column on mobile, 2 on desktop */}
      <ul className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 md:gap-y-12">
        {items.map(({ year, title: name, topic }, i) => {
          const delay = 0.15 + (i % 2) * 0.1; // cards in the same row start together

          return (
            // index key so cards don't remount (and re-animate) when the language changes
            <li key={i}>
              {/* Top line */}
              <motion.div
                {...line(delay)}
                className="h-px origin-left bg-current/15"
              />

              <div className="pt-4 md:pt-5">
                <motion.span
                  {...reveal(delay + 0.05)}
                  className="block text-[11px] font-light text-(color:--soft) md:text-[12px]"
                >
                  {year}
                </motion.span>

                <motion.h3
                  {...reveal(delay + 0.1)}
                  className="mt-2 text-[14px] font-medium leading-snug md:text-[16px]"
                >
                  {name}
                </motion.h3>

                <motion.p
                  {...reveal(delay + 0.15)}
                  className="mt-1.5 text-[12px] font-light leading-[1.6] text-(color:--soft) md:text-[13px]"
                >
                  {topic}
                </motion.p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}