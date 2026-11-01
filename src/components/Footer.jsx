import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// Same blur-in fade-up reveal as Hero.jsx
const EASE = [0.22, 1, 0.36, 1];

// Parent: plays once the footer is almost fully on screen, staggers children
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// Text: blur-in fade-up (same values as Hero)
const item = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

// Divider line: fade in while drawing left to right
const line = {
  hidden: { opacity: 0, scaleX: 0 },
  show: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

export default function Footer({ onBackToTop }) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <motion.footer
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
      className="mt-[14vh] pb-8 md:pb-10"
    >
      <motion.div variants={line} className="h-px origin-left bg-current/15" />

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-6 md:pt-8">
        <motion.p
          variants={item}
          className="text-[12px] font-light text-(color:--soft) md:text-[14px]"
        >
          © {year} {t("footer.rights")}
        </motion.p>

        <motion.button
          variants={item}
          type="button"
          onClick={onBackToTop}
          className="cursor-pointer text-[12px] font-light text-(color:--soft) transition-opacity hover:opacity-70 focus-visible:opacity-70 md:text-[14px]"
        >
          {t("footer.backToTop")} ↑
        </motion.button>
      </div>
    </motion.footer>
  );
}