import Link from "next/link";
import "../../Home/Home.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const CTASection = () => {
  return (
     <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Sẵn sàng bắt đầu?</h2>
            <p className="cta-description">
              Đăng ký ngay để trải nghiệm các tính năng tuyệt vời
            </p>
            <Link href="/login" className="btn-cta">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </section>
  )
};