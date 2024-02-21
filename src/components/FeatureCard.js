export default function FeatureCard({
  featureImage,
  featureHeading,
  featurePara,
}) {
  return (
    <div className="feature-card">
      <img src={featureImage} alt="" className="feature-img" />
      <div className="text-section">
        <h5 className="feature-card-heading">{featureHeading}</h5>
        <p className="feature-para">{featurePara}</p>
      </div>
    </div>
  );
}
