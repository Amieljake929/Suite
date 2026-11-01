import { useEffect, useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function readVote(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export default function PostReactions({ slug, baseLikes = 0, baseDislikes = 0 }) {
  const { t } = useLanguage();
  const voteKey = `post-vote:${slug}`;
  const [vote, setVote] = useState(() => readVote(voteKey)); // "like" | "dislike" | null

  useEffect(() => {
    try {
      if (vote) localStorage.setItem(voteKey, vote);
      else localStorage.removeItem(voteKey);
    } catch {
      /* ignore */
    }
  }, [vote, voteKey]);

  // Tap again to undo, tap the other to switch
  const toggle = (type) => setVote((v) => (v === type ? null : type));

  const likes = baseLikes + (vote === "like" ? 1 : 0);
  const dislikes = baseDislikes + (vote === "dislike" ? 1 : 0);

  const btn =
    "inline-flex cursor-pointer items-center gap-2 text-[13px] font-light transition-opacity hover:opacity-100 focus-visible:opacity-100 md:text-[14px]";

  return (
    <div className="flex items-center gap-6">
      <button
        type="button"
        onClick={() => toggle("like")}
        aria-label={t("reactions.like")}
        aria-pressed={vote === "like"}
        className={`${btn} ${vote === "like" ? "opacity-100" : "opacity-50"}`}
      >
        <ThumbsUp size={18} fill={vote === "like" ? "currentColor" : "none"} />
        <span>{likes}</span>
      </button>

      <button
        type="button"
        onClick={() => toggle("dislike")}
        aria-label={t("reactions.dislike")}
        aria-pressed={vote === "dislike"}
        className={`${btn} ${vote === "dislike" ? "opacity-100" : "opacity-50"}`}
      >
        <ThumbsDown size={18} fill={vote === "dislike" ? "currentColor" : "none"} />
        <span>{dislikes}</span>
      </button>
    </div>
  );
}