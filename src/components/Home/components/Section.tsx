import Link from "next/link";
import "../../Home/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const Section = () => {
  return (
     <section className="hero-section" id="home">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Chào mừng đến với <span className="gradient-text">POG</span>
            </h1>
            <p className="hero-description">
              Nền tảng hiện đại và tiên tiến cho mọi nhu cầu của bạn
            </p>
            <div className="hero-buttons">
              <Link href="/products" className="btn-primary">
                Khám phá sản phẩm
              </Link>
              <Link href="/about" className="btn-secondary">
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>
      </section>
  )
};