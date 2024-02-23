import SectionHeading from "./SectionHeading";
import TeamCard from "./TeamCard";

import react from "../resourses/photo/tech/react.jpg";
import django from "../resourses/photo/tech/django.jpg";
import post from "../resourses/photo/tech/post.jpg";
import azur from "../resourses/photo/tech/azur.jpg";

export default function Technology() {
  return (
    <div className="team">
      <div className="container">
        <SectionHeading shortheading={"Our"} mainHeading={"Technology"} />
        <div className="grid-4-team">
          <TeamCard
            image={react}
            name={"React JS"}
            position={"Front-End Technology"}
          />
          <TeamCard
            image={django}
            name={"Django Framework"}
            position={"Back-End Technology"}
          />
          <TeamCard
            image={post}
            name={"Postgres Database"}
            position={"Database Technology"}
          />
          <TeamCard
            image={azur}
            name={"Azur Cloud"}
            position={"Cloud Technology"}
          />
        </div>
      </div>
    </div>
  );
}
