import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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

// Router Link for internal paths, normal link for everything else
function Card({ href, className, children }) {
  if (!href || href === "#") return <div className={className}>{children}</div>;
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

export default function BlogPosts({ title: titleProp, items: itemsProp = [], href }) {
  const { t } = useLanguage();
  const title = useLocalized(titleProp) ?? t("section.blog");
  const items = useLocalized(itemsProp);

  return (
    <section>
            {/* Heading row */}
      <div className="mb-8 flex items-center justify-between gap-4 md:mb-11">
        <motion.h2
          {...reveal(0.1)}
          className="text-xs font-normal uppercase tracking-[0.25em] text-(color:--muted) md:text-[0.9375rem]"
        >
          {title}
        </motion.h2>

        {href && (
          <motion.div {...reveal(0.14)} className="shrink-0">
            <Link
              to={href}
              className="-mr-[0.25em] block whitespace-nowrap text-xs font-normal uppercase tracking-[0.25em] text-(color:--muted) transition-opacity hover:opacity-70 focus-visible:opacity-70 md:text-[0.9375rem]"
            >
              {t("home.allPosts")} →
            </Link>
          </motion.div>
        )}
      </div>

      {/* Posts: 1 column on mobile, 3 on desktop */}
      <ul className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
        {items.map(({ title: name, excerpt, date, href: to }, i) => {
          const delay = 0.15 + i * 0.1; // cards cascade left to right

          return (
            // index key so cards don't remount (and re-animate) when the language changes
            <li key={i}>
              <motion.div {...line(delay)} className="h-px origin-left bg-current/15" />

              <Card
                href={to}
                className="block pt-5 transition-opacity hover:opacity-70 focus-visible:opacity-70 md:pt-6"
              >
                <motion.span
                  {...reveal(delay + 0.05)}
                  className="block text-[12px] font-light text-(color:--soft) md:text-[14px]"
                >
                  {date}
                </motion.span>

                <motion.h3
                  {...reveal(delay + 0.1)}
                  className="mt-2 text-[14px] font-normal leading-snug md:text-[18px]"
                >
                  {name}
                </motion.h3>

                {excerpt && (
                  <motion.p
                    {...reveal(delay + 0.15)}
                    className="mt-3 line-clamp-2 text-[12px] font-light leading-[1.6] text-(color:--soft) md:text-[14px]"
                  >
                    {excerpt}
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