import { motion } from "framer-motion";
import { useLocalized } from "../context/LanguageContext";

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

// Full class names so Tailwind can detect them
const COLS = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

// Card grid: one column on mobile, `cols` columns on desktop
export default function InfoCards({ title: titleProp, items: itemsProp = [], cols = 3 }) {
  const title = useLocalized(titleProp);
  const items = useLocalized(itemsProp);

  return (
    <section className="col-span-2">
      <motion.h2
        {...reveal(0.1)}
        className="mb-8 text-xs font-normal uppercase tracking-[0.25em] text-(color:--muted) md:mb-11 md:text-[0.9375rem]"
      >
        {title}
      </motion.h2>

      <ul
        className={`grid grid-cols-1 gap-x-8 gap-y-8 md:gap-x-10 md:gap-y-12 ${COLS[cols] ?? COLS[3]}`}
      >
        {items.map(({ period, title: name, org, note, tech, href }, i) => {
          const delay = 0.15 + i * 0.1; // cards cascade left to right
          const Card = href ? "a" : "div";
          const external = href?.startsWith("http");
          const cardProps = href
            ? {
                href,
                target: external ? "_blank" : undefined,
                rel: external ? "noreferrer" : undefined,
              }
            : {};

          return (
            // index key so cards don't remount (and re-animate) when the language changes
            <li key={i}>
              {/* Top line */}
              <motion.div
                {...line(delay)}
                className="h-px origin-left bg-current/15"
              />

              <Card
                {...cardProps}
                className="block pt-4 transition-opacity hover:opacity-70 focus-visible:opacity-70 md:pt-5"
              >
                <motion.span
                  {...reveal(delay + 0.05)}
                  className="block text-[11px] font-light text-(color:--soft) md:text-[12px]"
                >
                  {period}
                </motion.span>

                <motion.h3
                  {...reveal(delay + 0.1)}
                  className="mt-2 text-[14px] font-medium leading-snug md:text-[15px]"
                >
                  {name}
                </motion.h3>

                {org && (
                  <motion.p
                    {...reveal(delay + 0.13)}
                    className="mt-0.5 text-[12px] font-light text-(color:--soft) md:text-[13px]"
                  >
                    {org}
                  </motion.p>
                )}

                {note && (
                  <motion.p
                    {...reveal(delay + 0.16)}
                    className="mt-3 text-[12px] font-light leading-[1.6] text-(color:--soft) md:text-[13px]"
                  >
                    {note}
                  </motion.p>
                )}

                {tech && (
                  <motion.p
                    {...reveal(delay + 0.2)}
                    className="mt-3 text-[11px] font-light text-(color:--muted) md:text-[12px]"
                  >
                    {tech}
                  </motion.p>
                )}
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}