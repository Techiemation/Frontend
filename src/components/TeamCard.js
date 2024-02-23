export default function TeamCard({ name, position, isLead, image }) {
  return (
    <div className="team-card">
      <img src={image} alt="" className="team-card-img" />
      <div className="team-card-text">
        <h4 className="name">{name}</h4>
        <h5 className="position">{position}</h5>
      </div>
    </div>
  );
}
