import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { seedComments } from "../commentsData";

// Same blur-in fade-up reveal as Hero.jsx
const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-5% 0px" };

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: VIEWPORT,
  transition: { duration: 0.7, delay, ease: EASE },
});

// Horizontal lines: fade in while drawing left to right
const line = (delay = 0) => ({
  initial: { opacity: 0, scaleX: 0 },
  whileInView: { opacity: 1, scaleX: 1 },
  viewport: VIEWPORT,
  transition: { duration: 0.9, delay, ease: EASE },
});

const exit = {
  opacity: 0,
  filter: "blur(4px)",
  transition: { duration: 0.25 },
};

const MAX_NAME = 40;
const MAX_TEXT = 500;
const HOUR = 60 * 60 * 1000;
const NAME_KEY = "commenter-name";

// Each post gets its own placeholder comments from commentsData.js
function getSeed(slug) {
  return (seedComments[slug] ?? []).map(({ hoursAgo, ...c }) => ({
    ...c,
    time: Date.now() - hoursAgo * HOUR,
  }));
}

function timeAgo(ts) {
  const sec = Math.floor((Date.now() - ts) / 1000);
  if (sec < 60) return "Just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} day${day > 1 ? "s" : ""} ago`;
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return fallback;
}

// Fills in fields that older saved comments don't have
const normalize = (list) =>
  list.map((c) => ({ parentId: null, likes: 0, dislikes: 0, ...c }));

// Small text button used for like / dislike / reply / delete
function Action({ onClick, active, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`inline-flex cursor-pointer items-center gap-1.5 text-[11px] font-light transition-opacity hover:opacity-100 focus-visible:opacity-100 md:text-[12px] ${
        active ? "opacity-100" : "opacity-50"
      }`}
    >
      {children}
    </button>
  );
}

function Comment({
  c,
  isReply = false,
  delay = 0,
  myVote,
  onVote,
  onReply,
  onDelete,
  children,
}) {
  return (
    <motion.li
      {...reveal(delay)}
      exit={exit}
      className={`relative ${isReply ? "" : "py-5"}`}
    >
      <div className="flex gap-3">
        <span
          className={`flex shrink-0 items-center justify-center rounded-full border border-current/15 font-light text-(color:--soft) ${
            isReply ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-[12px]"
          }`}
        >
          {c.name.charAt(0).toUpperCase()}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
            <span className="text-[13px] font-medium md:text-[14px]">
              {c.name}
            </span>
            {c.author && (
              <span className="text-[10px] font-light uppercase tracking-[0.15em] text-(color:--muted)">
                Author
              </span>
            )}
            <span className="text-[11px] font-light text-(color:--muted) md:text-[12px]">
              {timeAgo(c.time)}
            </span>
          </div>

          <p className="mt-1.5 whitespace-pre-line break-words text-[13px] font-light leading-[1.7] text-(color:--soft) md:text-[14px]">
            {c.to && <span className="text-(color:--muted)">@{c.to} </span>}
            {c.text}
          </p>

          <div className="mt-3 flex items-center gap-5">
            <Action
              onClick={() => onVote(c.id, "like")}
              active={myVote === "like"}
              label="Like"
            >
              <ThumbsUp
                size={13}
                fill={myVote === "like" ? "currentColor" : "none"}
              />
              <span>{c.likes}</span>
            </Action>
            <Action
              onClick={() => onVote(c.id, "dislike")}
              active={myVote === "dislike"}
              label="Dislike"
            >
              <ThumbsDown
                size={13}
                fill={myVote === "dislike" ? "currentColor" : "none"}
              />
              <span>{c.dislikes}</span>
            </Action>
            <Action onClick={() => onReply(c)} label="Reply">
              Reply
            </Action>
            {c.mine && (
              <Action onClick={() => onDelete(c.id)} label="Delete">
                Delete
              </Action>
            )}
          </div>
        </div>
      </div>

      {children}

      {!isReply && (
        <span className="absolute inset-x-0 bottom-0 h-px bg-current/15" />
      )}
    </motion.li>
  );
}

const fieldClass =
  "w-full border-0 border-b border-current/15 bg-transparent px-0 py-2.5 text-[14px] font-light outline-none transition-colors placeholder:text-(color:--muted) focus:border-current/50 md:text-[15px]";

