import { useLanguage } from "../context/LanguageContext";
import { languages } from "../translations";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className="flex items-center gap-2 text-[11px] font-normal tracking-[0.08em] md:text-[12px]"
    >
      {languages.map(({ code, short, label }, i) => (
        <span key={code} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden="true" className="opacity-25">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(code)}
            lang={code}
            aria-label={label}
            aria-pressed={lang === code}
            className={`cursor-pointer transition-opacity hover:opacity-100 focus-visible:opacity-100 ${
              lang === code ? "opacity-100" : "opacity-50"
            }`}
          >
            {short}
          </button>
        </span>
      ))}
    </div>
  );
}