import Hero from "../components/Hero";
import Block from "../components/Block";
import BlogPosts from "../components/BlogPosts";
import Seminars from "../components/Seminars";
import {
  network,
  skills,
  builds,
  learnings,
  blogPosts,
  blogPostsLink,
  seminars,
  seminarsLink,
} from "../data";

export default function Home() {
  return (
    <>
      <div className="mt-[20vh]">
        <Hero />
      </div>
      <div className="mt-[20vh] grid grid-cols-[5fr_4fr] gap-x-6 gap-y-[14vh] md:grid-cols-[5fr_3fr]">
        <Block title="Network" items={network} />
        <Block title="Skills & Focus" items={skills} />
        <Block title="Builds" items={builds} />
        <Block title="Learnings" items={learnings} />
      </div>

      {/* Blog comes first, then Seminars */}
      <div className="mt-[20vh]">
        <BlogPosts items={blogPosts} href={blogPostsLink} />
      </div>
    </>
  );
}