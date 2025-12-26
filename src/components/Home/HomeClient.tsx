"use client";

import "./Home.css";
import Link from "next/link";
import { useEffect, useRef } from "react";
import CardUser, { UserData } from "./components/CardUser";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
export const HomeClient = ({userData}:{userData:UserData[]}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Xử lý scroll đến section khi có hash trong URL
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1); // Bỏ dấu #
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 70;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, []);
  const safeUserData = Array.isArray(userData) ? userData : [];
  const hasData = safeUserData.length > 0;
  const scrollRight = () => {
    const el = sliderRef.current;
    if (!el) return;
  
    const maxScroll = el.scrollWidth - el.clientWidth;
  
    if (el.scrollLeft >= maxScroll - 5) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: 320, behavior: "smooth" });
    }
  };
  
  const scrollLeft = () => {
    const el = sliderRef.current;
    if (!el) return;
  
    const maxScroll = el.scrollWidth - el.clientWidth;
  
    if (el.scrollLeft <= 5) {
      el.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      el.scrollBy({ left: -320, behavior: "smooth" });
    }
  };
  
  return (
    <div className="home-container">
      {/* Hero Section */}
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

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Về chúng tôi</h2>
            <p className="section-subtitle">
              Chúng tôi cam kết mang đến những giải pháp tốt nhất
            </p>
          </div>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">
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
              </div>
              <h3>Đổi mới</h3>
              <p>Luôn đi đầu trong công nghệ và đổi mới sáng tạo</p>
            </div>
            <div className="about-card">
              <div className="about-icon">
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
              </div>
              <h3>Đội ngũ chuyên nghiệp</h3>
              <p>Đội ngũ giàu kinh nghiệm và tận tâm với khách hàng</p>
            </div>
            <div className="about-card">
              <div className="about-icon">
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
              </div>
              <h3>Chất lượng</h3>
              <p>Đảm bảo chất lượng cao nhất trong mọi sản phẩm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Sản phẩm của chúng tôi</h2>
            <p className="section-subtitle">
              Khám phá các giải pháp phù hợp với nhu cầu của bạn
            </p>
          </div>
          <div className="products-grid">
          {userData && userData.length === 0 ? (
              <p>Không có người dùng để hiển thị.</p>
            ) : (
              // Kiểm tra: Nếu là mảng thì mới map, còn không thì trả về mảng rỗng []
            <div className="slider-wrapper" style={{ position: 'relative' }}>
            {/* Nút TRÁI */}
            {hasData && (
              <button 
                onClick={scrollLeft}
                className="nav-btn prev-btn"
                aria-label="Scroll Left"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Khung chứa danh sách (Gắn ref vào đây) */}
            {/* Quan trọng: Phải đổi class để nó nằm ngang (flex) thay vì grid */}
            <div 
              ref={sliderRef} 
              className="products-slider"
            >
              {!hasData ? (
                <p>Không có dữ liệu.</p>
              ) : (
                safeUserData.map((user) => (
                  // Bọc trong div để giữ kích thước cố định cho mỗi item
                  <div key={user.id} className="slider-item">
                    <CardUser key={user.id} userData={user} />
                  </div>
                ))
              )}
            </div>

            {/* Nút PHẢI */}
            {hasData && (
              <button 
                onClick={scrollRight}
                className="nav-btn next-btn"
                aria-label="Scroll Right"
              >
                <ChevronRight size={24} />
              </button>
            )}
            
          </div>
)}
    </div>
          </div>
      </section>

      {/* CTA Section */}
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
    </div>
  );
};
