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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
              sint temporibus debitis obcaecati ex dignissimos tempore atque
              explicabo ullam eaque eius ab corrupti sequi exercitationem
              voluptatum praesentium suscipit excepturi blanditiis?
            </p>
            <ActionBtn icon={""} btn={"btn-white"}>
              Try For Free
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
