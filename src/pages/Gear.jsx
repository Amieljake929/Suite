import SubPage from "../components/SubPage";
import GearSection from "../components/GearSection";
import { gearSections } from "../gearData";
import { useLanguage } from "../context/LanguageContext";

export default function Gear() {
  const { t } = useLanguage();

  return (
    <SubPage intro={t("gear.intro")}>
      {/* index key so sections don't remount when the language changes */}
      {gearSections.map(({ title, items }, i) => (
        <GearSection key={i} title={title} items={items} />
      ))}
    </SubPage>
  );
}