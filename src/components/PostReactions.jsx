import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThumbsDown, ThumbsUp } from "lucide-react";

// Same blur-in fade-up reveal as Hero.jsx
const EASE = [0.22, 1, 0.36, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-5% 0px" },
  transition: { duration: 0.7, delay, ease: EASE },
});

function readVote(key) {
  try {
    const v = localStorage.getItem(key);
    return v === "like" || v === "dislike" ? v : null;
  } catch {
    return null;
  }
}

// baseLikes / baseDislikes are the starting counts.
// The visitor's own vote is added on top and saved in this browser only.
export default function PostReactions({ slug, baseLikes = 0, baseDislikes = 0 }) {
  const key = `reaction:${slug}`;
  const [vote, setVote] = useState(() => readVote(key)); // "like" | "dislike" | null

  useEffect(() => {
    try {
      if (vote) localStorage.setItem(key, vote);
      else localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }, [vote, key]);

  // Tap again to undo, tap the other one to switch
  const toggle = (type) => setVote((v) => (v === type ? null : type));

  const likes = baseLikes + (vote === "like" ? 1 : 0);
  const dislikes = baseDislikes + (vote === "dislike" ? 1 : 0);

  const buttonClass = (active) =>
    `inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-light transition md:text-[13px] ${
      active
        ? "border-current/50 opacity-100"
        : "border-current/15 opacity-60 hover:border-current/30 hover:opacity-100"
    }`;

  return (
    <motion.div
      {...reveal(0.05)}
      className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3"
    >
      <p className="text-[12px] font-light text-(color:--soft) md:text-[14px]">
        Did you enjoy this post?
      </p>

      <div className="flex items-center gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          onClick={() => toggle("like")}
          aria-label="Like this post"
          aria-pressed={vote === "like"}
          className={buttonClass(vote === "like")}
        >
          <ThumbsUp size={14} fill={vote === "like" ? "currentColor" : "none"} />
          <span>{likes}</span>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          onClick={() => toggle("dislike")}
          aria-label="Dislike this post"
          aria-pressed={vote === "dislike"}
          className={buttonClass(vote === "dislike")}
        >
          <ThumbsDown
            size={14}
            fill={vote === "dislike" ? "currentColor" : "none"}
          />
          <span>{dislikes}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}