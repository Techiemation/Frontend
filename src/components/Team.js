import SectionHeading from "./SectionHeading";

import yaseen from "../resourses/photo/new/yaseen.jpg";
import arsal from "../resourses/photo/new/arsel.jpg";
import basit from "../resourses/photo/new/basit.jpg";
import sami from "../resourses/photo/new/sami.jpg";

import TeamCard from "./TeamCard";

export default function Team() {
  return (
    <div className="team">
      <div className="container">
        <SectionHeading shortheading={"Our"} mainHeading={"Team"} />
        <div className="grid-4-team">
          <TeamCard name={"Sami"} position={"Team-Lead"} image={sami} />
          <TeamCard
            name={"Yaseen Amin"}
            position={"Team-Memeber"}
            image={yaseen}
          />
          <TeamCard
            name={"Basit Ali"}
            position={"Team-Memeber"}
            image={basit}
          />
          <TeamCard name={"Arsel"} position={"Team-Memeber"} image={arsal} />
        </div>
      </div>
    </div>
  );
}
