import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { posts } from "../blogsData";
import { postStats } from "../commentsData";
import CommentSection from "../components/CommentSection";
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

const line = (delay = 0) => ({
  initial: { opacity: 0, scaleX: 0 },
  whileInView: { opacity: 1, scaleX: 1 },
  viewport: VIEWPORT,
  transition: { duration: 0.9, delay, ease: EASE },
});

function BackLink() {
  return (
    <Link
      to="/blogs"
      className="inline-block text-[12px] font-light text-(color:--soft) transition-opacity hover:opacity-70 focus-visible:opacity-70 md:text-[14px]"
    >
      ← All posts
    </Link>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="mt-[14vh] md:mt-[18vh]">
        <motion.div {...reveal(0.1)}>
          <h1 className="text-2xl font-light md:text-4xl">Post not found</h1>
          <p className="mt-4 text-[14px] font-light text-(color:--soft)">
            That post doesn’t exist or may have moved.
          </p>
          <div className="mt-8">
            <BackLink />
          </div>
        </motion.div>
      </div>
    );
  }

  const { title, date, tag, readTime, image, content = [] } = post;
  const meta = [date, tag, readTime].filter(Boolean).join(" · ");
  const stats = postStats[slug] ?? { likes: post.likes, dislikes: post.dislikes };

  return (
    // Desktop (xl+): article on the left, reactions + comments on the right
    <div className="mt-[14vh] md:mt-[18vh] xl:grid xl:grid-cols-[minmax(0,46rem)_minmax(0,28rem)] xl:justify-between xl:gap-x-12">
      {/* key makes the animation replay if you move between posts */}
      <article key={slug} className="max-w-[44rem] xl:max-w-none">
        <motion.div {...reveal(0.05)}>
          <BackLink />
        </motion.div>

        <motion.p
          {...reveal(0.12)}
          className="mt-10 text-[11px] font-light text-(color:--soft) md:mt-14 md:text-[13px]"
        >
          {meta}
        </motion.p>

        <motion.h1
          {...reveal(0.18)}
          className="mt-3 text-[26px] font-light leading-[1.3] tracking-[0.02em] md:text-4xl"
        >
          {title}
        </motion.h1>

        {image && (
          <motion.div
            {...reveal(0.26)}
            className="mt-8 aspect-[16/9] overflow-hidden rounded-md bg-current/5 md:mt-12"
          >
            <img
              src={image}
              alt={title}
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="h-full w-full object-cover"
            />
          </motion.div>
        )}

        {/* Body */}
        <div className="mt-8 md:mt-12">
          {content.map((block, i) => {
            const isHeading = block.startsWith("## ");
            return isHeading ? (
              <motion.h2
                key={i}
                {...reveal(0.05)}
                className="mb-3 mt-10 text-[16px] font-medium md:text-[18px]"
              >
                {block.slice(3)}
              </motion.h2>
            ) : (
              <motion.p
                key={i}
                {...reveal(0.05)}
                className="mb-5 text-[14px] font-light leading-[1.85] md:text-[16px]"
              >
                {block}
              </motion.p>
            );
          })}
        </div>

        {/* Footer of the post */}
        <motion.div
          {...line(0.05)}
          className="mt-12 h-px origin-left bg-current/15"
        />
        <motion.div {...reveal(0.1)} className="mt-6">
          <BackLink />
        </motion.div>
      </article>

      {/* Right column: stays in view on desktop and scrolls on its own.
          data-lenis-prevent lets the mouse wheel scroll it despite smooth scroll. */}
      <aside
        data-lenis-prevent
        className="mt-16 xl:sticky xl:top-8 xl:mt-0 xl:max-h-[calc(100vh-4rem)] xl:self-start xl:overflow-y-auto xl:pr-3 xl:[scrollbar-width:thin]"
      >
        <PostReactions
          key={slug}
          slug={slug}
          baseLikes={stats.likes}
          baseDislikes={stats.dislikes}
        />

        <div className="mt-10">
          <CommentSection key={slug} slug={slug} />
        </div>
      </aside>
    </div>
  );
}