import SubPage from "../components/SubPage";
import ProjectGrid from "../components/ProjectGrid";
import { projects } from "../projectsData";
import { useLanguage } from "../context/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <SubPage intro={t("projects.intro")}>
      <ProjectGrid title={t("projects.selected")} items={projects} />
    </SubPage>
  );
}