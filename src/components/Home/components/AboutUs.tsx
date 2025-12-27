import "../../Home/Home.css";
import AboutCard from "./AboutCard";

// Data cho các card About
const aboutData = [
  {
    id: 1,
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Đổi mới",
    description: "Luôn đi đầu trong công nghệ và đổi mới sáng tạo",
  },
  {
    id: 2,
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Đội ngũ chuyên nghiệp",
    description: "Đội ngũ giàu kinh nghiệm và tận tâm với khách hàng",
  },
  {
    id: 3,
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Chất lượng",
    description: "Đảm bảo chất lượng cao nhất trong mọi sản phẩm",
  },
];

export const AboutUs = () => {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Về chúng tôi</h2>
          <p className="section-subtitle">
            Chúng tôi cam kết mang đến những giải pháp tốt nhất
          </p>
        </div>
        <div className="about-grid">
          {aboutData.map((item) => (
            <AboutCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
