import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { languages, ui } from "../translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "language";
const codes = languages.map((l) => l.code);

const getInitialLanguage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (codes.includes(saved)) return saved;
  } catch {}
  return "en";
};

const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

// Walks any data (strings, arrays, objects) and swaps every { en, es, tl }
// object for the text of the current language. Everything else is left alone.
function localize(value, lang) {
  if (Array.isArray(value)) return value.map((v) => localize(v, lang));
  if (isPlainObject(value)) {
    if ("en" in value) return value[lang] ?? value.en;
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, localize(v, lang)])
    );
  }
  return value;
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

  // UI label lookup (falls back to English, then to the key itself)
  const t = useCallback((key) => ui[lang]?.[key] ?? ui.en[key] ?? key, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);

// Use for content from data.js / blogsData.js:
//   const me = useLocalized(profile);
export function useLocalized(data) {
  const { lang } = useLanguage();
  return useMemo(() => localize(data, lang), [data, lang]);
}