export default function CommentSection({ slug }) {
  // v2 keys: older saved test comments (which were all the same) are ignored
  const commentsKey = `comments:v2:${slug}`;
  const votesKey = `votes:v2:${slug}`;

  const [comments, setComments] = useState(() =>
    normalize(read(commentsKey, getSeed(slug)))
  );
  const [votes, setVotes] = useState(() => read(votesKey, {}));
  const [name, setName] = useState(() => read(NAME_KEY, ""));
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null); // { id, name, isReply }

  const formRef = useRef(null);
  const textRef = useRef(null);

  // Save to this browser only (no backend)
  useEffect(() => {
    try {
      localStorage.setItem(commentsKey, JSON.stringify(comments));
    } catch {
      /* ignore */
    }
  }, [comments, commentsKey]);

  useEffect(() => {
    try {
      localStorage.setItem(votesKey, JSON.stringify(votes));
    } catch {
      /* ignore */
    }
  }, [votes, votesKey]);

  const canSubmit = name.trim() && text.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const next = {
      id: `c-${Date.now()}`,
      parentId: replyTo ? replyTo.id : null,
      to: replyTo?.isReply ? replyTo.name : undefined,
      name: name.trim(),
      text: text.trim(),
      time: Date.now(),
      likes: 0,
      dislikes: 0,
      mine: true, // lets the visitor delete their own comment
    };

    setComments((prev) => [...prev, next]);
    try {
      localStorage.setItem(NAME_KEY, JSON.stringify(name.trim()));
    } catch {
      /* ignore */
    }
    setText(""); // keep the name for the next comment
    setReplyTo(null);
  };

  // Like / dislike: tap again to undo, tap the other to switch
  const handleVote = (id, type) => {
    const prev = votes[id];
    setComments((list) =>
      list.map((c) => {
        if (c.id !== id) return c;
        let likes = c.likes;
        let dislikes = c.dislikes;
        if (prev === "like") likes -= 1;
        if (prev === "dislike") dislikes -= 1;
        if (prev !== type) {
          if (type === "like") likes += 1;
          else dislikes += 1;
        }
        return { ...c, likes, dislikes };
      })
    );
    setVotes((v) => {
      const next = { ...v };
      if (prev === type) delete next[id];
      else next[id] = type;
      return next;
    });
  };

  // Replies always attach to the top-level comment of the thread
  const handleReply = (c) => {
    setReplyTo({ id: c.parentId ?? c.id, name: c.name, isReply: !!c.parentId });
    requestAnimationFrame(() => {
      textRef.current?.focus({ preventScroll: true });
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: window.innerWidth < 1280 ? "center" : "nearest",
      });
    });
  };

  // Deleting a comment also removes its replies
  const handleDelete = (id) => {
    setComments((list) => list.filter((c) => c.id !== id && c.parentId !== id));
    if (replyTo?.id === id) setReplyTo(null);
  };

  const roots = comments
    .filter((c) => !c.parentId)
    .sort((a, b) => b.time - a.time); // newest first
  const repliesOf = (id) =>
    comments.filter((c) => c.parentId === id).sort((a, b) => a.time - b.time);

  return (
    <section>
      <motion.h2
        {...reveal(0.05)}
        className="mb-6 text-xs font-normal uppercase tracking-[0.25em] text-(color:--muted) md:mb-8 md:text-[0.9375rem]"
      >
        Comments ({comments.length})
      </motion.h2>

      {/* Form */}
      <motion.form
        {...reveal(0.1)}
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[13px] font-light text-(color:--soft) md:text-[14px]">
            {replyTo ? `Replying to ${replyTo.name}` : "Join the conversation"}
          </p>
          {replyTo && (
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="cursor-pointer text-[11px] font-light text-(color:--muted) transition-opacity hover:opacity-70 md:text-[12px]"
            >
              Cancel
            </button>
          )}
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={MAX_NAME}
          placeholder="Your name"
          aria-label="Your name"
          className={fieldClass}
        />

        <textarea
          ref={textRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX_TEXT}
          rows={3}
          placeholder={replyTo ? "Write a reply..." : "Share your thoughts..."}
          aria-label="Your comment"
          className={`${fieldClass} resize-none`}
        />

        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] font-light text-(color:--muted) md:text-[12px]">
            {text.length}/{MAX_TEXT}
          </span>
          <button
            type="submit"
            disabled={!canSubmit}
            className="cursor-pointer rounded-full border border-current/20 px-5 py-2 text-[12px] font-normal transition hover:border-current/50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-current/20 md:text-[13px]"
          >
            {replyTo ? "Post reply" : "Post comment"}
          </button>
        </div>

        <p className="text-[11px] font-light leading-[1.6] text-(color:--muted) md:text-[12px]">
          Placeholder only: comments are saved in this browser, not on a server.
        </p>
      </motion.form>

      <motion.div
        {...line(0.1)}
        className="mt-8 h-px origin-left bg-current/15"
      />

      {/* Comments */}
      {roots.length === 0 ? (
        <motion.p
          {...reveal(0.1)}
          className="py-6 text-[14px] font-light text-(color:--soft)"
        >
          No comments yet. Be the first to share your thoughts.
        </motion.p>
      ) : (
        <ul>
          <AnimatePresence>
            {roots.map((c, i) => {
              const replies = repliesOf(c.id);
              return (
                <Comment
                  key={c.id}
                  c={c}
                  delay={Math.min(i, 4) * 0.06}
                  myVote={votes[c.id]}
                  onVote={handleVote}
                  onReply={handleReply}
                  onDelete={handleDelete}
                >
                  <ul
                    className={
                      replies.length
                        ? "ml-4 mt-4 space-y-5 border-l border-current/10 pl-4"
                        : ""
                    }
                  >
                    <AnimatePresence>
                      {replies.map((r) => (
                        <Comment
                          key={r.id}
                          c={r}
                          isReply
                          myVote={votes[r.id]}
                          onVote={handleVote}
                          onReply={handleReply}
                          onDelete={handleDelete}
                        />
                      ))}
                    </AnimatePresence>
                  </ul>
                </Comment>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}