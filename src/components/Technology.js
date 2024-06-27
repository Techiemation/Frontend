import SectionHeading from "./SectionHeading";
import TeamCard from "./TeamCard";

import react from "../resourses/photo/tech/react.jpg";
import fire from "../resourses/photo/tech/fire.png";
import flask from "../resourses/photo/tech/flask.png";
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
            image={flask}
            name={"Flask Framework"}
            position={"Back-End Technology"}
          />
          <TeamCard
            image={fire}
            name={"Firebase Database"}
            position={"Database Technology"}
          />
          <TeamCard
            image={azur}
            name={"Azure Cloud"}
            position={"Cloud Technology"}
          />
        </div>
      </div>
    </div>
  );
}
