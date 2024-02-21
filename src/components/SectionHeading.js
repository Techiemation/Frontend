export default function SectionHeading({ shortheading, mainHeading }) {
  return (
    <div className="section-heading">
      <h4 className="small-heading">{shortheading}</h4>
      <h1 className="big-heading">{mainHeading}</h1>
    </div>
  );
}
