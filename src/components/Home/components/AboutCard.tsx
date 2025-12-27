type AboutCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};
export default function AboutCard({
  icon,
  title,
  description,
}: AboutCardProps) {
  return (
    <div className="about-card">
      <div className="about-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
