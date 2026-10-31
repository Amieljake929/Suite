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
      {/* Heading row */}
      <div className="mb-6 flex items-center justify-between md:mb-8">
        <motion.h2
          {...reveal(0.1)}
          className="text-[11px] font-normal uppercase tracking-[0.25em] text-(color:--muted) md:text-[0.8125rem]"
        >
          {title}
        </motion.h2>
        {href && (
          <motion.div {...reveal(0.14)}>
            <Link
              to={href}
              className="text-[11px] font-normal uppercase tracking-[0.25em] text-(color:--muted) transition-opacity hover:opacity-70 focus-visible:opacity-70 md:text-[0.8125rem]"
            >
              All Posts →
            </Link>
          </motion.div>
        )}
      </div>

      {/* Posts: one column on mobile, three columns on desktop */}
      <ul className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3 md:gap-x-10 md:gap-y-12">
        {items.map(({ title: name, excerpt, date, href: postHref }, i) => {
          const delay = 0.15 + i * 0.1; // posts cascade left to right
          const Card = postHref ? "a" : "div";
          const cardProps = postHref ? { href: postHref } : {};

          return (
            <li key={`${name}-${i}`}>
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
                  {date}
                </motion.span>

                <motion.h3
                  {...reveal(delay + 0.1)}
                  className="mt-2 text-[14px] font-light leading-snug md:text-[15px]"
                >
                  {name}
                </motion.h3>

                <motion.p
                  {...reveal(delay + 0.15)}
                  className="mt-2 line-clamp-2 text-[12px] font-light leading-[1.6] text-(color:--soft) md:text-[13px]"
                >
                  {excerpt}
                </motion.p>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}