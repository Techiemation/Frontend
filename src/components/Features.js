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
              "Our summarization technology condenses lengthy texts into concise summaries, saving you time and effort. With advanced algorithms, we extract key insights, ensuring you grasp the essence of any document swiftly and accurately."
            }
          />
          <FeatureCard
            featureImage={Translation}
            featureHeading={"Translation"}
            featurePara={
              "Break language barriers effortlessly with our seamless translation feature. Powered by state-of-the-art algorithms, our platform translates content into multiple languages, including Urdu and Sindhi, ensuring clear and accurate communication across linguistic boundaries."
            }
          />
          <FeatureCard
            featureImage={Scraping}
            featureHeading={"Scraping"}
            featurePara={
              "Unlock a wealth of online knowledge with our comprehensive scraping capabilities. Our intelligent tools meticulously gather relevant information from diverse sources, ensuring you access the latest content for your learning needs effortlessly."
            }
          />
        </div>
      </div>
    </div>
  );
}
