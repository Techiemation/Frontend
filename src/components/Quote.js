import SectionHeading from "./SectionHeading";

export default function Quote() {
  return (
    <div className="quote">
      <div className="container">
        <SectionHeading shortheading={"Our"} mainHeading={"Belief"} />
        <div className="quote-container">
          <p className="quote-para">
            "Without education it is complete darkness and with education it is
            light"
          </p>
          <h3 className="quote-by">Quaide-e-Azam</h3>
        </div>
      </div>
    </div>
  );
}
