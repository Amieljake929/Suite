import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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

function ProjectLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 text-[12px] font-normal transition-opacity hover:opacity-70 focus-visible:underline md:text-[13px]"
    >
      <span>{children}</span>
      <ArrowUpRight
        size="0.75rem"
        className="-translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
      />
    </a>
  );
}

export default function ProjectGrid({ title: titleProp, items: itemsProp = [] }) {
  const { t } = useLanguage();
  const title = useLocalized(titleProp) ?? t("projects.selected");
  const items = useLocalized(itemsProp);

  return (
    <section className="col-span-2">
      <motion.h2
        {...reveal(0.1)}
        className="mb-8 text-xs font-normal uppercase tracking-[0.25em] text-(color:--muted) md:mb-11 md:text-[0.9375rem]"
      >
        {title}
      </motion.h2>

      <ul className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 md:gap-y-16">
        {items.map(
          ({ title: name, year, description, tech, image, live, code }, i) => {
            // Cards in the same row start together; each row cascades down
            const delay = 0.1 + (i % 2) * 0.1;

            const picture = (
              <div className="relative aspect-[16/10] overflow-hidden bg-current/5">
                {/* Fallback initial shows if the image file is missing */}
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-light text-(color:--muted)">
                  {name.charAt(0)}
                </span>
                {image && (
                  <img
                    src={image}
                    alt={`${name} ${t("projects.screenshot")}`}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                    className="relative h-full w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
                  />
                )}
              </div>
            );

            return (
              // index key so cards don't remount (and re-animate) when the language changes
              <li key={i}>
                {/* Top line */}
                <motion.div
                  {...line(delay)}
                  className="h-px origin-left bg-current/15"
                />

                {/* Image (links to the live site when there is one) */}
                <motion.div {...reveal(delay + 0.05)} className="mt-4 md:mt-5">
                  {live ? (
                    <a
                      href={live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t("projects.open")} ${name}`}
                      className="group/img block"
                    >
                      {picture}
                    </a>
                  ) : (
                    <div className="group/img">{picture}</div>
                  )}
                </motion.div>

                {/* Title + year */}
                <motion.div
                  {...reveal(delay + 0.1)}
                  className="mt-4 flex items-baseline justify-between gap-4"
                >
                  <h3 className="text-[14px] font-medium md:text-[15px]">
                    {name}
                  </h3>
                  <span className="text-[11px] font-light text-(color:--soft) md:text-[12px]">
                    {year}
                  </span>
                </motion.div>

                {description && (
                  <motion.p
                    {...reveal(delay + 0.14)}
                    className="mt-2 max-w-[55ch] text-[12px] font-light leading-[1.6] text-(color:--soft) md:text-[13px]"
                  >
                    {description}
                  </motion.p>
                )}

                {tech && (
                  <motion.p
                    {...reveal(delay + 0.18)}
                    className="mt-3 text-[11px] font-light text-(color:--muted) md:text-[12px]"
                  >
                    {tech}
                  </motion.p>
                )}

                {(live || code) && (
                  <motion.div
                    {...reveal(delay + 0.22)}
                    className="mt-4 flex items-center gap-5"
                  >
                    {live && <ProjectLink href={live}>{t("projects.live")}</ProjectLink>}
                    {code && <ProjectLink href={code}>{t("projects.code")}</ProjectLink>}
                  </motion.div>
                )}
              </li>
            );
          }
        )}
      </ul>
    </section>
  );
}