import Summarization from "../resourses/img/200.jpg";
import Translation from "../resourses/img/100.jpg";
import Scraping from "../resourses/img/300.jpg";

import SectionHeading from "./SectionHeading";
import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <div className="feture">
      <div className="container">
        <SectionHeading shortheading={"Our"} mainHeading={"Feature"} />
        <div className="feature-3-grid">
          <FeatureCard
            featureImage={Summarization}
            featureHeading={"Summarization"}
            featurePara={
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid enim eaque debitis molestias! Provident facilis culpa eos temporibus ullam. Quisquam exercitationem vitae accusantium deleniti est aperiam ratione esse culpa distinctio?"
            }
          />
          <FeatureCard
            featureImage={Translation}
            featureHeading={"Translation"}
            featurePara={
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid enim eaque debitis molestias! Provident facilis culpa eos temporibus ullam. Quisquam exercitationem vitae accusantium deleniti est aperiam ratione esse culpa distinctio?"
            }
          />
          <FeatureCard
            featureImage={Scraping}
            featureHeading={"Scraping"}
            featurePara={
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid enim eaque debitis molestias! Provident facilis culpa eos temporibus ullam. Quisquam exercitationem vitae accusantium deleniti est aperiam ratione esse culpa distinctio?"
            }
          />
        </div>
      </div>
    </div>
  );
}
