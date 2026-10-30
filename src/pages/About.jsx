import SubPage from "../components/SubPage";
import Block from "../components/Block";
import { builds } from "../data";

export default function Projects() {
  return (
    <SubPage intro="About">
      <Block title="Builds" items={builds} />
    </SubPage>
  );
}