import SubPage from "../components/SubPage";
import Block from "../components/Block";
import { blogs } from "../data";

export default function Blogs() {
  return (
    <SubPage intro="Notes on design, code and what I'm learning.">
      <Block title="Writing" items={blogs} />
    </SubPage>
  );
}