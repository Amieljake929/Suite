import { motion } from "framer-motion";
import { useLanguage, useLocalized } from "../context/LanguageContext";

/*
  Online Courses — 4 layouts, switch with the `variant` prop:

    <OnlineCourses items={onlineCourses} href={onlineCoursesLink} variant="timeline" />

    "timeline"  3 columns, each with a thin top line + dot (default)
    "ledger"    one compact line per course, like an elegant table
    "byYear"    courses grouped by year, with a large light year on the left
    "showcase"  big light titles with small details on the right
*/

// Same blur-in fade-up reveal as Hero.jsx / Seminars.jsx
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

// Vertical line segments (mobile timeline): draw top to bottom
const vline = (delay = 0) => ({
  initial: { opacity: 0, scaleY: 0 },
  whileInView: { opacity: 1, scaleY: 1 },
  viewport: VIEWPORT,
  transition: { duration: 0.9, delay, ease: EASE },
});

// Timeline dots: pop in softly
const dot = (delay = 0) => ({
  initial: { opacity: 0, scale: 0 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: VIEWPORT,
  transition: { duration: 0.6, delay, ease: EASE },
});

// Renders a link when the course has an href, otherwise a plain block
function getRow(link) {
  return {
    Row: link ? motion.a : motion.div,
    rowProps: link ? { href: link, target: "_blank", rel: "noreferrer" } : {},
  };
}

/* ───────────────────────── 1. Timeline ───────────────────────── */
function Timeline({ items }) {
  return (
    <ul className="relative grid grid-cols-1 gap-y-9 pl-7 md:grid-cols-3 md:gap-x-10 md:gap-y-12 md:pl-0">
      {items.map((c, i) => {
        const delay = 0.15 + (i % 3) * 0.1;
        const { Row, rowProps } = getRow(c.href);

        return (
          <li key={i} className="relative md:pt-5">
            <motion.span
              aria-hidden="true"
              {...line(delay)}
              className="absolute left-0 right-0 top-0 hidden h-px origin-left bg-current/15 md:block"
            />
            <motion.span
              aria-hidden="true"
              {...dot(delay + 0.05)}
              className="absolute -left-7 top-[0.3rem] size-[7px] rounded-full bg-current/40 md:-top-[3px] md:left-0"
            />

            {/* Mobile: vertical line segment from this dot down to the next one.
                It uses the same viewport trigger and delay as the item, so the
                line draws in together with each course instead of ahead of it. */}
            {i < items.length - 1 && (
              <motion.span
                aria-hidden="true"
                {...vline(delay + 0.1)}
                className="absolute -bottom-9 -left-[25px] top-[calc(0.3rem+3px)] w-px origin-top bg-current/15 md:hidden"
              />
            )}

            <Row {...rowProps} {...reveal(delay + 0.1)} className="group block">
              {/* Year (status sits here on desktop only) */}
              <div className="flex items-baseline justify-between gap-4 text-[11px] font-light text-(color:--soft) md:text-[12px]">
                <span>{c.year}</span>
                <span className="hidden md:inline">{c.status}</span>
              </div>

              {/* Title (status sits here on mobile only) */}
              <div className="mt-2 flex items-baseline justify-between gap-4">
                <h3 className="text-[14px] font-medium leading-snug transition-transform duration-500 ease-out group-hover:translate-x-1 md:text-[16px]">
                  {c.title}
                </h3>
                <span className="shrink-0 text-[11px] font-light text-(color:--soft) md:hidden">
                  {c.status}
                </span>
              </div>
              <p className="mt-1.5 text-[12px] font-light leading-[1.6] text-(color:--soft) md:text-[13px]">
                {c.platform}
              </p>
            </Row>
          </li>
        );
      })}
    </ul>
  );
}

/* ───────────────────────── 2. Ledger ───────────────────────── */
// One compact line per course: title | platform | year | status
function Ledger({ items }) {
  return (
    <ul>
      {items.map((c, i) => {
        const delay = 0.15 + i * 0.06;
        const { Row, rowProps } = getRow(c.href);

        return (
          <li key={i}>
            <motion.div {...line(delay)} className="h-px origin-left bg-current/15" />
            <Row
              {...rowProps}
              {...reveal(delay + 0.05)}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-4 md:grid-cols-[1fr_11rem_4rem_6.5rem] md:py-[1.125rem]"
            >
              <h3 className="order-1 text-[14px] font-medium leading-snug transition-transform duration-500 ease-out group-hover:translate-x-1 md:order-none md:text-[16px]">
                {c.title}
              </h3>
              <span className="order-3 text-[12px] font-light text-(color:--soft) md:order-none md:text-[13px]">
                {c.platform}
              </span>
              <span className="order-4 text-right text-[11px] font-light text-(color:--soft) md:order-none md:text-left md:text-[12px]">
                {c.year}
              </span>
              <span className="order-2 text-right text-[11px] font-light text-(color:--soft) md:order-none md:text-[12px]">
                {c.status}
              </span>
            </Row>
          </li>
        );
      })}
      {items.length > 0 && (
        <li aria-hidden="true">
          <motion.div
            {...line(0.15 + items.length * 0.06)}
            className="h-px origin-left bg-current/15"
          />
        </li>
      )}
    </ul>
  );
}

/* ───────────────────────── 3. By year ───────────────────────── */
// Courses grouped by year; the year is a large, light numeral
function ByYear({ items }) {
  const groups = [];
  items.forEach((c) => {
    const last = groups[groups.length - 1];
    if (last && last.year === c.year) last.courses.push(c);
    else groups.push({ year: c.year, courses: [c] });
  });

  return (
    <ul>
      {groups.map((g, gi) => {
        const delay = 0.15 + gi * 0.1;

        return (
          <li key={gi}>
            <motion.div {...line(delay)} className="h-px origin-left bg-current/15" />
            <div className="grid grid-cols-1 gap-y-4 py-5 md:grid-cols-[9rem_1fr] md:py-7">
              <motion.span
                {...reveal(delay + 0.05)}
                className="text-[26px] font-light leading-none tracking-tight text-(color:--soft) md:text-[34px]"
              >
                {g.year}
              </motion.span>

              <ul className="flex flex-col gap-y-5">
                {g.courses.map((c, ci) => {
                  const { Row, rowProps } = getRow(c.href);
                  return (
                    <li key={ci}>
                      <Row
                        {...rowProps}
                        {...reveal(delay + 0.1 + ci * 0.06)}
                        className="group flex items-baseline justify-between gap-6"
                      >
                        <div className="min-w-0">
                          <h3 className="text-[14px] font-medium leading-snug transition-transform duration-500 ease-out group-hover:translate-x-1 md:text-[16px]">
                            {c.title}
                          </h3>
                          <p className="mt-1 text-[12px] font-light text-(color:--soft) md:text-[13px]">
                            {c.platform}
                          </p>
                        </div>
                        <span className="shrink-0 text-[11px] font-light text-(color:--soft) md:text-[12px]">
                          {c.status}
                        </span>
                      </Row>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        );
      })}
      {groups.length > 0 && (
        <li aria-hidden="true">
          <motion.div
            {...line(0.15 + groups.length * 0.1)}
            className="h-px origin-left bg-current/15"
          />
        </li>
      )}
    </ul>
  );
}

/* ───────────────────────── 4. Showcase ───────────────────────── */
// Big, light titles. Details sit quietly on the right.
function Showcase({ items }) {
  return (
    <ul>
      {items.map((c, i) => {
        const delay = 0.15 + i * 0.08;
        const { Row, rowProps } = getRow(c.href);

        return (
          <li key={i}>
            <motion.div {...line(delay)} className="h-px origin-left bg-current/15" />
            <Row
              {...rowProps}
              {...reveal(delay + 0.05)}
              className="group flex flex-col gap-y-2 py-5 md:flex-row md:items-baseline md:justify-between md:gap-x-10 md:py-6"
            >
              <h3 className="text-[19px] font-light leading-tight tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-[28px]">
                {c.title}
              </h3>
              <div className="shrink-0 text-[12px] font-light leading-[1.6] text-(color:--soft) md:text-right md:text-[13px]">
                <div>{c.platform}</div>
                <div className="text-[11px] md:text-[12px]">
                  {c.year}, {c.status}
                </div>
              </div>
            </Row>
          </li>
        );
      })}
      {items.length > 0 && (
        <li aria-hidden="true">
          <motion.div
            {...line(0.15 + items.length * 0.08)}
            className="h-px origin-left bg-current/15"
          />
        </li>
      )}
    </ul>
  );
}

const VARIANTS = {
  timeline: Timeline,
  ledger: Ledger,
  byYear: ByYear,
  showcase: Showcase,
};

export default function OnlineCourses({
  title: titleProp,
  items = [],
  href,
  variant = "timeline",
}) {
  const { t } = useLanguage();
  const localizedItems = useLocalized(items);

  // Use the translation if it exists, otherwise fall back to plain text
  const tr = (key, fallback) => {
    const value = t(key);
    return !value || value === key ? fallback : value;
  };

  const title = titleProp ?? tr("section.onlineCourses", "Online Courses");
  const detailsLabel = tr("onlineCourses.details", "Details");
  const Layout = VARIANTS[variant] ?? Timeline;

  return (
    <section>
      {/* Heading row (same style as Seminars / Block headings) */}
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
            {detailsLabel} →
          </motion.a>
        )}
      </div>

      <Layout items={localizedItems} />
    </section>
  );
}