import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

export default function BlogPosts({ title = "Blog", items = [], href }) {
  return (
    <section>
      {/* Heading row (styled like Block.jsx headings) */}
      <div className="mb-8 flex items-center justify-between md:mb-11">
        <motion.h2
          {...reveal(0.1)}
          className="text-xs font-normal uppercase tracking-[0.25em] text-(color:--muted) md:text-[0.9375rem]"
        >
          {title}
        </motion.h2>
        {href && (
          <motion.div {...reveal(0.14)}>
            <Link
              to={href}
              className="text-xs font-normal tracking-[0.25em] text-(color:--muted) transition-opacity hover:opacity-70 focus-visible:opacity-70 md:text-[0.9375rem]"
            >
              All Posts →
            </Link>
          </motion.div>
        )}
      </div>

      {/* Top line */}
      <motion.div {...line(0.18)} className="h-px origin-left bg-current/15" />

      {/* Rows */}
      <ul>
        {items.map(({ title: name, excerpt, date, href: postHref }, i) => {
          const rowDelay = 0.2 + i * 0.1; // rows cascade top to bottom
          const Row = postHref ? "a" : "div";
          const rowProps = postHref ? { href: postHref } : {};

          return (
            <li key={`${name}-${i}`} className="relative">
              <Row
                {...rowProps}
                className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 transition-opacity hover:opacity-70 focus-visible:opacity-70 md:py-[26px]"
              >
                <motion.h3
                  {...reveal(rowDelay)}
                  className="min-w-0 text-[14px] font-medium md:text-base"
                >
                  {name}
                </motion.h3>

                <motion.span
                  {...reveal(rowDelay + 0.04)}
                  className="col-start-2 row-start-1 whitespace-nowrap text-[12px] font-light text-(color:--soft) md:text-[14px]"
                >
                  {date}
                </motion.span>

                <motion.p
                  {...reveal(rowDelay + 0.08)}
                  className="col-span-2 min-w-0 truncate text-[12px] font-light text-(color:--soft) md:text-[14px]"
                >
                  {excerpt}
                </motion.p>
              </Row>

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