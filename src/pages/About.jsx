import SubPage from "../components/SubPage";
import Block from "../components/Block";
import InfoRows from "../components/InfoRows";
import InfoCards from "../components/InfoCards";
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
  return (
    <SubPage intro="About" subtitle={aboutBio}>
      <InfoRows title="At a glance" items={aboutDetails} />
      <InfoCards title="Internship" items={internship} cols={2} />
      <InfoCards title="Academic Projects" items={academicProjects} cols={3} />
      <InfoRows title="Education" items={education} bottomLines={false} />
      <InfoRows title="Certifications" items={certifications} />

      <Block title="Skills & Focus" items={skills} />
      <Block title="Tools" items={software} />
      <Block title="Learnings" items={learnings} />
      <Block title="Network" items={network} />
    </SubPage>
  );
}