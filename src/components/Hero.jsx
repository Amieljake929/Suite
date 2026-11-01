import { motion } from "framer-motion";
import { profile } from "../data";
import { useLanguage, useLocalized } from "../context/LanguageContext";

export default function Hero({
  text: textProp,
  // Only shows under the default home tagline, so other pages that pass
  // their own `text` don't get it unless they pass `subtitle` too.
  subtitle: subtitleProp,
}) {
  const { lang } = useLanguage();

  const isDefault = textProp === undefined || textProp === profile.tagline;
  const text = useLocalized(isDefault ? profile.tagline : textProp);
  const subtitle = useLocalized(
    subtitleProp !== undefined ? subtitleProp : isDefault ? profile.subtitle : undefined
  );

  const words = text.split(" ");
  const delayAfterWords = 0.35 + words.length * 0.04 + 0.1;

  return (
    // key={lang} replays the animation when the language changes
    <div key={lang}>
      <h2 className="max-w-[90%] text-[18px] font-light leading-[1.5] tracking-[0.04em] md:text-[1.92vw]">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: 0.35 + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mr-[0.25em] inline-block"
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.7,
            delay: delayAfterWords,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-5 max-w-[90%] text-[13px] font-light leading-[1.6] text-(color:--soft) md:mt-6 md:max-w-[60%] md:text-[17px]"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}