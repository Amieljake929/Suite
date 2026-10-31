import SubPage from "../components/SubPage";
import ProjectGrid from "../components/ProjectGrid";
import { projects } from "../projectsData";

export default function Projects() {
  return (
    <SubPage intro="A few things I've designed and built.">
      <ProjectGrid items={projects} />
    </SubPage>
  );
}