import SubPage from "../components/SubPage";
import GearSection from "../components/GearSection";
import { gearSections } from "../gearData";

export default function Gear() {
  return (
    <SubPage intro="The tools I use to design and build.">
      {gearSections.map(({ title, items }) => (
        <GearSection key={title} title={title} items={items} />
      ))}
    </SubPage>
  );
}