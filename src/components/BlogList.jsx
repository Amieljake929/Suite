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

// Picks the right element for a row: router Link, normal link, or plain div
function Row({ href, className, children }) {
  if (!href) return <div className={className}>{children}</div>;
  if (href.startsWith("/"))
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {children}
    </a>
  );
}

export default function BlogList({ title = "Writing", items = [] }) {
  return (
    <section className="col-span-2">
      <motion.h2
        {...reveal(0.1)}
        className="mb-8 text-xs font-normal uppercase tracking-[0.25em] text-(color:--muted) md:mb-11 md:text-[0.9375rem]"
      >
        {title}
      </motion.h2>

      <motion.div {...line(0.15)} className="h-px origin-left bg-current/15" />

      {items.length === 0 ? (
        <motion.p
          {...reveal(0.25)}
          className="py-6 text-[14px] font-light text-(color:--soft) md:text-base"
        >
          Coming soon
        </motion.p>
      ) : (
        <ul>
          {items.map(
            ({ slug, title: name, excerpt, date, tag, readTime, image, href }, i) => {
              const delay = 0.2 + i * 0.08; // rows cascade top to bottom
              const meta = [tag, readTime].filter(Boolean).join(" · ");
              const to = slug ? `/blogs/${slug}` : href;

              return (
                <li key={`${slug ?? name}-${i}`} className="relative">
                  <Row
                    href={to}
                    className="group grid grid-cols-[1fr_5.5rem] items-start gap-x-4 py-5 md:grid-cols-[10rem_1fr_12rem] md:gap-x-6 md:py-7"
                  >
                    {/* Date: its own column on desktop */}
                    <motion.span
                      {...reveal(delay)}
                      className="hidden pt-0.5 text-[14px] font-light text-(color:--soft) md:block"
                    >
                      {date}
                    </motion.span>

                    {/* Text */}
                    <motion.div
                      {...reveal(delay + 0.04)}
                      className="min-w-0 transition-opacity group-hover:opacity-70"
                    >
                      {/* Date shows here on mobile only */}
                      <span className="mb-1 block text-[11px] font-light text-(color:--soft) md:hidden">
                        {date}
                      </span>
                      <h3 className="text-[14px] font-medium leading-snug md:text-base">
                        {name}
                      </h3>
                      {excerpt && (
                        <p className="mt-2 line-clamp-2 max-w-[65ch] text-[12px] font-light leading-[1.6] text-(color:--soft) md:line-clamp-3 md:text-[13px]">
                          {excerpt}
                        </p>
                      )}
                      {meta && (
                        <p className="mt-3 text-[11px] font-light text-(color:--muted) md:text-[12px]">
                          {meta}
                        </p>
                      )}
                    </motion.div>

                    {/* Image on the right */}
                    <motion.div
                      {...reveal(delay + 0.08)}
                      className="relative aspect-[4/3] overflow-hidden rounded-md bg-current/5"
                    >
                      {/* Fallback initial shows if the image file is missing */}
                      <span className="absolute inset-0 flex items-center justify-center text-2xl font-light text-(color:--muted)">
                        {name.charAt(0)}
                      </span>
                      {image && (
                        <img
                          src={image}
                          alt={name}
                          loading="lazy"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      )}
                    </motion.div>
                  </Row>

                  {/* Row bottom line */}
                  <motion.span
                    {...line(delay + 0.1)}
                    className="absolute inset-x-0 bottom-0 h-px origin-left bg-current/15"
                  />
                </li>
              );
            }
          )}
        </ul>
      )}
    </section>
  );
}