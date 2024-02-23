import SectionHeading from "./SectionHeading";
import ActionBtn from "./ActionBtn";
import contactImage from "../resourses/illustration/12982910_5124556.jpg";

import { FiSend } from "react-icons/fi";

export default function Contact() {
  return (
    <div className="contact">
      <div className="container">
        <SectionHeading shortheading={"contact"} mainHeading={"Form"} />
        <div className="contact-container">
          <div className="contact-2-grid">
            <img src={contactImage} alt="" className="contact-image" />
            <form action="">
              <div className="field-container">
                <div className="field">
                  <label htmlFor="" className="field-label">
                    Name
                  </label>
                  <input type="text" name="" id="" className="input-field" />
                </div>
                <div className="field">
                  <label htmlFor="" className="field-label">
                    Last Name
                  </label>
                  <input type="text" name="" id="" className="input-field" />
                </div>
              </div>
              <label htmlFor="" className="field-label">
                Last Name
              </label>
              <input type="text" name="" id="" className="input-field" />
              <label htmlFor="" className="field-label">
                Message
              </label>
              <textarea name="" id="" cols="30" rows="10"></textarea>
              <ActionBtn icon={""} btn={"btn-white"}>
                Send <FiSend />
              </ActionBtn>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
