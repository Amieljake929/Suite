import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { posts } from "../blogsData";
import { postStats } from "../postStatsData";
import { useLanguage, useLocalized } from "../context/LanguageContext";
import PostReactions from "../components/PostReactions";

// Same blur-in fade-up reveal as Hero.jsx
const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-5% 0px" };

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: VIEWPORT,
  transition: { duration: 0.7, delay, ease: EASE },
});

// Same blur-in fade-up, but plays on load (used for the right column)
const revealOnLoad = (delay = 0) => ({
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.7, delay, ease: EASE },
});

function BackLink() {
  const { t } = useLanguage();
  return (
    <Link
      to="/blogs"
      className="inline-block text-[12px] font-light text-(color:--soft) transition-opacity hover:opacity-70 focus-visible:opacity-70 md:text-[14px]"
    >
      ← {t("blog.allPosts")}
    </Link>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const allPosts = useLocalized(posts);
  const post = allPosts.find((p) => p.slug === slug);

  // Always open a post at the top of the page
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  if (!post) {
    return (
      <div className="mt-[14vh] md:mt-[18vh]">
        <motion.div {...reveal(0.1)}>
          <h1 className="text-2xl font-light md:text-4xl">{t("blog.notFound")}</h1>
          <p className="mt-4 text-[14px] font-light text-(color:--soft)">
            {t("blog.notFoundText")}
          </p>
          <div className="mt-8">
            <BackLink />
          </div>
        </motion.div>
      </div>
    );
  }

  const { title, date, tag, readTime, image } = post;
  // Always an array, even if the data is in an unexpected shape
  const content = Array.isArray(post.content) ? post.content : [];
  const meta = [date, tag, readTime].filter(Boolean).join(" · ");
  const stats = postStats[slug] ?? { likes: post.likes, dislikes: post.dislikes };

  return (
    // Desktop (xl+): 2 columns, 4 rows
    //   row 1: back link (left)
    //   row 2: meta line (left)
    //   row 3-4: title + image (left) | article text (right), both start on the title row
    //   row 4: reactions (left)
    // Below xl: single column in DOM order
    <div
      key={slug} // replays the animation when moving between posts
      className="mt-[14vh] md:mt-[18vh] xl:mt-[10vh] xl:grid xl:grid-cols-2 xl:grid-rows-[auto_auto_auto_1fr] xl:gap-x-16"
    >
      {/* LEFT row 1: back link */}
      <motion.div {...reveal(0.05)} className="xl:col-start-1 xl:row-start-1">
        <BackLink />
      </motion.div>

      {/* LEFT row 2: meta */}
      <motion.p
        {...reveal(0.12)}
        className="mt-10 text-[11px] font-light text-(color:--soft) md:mt-14 md:text-[13px] xl:col-start-1 xl:row-start-2"
      >
        {meta}
      </motion.p>

      {/* LEFT row 3: title + image */}
      <div className="mt-3 xl:col-start-1 xl:row-start-3">
        <motion.h1
          {...reveal(0.18)}
          className="text-[26px] font-light leading-[1.3] tracking-[0.02em] md:text-4xl"
        >
          {title}
        </motion.h1>

        {image && (
          <motion.div
            {...reveal(0.26)}
            className="mt-8 aspect-[16/9] overflow-hidden rounded-md bg-current/5 md:mt-12 xl:mt-8"
          >
            <img
              src={image}
              alt={title}
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="h-full w-full object-cover"
            />
          </motion.div>
        )}
      </div>

      {/* RIGHT: article text, starts on the same row as the title.
          No inner scroll box, so the whole page scrolls normally. */}
      <div className="mt-8 max-w-[44rem] md:mt-12 xl:col-start-2 xl:row-span-2 xl:row-start-3 xl:mt-3 xl:max-w-none xl:self-start xl:pt-1">
        {content.map((block, i) => {
          const isHeading = block.startsWith("## ");
          const delay = 0.3 + Math.min(i, 8) * 0.08; // staggered fade-in
          return isHeading ? (
            <motion.h2
              key={i}
              {...revealOnLoad(delay)}
              className="mb-3 mt-10 text-[16px] font-medium first:mt-0 md:text-[18px]"
            >
              {block.slice(3)}
            </motion.h2>
          ) : (
            <motion.p
              key={i}
              {...revealOnLoad(delay)}
              className="mb-5 text-[14px] font-light leading-[1.85] md:text-[16px]"
            >
              {block}
            </motion.p>
          );
        })}
      </div>

      {/* LEFT row 4: like / dislike */}
      <motion.div
        {...reveal(0.1)}
        className="mt-8 xl:col-start-1 xl:row-start-4 xl:self-start"
      >
        <PostReactions
          key={slug}
          slug={slug}
          baseLikes={stats.likes}
          baseDislikes={stats.dislikes}
        />
      </motion.div>
    </div>
  );
}