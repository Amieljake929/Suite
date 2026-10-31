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

export default function GearSection({ title, items = [] }) {
  return (
    <section className="col-span-2">
      {/* Centered container: heading and cards share the same left edge */}
      <div className="md:mx-auto md:max-w-[62rem]">
        <motion.h2
          {...reveal(0.1)}
          className="mb-6 text-xs font-normal uppercase tracking-[0.25em] text-(color:--muted) md:mb-8 md:text-[0.9375rem]"
        >
          {title}
        </motion.h2>

        {/* 2 columns on mobile, 3 on desktop */}
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {items.map(({ name, description, image, href }, i) => {
            // Cards in the same row start together; each row cascades down
            const delay = 0.1 + (i % 3) * 0.08;
            const Card = href ? "a" : "div";
            const cardProps = href
              ? { href, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <motion.li key={`${name}-${i}`} {...reveal(delay)}>
                <Card
                  {...cardProps}
                  className="group flex h-full flex-col rounded-xl border border-current/10 p-4 transition-colors duration-300 hover:border-current/30 md:rounded-2xl md:p-6"
                >
                  {/* Fixed-size image box: the photo can never change the card size */}
                  <div className="relative aspect-square shrink-0 overflow-hidden md:aspect-auto md:h-48">
                    {/* Fallback initial shows if the image file is missing */}
                    <span className="absolute inset-0 flex items-center justify-center text-2xl font-light text-(color:--muted) md:text-4xl">
                      {name.charAt(0)}
                    </span>
                    {image && (
                      <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                        className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.04] md:p-5"
                      />
                    )}
                  </div>

                  {/* Name + description, pinned to the bottom of the card */}
                  <div className="mt-auto min-w-0 pt-4 md:pt-5">
                    <h3 className="text-[12px] font-medium leading-snug md:text-[14px]">
                      {name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[10px] font-light leading-[1.5] text-(color:--soft) md:text-[12px]">
                      {description}
                    </p>
                  </div>
                </Card>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}