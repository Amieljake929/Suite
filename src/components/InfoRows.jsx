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

// Reusable list: left column = period/label, right column = title, org, note.
// Used for Details, Education and Certifications.
// Set `bottomLines={false}` to hide the line under each row.
// Add `newTab: true` to an item to open its link in a new tab.
export default function InfoRows({ title, items = [], bottomLines = true }) {
  return (
    <section className="col-span-2">
      <motion.h2
        {...reveal(0.1)}
        className="mb-8 text-xs font-normal uppercase tracking-[0.25em] text-(color:--muted) md:mb-11 md:text-[0.9375rem]"
      >
        {title}
      </motion.h2>

      <motion.div {...line(0.15)} className="h-px origin-left bg-current/15" />

      <ul>
        {items.map(({ period, title: name, org, note, href, newTab }, i) => {
          const delay = 0.2 + i * 0.08; // rows cascade top to bottom
          const openInNewTab = newTab ?? href?.startsWith("http");

          return (
            <li
              key={`${period}-${name}-${i}`}
              className="relative grid grid-cols-[6.5rem_1fr] items-baseline gap-x-4 py-4 md:grid-cols-[10rem_1fr] md:gap-x-6 md:py-[18px]"
            >
              <motion.span
                {...reveal(delay)}
                className="text-[12px] font-light text-(color:--soft) md:text-[14px]"
              >
                {period}
              </motion.span>

              <motion.div {...reveal(delay + 0.04)} className="min-w-0">
                <p className="text-[14px] font-medium md:text-base">
                  {href ? (
                    <a
                      href={href}
                      target={openInNewTab ? "_blank" : undefined}
                      rel={openInNewTab ? "noopener noreferrer" : undefined}
                      className="transition-opacity hover:opacity-70 focus-visible:underline"
                    >
                      {name}
                    </a>
                  ) : (
                    name
                  )}
                </p>
                {org && (
                  <p className="mt-0.5 text-[12px] font-light text-(color:--soft) md:text-[14px]">
                    {org}
                  </p>
                )}
                {note && (
                  <p className="mt-2 max-w-[60ch] text-[12px] font-light leading-[1.6] text-(color:--soft) md:text-[13px]">
                    {note}
                  </p>
                )}
              </motion.div>

              {/* Row bottom line */}
              {bottomLines && (
                <motion.span
                  {...line(delay + 0.1)}
                  className="absolute inset-x-0 bottom-0 h-px origin-left bg-current/15"
                />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}