import SubPage from "../components/SubPage";
import Block from "../components/Block";
import { builds } from "../data";

export default function Projects() {
  return (
    <SubPage intro="A few things I've designed and built.">
      <Block title="Builds" items={builds} />
    </SubPage>
  );
}