import SubPage from "../components/SubPage";
import BlogList from "../components/BlogList";
import { posts } from "../blogsData";

export default function Blogs() {
  return (
    <SubPage intro="Notes on design, code and what I'm learning.">
      <BlogList title="Writing" items={posts} />
    </SubPage>
  );
}