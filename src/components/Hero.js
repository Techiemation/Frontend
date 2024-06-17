import illustration from "../resourses/illustration/7119041_3394878.jpg";
import ActionBtn from "./ActionBtn";

import { FaArrowTurnDown } from "react-icons/fa6";

export default function Hero() {
  return (
    <div className="hero">
      <div className="container">
        <div className="hero-2-grid">
          <div className="text">
            <h1 className="hero-heading">
              Boost Your Learning Uncover Powerfull Strategies for Success
            </h1>
            <p className="para">
              Bridging Language Gaps for Enhanced Computer Science Education.
              Access tech content in your preferred language, breaking down
              barriers to learning. Summarizing vast online resources for
              effortless comprehension. Empowering global learners with
              personalized, localized educational experiences.
            </p>
            <ActionBtn icon={""} btn={"btn-white"} link="login-signup">
              Try Now
              <FaArrowTurnDown />
            </ActionBtn>
          </div>
          <div className="hero-img-container">
            <img src={illustration} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
