import SubPage from "../components/SubPage";
import Block from "../components/Block";
import { gear, software } from "../data";

export default function Gear() {
  return (
    <SubPage intro="The tools I use to design and build.">
      <Block title="Hardware" items={gear} />
      <Block title="Software" items={software} />
    </SubPage>
  );
}