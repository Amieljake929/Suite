import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { profile } from "../data";
import { useLanguage, useLocalized } from "../context/LanguageContext";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const links = [
  { to: "/about", key: "nav.about" },
  { to: "/projects", key: "nav.projects" },
  { to: "/gear", key: "nav.gear" },
  { to: "/blogs", key: "nav.blogs" },
];

const ROLE_INTERVAL = 5000; // ms

export default function Header() {
  const { t } = useLanguage();
  const me = useLocalized(profile);
  const [open, setOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle the role every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.roles.length);
    }, ROLE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Close on Escape, and when the screen grows to desktop size
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-50 flex items-start justify-between"
      >
        <Link to="/" onClick={() => setOpen(false)} className="block w-fit">
          <h1 className="text-lg font-normal leading-tight md:text-xl">{me.name}</h1>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={me.roles[roleIndex]}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] font-light text-(color:--soft) md:text-[12px]"
            >
              {me.roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </Link>

        {/* Desktop: inline links */}
        <nav
          aria-label={t("header.mainNav")}
          className="hidden items-center gap-8 text-base md:flex"
        >
          {links.map(({ to, key }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `transition-opacity hover:opacity-100 focus-visible:opacity-100 ${
                  isActive ? "opacity-100" : "opacity-60"
                }`
              }
            >
              {t(key)}
            </NavLink>
          ))}

          {/* Thin vertical divider */}
          <span aria-hidden="true" className="h-4 w-px bg-current/20" />

          <LanguageSwitcher />

          {/* Thin vertical divider */}
          <span aria-hidden="true" className="h-4 w-px bg-current/20" />

          <ThemeToggle />
        </nav>

        {/* Mobile: language + theme toggle + menu button, aligned with the name */}
        <div className="flex h-6 items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("header.closeMenu") : t("header.openMenu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-6 w-6 cursor-pointer items-center justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay (outside the animated header so `fixed` works) */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label={t("header.mobileNav")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-(--bg) px-[10vw] pt-[30vh] md:hidden"
          >
            <ul className="space-y-7">
              {links.map(({ to, key }, i) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `text-3xl font-light tracking-[0.04em] transition-opacity ${
                        isActive ? "opacity-100" : "opacity-50"
                      }`
                    }
                  >
                    {t(key)}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}