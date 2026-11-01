import SubPage from "../components/SubPage";
import Block from "../components/Block";
import InfoRows from "../components/InfoRows";
import InfoCards from "../components/InfoCards";
import { useLanguage } from "../context/LanguageContext";
import {
  aboutBio,
  aboutDetails,
  internship,
  academicProjects,
  education,
  certifications,
  network,
  skills,
  software,
  learnings,
} from "../data";

export default function About() {
  const { t } = useLanguage();

  return (
    <SubPage intro={t("nav.about")} subtitle={aboutBio}>
      <InfoRows title={t("about.glance")} items={aboutDetails} />
      <InfoCards title={t("about.internship")} items={internship} cols={2} />
      <InfoCards title={t("about.academic")} items={academicProjects} cols={3} />
      <InfoRows title={t("about.education")} items={education} bottomLines={false} />
      <InfoRows title={t("about.certifications")} items={certifications} />

      <Block title={t("section.skills")} items={skills} />
      <Block title={t("about.tools")} items={software} />
      <Block title={t("section.learnings")} items={learnings} />
      <Block title={t("section.network")} items={network} />
    </SubPage>
  );
}