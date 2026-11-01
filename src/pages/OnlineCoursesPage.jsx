import { motion } from "framer-motion";
import { onlineCourses } from "../onlineCourses";
import { useLanguage, useLocalized } from "../context/LanguageContext";

// Same blur-in fade-up reveal as Block.jsx / Hero.jsx, staggered per item
const EASE = [0.22, 1, 0.36, 1];

// `custom` is the card index: cards in the same row start a little apart
const list = {
  hidden: {},
  show: (i = 0) => ({
    transition: { staggerChildren: 0.06, delayChildren: 0.1 + (i % 3) * 0.1 },
  }),
};

const item = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

// Thin top line: fades in while drawing left to right
const rule = {
  hidden: { opacity: 0, scaleX: 0 },
  show: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

export default function OnlineCoursesPage() {
  const { t } = useLanguage();
  const courses = useLocalized(onlineCourses);

  return (
    <div className="mt-[8vh] md:mt-[10vh]">
      {/* Small heading, same style as "Selected work" on the Projects page */}
      <motion.h1
        variants={item}
        initial="hidden"
        animate="show"
        className="mb-6 text-xs font-normal uppercase tracking-[0.25em] text-(color:--muted) md:mb-9 md:text-[0.9375rem]"
      >
        {t("section.onlineCourses")}
      </motion.h1>

      {/* 1 column on mobile (compact rows), 3 on desktop (compact cards) */}
      <ul className="grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-x-8 md:gap-y-10">
        {/* index key so cards don't remount (and re-animate) when the language changes */}
        {courses.map((c, i) => (
          <motion.li
            key={i}
            id={c.slug}
            custom={i}
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={rule} className="h-px origin-left bg-current/15" />

            {/* Mobile: logo on the left, text on the right. Desktop: stacked. */}
            <div className="flex gap-4 pt-4 md:block md:pt-5">
              {/* Course image: small, logo fits fully inside */}
              {c.image && (
                <motion.div
                  variants={item}
                  className="flex aspect-[3/2] w-24 shrink-0 items-center justify-center self-start overflow-hidden rounded-md bg-white p-2 sm:w-28 md:mb-4 md:aspect-[3/1] md:w-full md:p-3"
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.parentElement.style.display = "none")}
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              )}

              <div className="min-w-0 flex-1">
                <motion.p
                  variants={item}
                  className="text-[10px] font-light text-(color:--soft) md:text-[11px]"
                >
                  {[c.year, c.status].filter(Boolean).join(" · ")}
                </motion.p>

                <motion.h2
                  variants={item}
                  className="mt-1 text-[13px] font-medium leading-snug md:text-[14px]"
                >
                  {c.title}
                </motion.h2>

                <motion.p
                  variants={item}
                  className="mt-0.5 text-[11px] font-light leading-snug text-(color:--soft) md:text-[12px]"
                >
                  {c.platform}
                </motion.p>

                {c.description && (
                  <motion.p
                    variants={item}
                    className="mt-2 line-clamp-2 text-[11px] font-light leading-[1.6] text-(color:--soft) md:mt-3 md:line-clamp-4 md:text-[12px] md:leading-[1.65]"
                  >
                    {c.description}
                  </motion.p>
                )}

                {c.href && (
                  <motion.a
                    variants={item}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-[11px] font-normal transition-opacity hover:opacity-70 focus-visible:opacity-70 md:mt-3 md:text-[12px]"
                  >
                    {t("courses.viewCourse")} →
                  </motion.a>
                )}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}