import SectionHeading from "./SectionHeading";

export default function Quote() {
  return (
    <div className="quote">
      <div className="container">
        <SectionHeading shortheading={"Our"} mainHeading={"Belief"} />
        <div className="quote-container">
          <p className="quote-para">
            "Without Education it is Complete Darkness and with Education it is
            Light"
          </p>
          <h3 className="quote-by">Quaid-e-Azam</h3>
        </div>
      </div>
    </div>
  );
}
