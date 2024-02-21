import SectionHeading from "./SectionHeading";

export default function Plan() {
  return (
    <div className="plan">
      <div className="container">
        <SectionHeading shortheading={"our"} mainHeading={"Plan"} />
        <div className="plan-2-grid">
          <div className="plan-card">1</div>
          <div className="plan-card">2</div>
        </div>
      </div>
    </div>
  );
}
