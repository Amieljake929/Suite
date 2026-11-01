import Hero from "../components/Hero";
import Block from "../components/Block";
import BlogPosts from "../components/BlogPosts";
import { useLanguage, useLocalized } from "../context/LanguageContext";
import {
  network,
  skills,
  builds,
  learnings,
  blogPosts,
  blogPostsLink,
} from "../data";

export default function Home() {
  const { t } = useLanguage();
  const posts = useLocalized(blogPosts);

  return (
    <>
      <div className="mt-[20vh]">
        <Hero />
      </div>
      <div className="mt-[20vh] grid grid-cols-[5fr_4fr] gap-x-6 gap-y-[14vh] md:grid-cols-[5fr_3fr]">
        <Block title={t("section.network")} items={network} />
        <Block title={t("section.skills")} items={skills} />
        <Block title={t("section.builds")} items={builds} />
        <Block title={t("section.learnings")} items={learnings} />
      </div>

      {/* Blog comes first, then Seminars */}
      <div className="mt-[20vh]">
        <BlogPosts items={posts} href={blogPostsLink} title={t("section.blog")} />
      </div>
    </>
  );
}