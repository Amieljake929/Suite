import SubPage from "../components/SubPage";
import BlogList from "../components/BlogList";
import { posts } from "../blogsData";
import { useLanguage } from "../context/LanguageContext";

export default function Blogs() {
  const { t } = useLanguage();

  return (
    <SubPage intro={t("blogs.intro")}>
      <BlogList title={t("blogs.writing")} items={posts} />
    </SubPage>
  );
}