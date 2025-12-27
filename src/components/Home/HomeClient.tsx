"use client";

import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import CardUser, { UserData } from "./components/CardUser";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

// Custom Arrow Components
const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button className="slick-arrow slick-prev custom-arrow" onClick={onClick} aria-label="Previous">
    <ChevronLeft size={24} />
  </button>
);

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button className="slick-arrow slick-next custom-arrow" onClick={onClick} aria-label="Next">
    <ChevronRight size={24} />
  </button>
);

export const HomeClient = ({userData}:{userData:UserData[]}) => {
  const [isDragging, setIsDragging] = useState(false);

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

  // Slider settings
  const sliderSettings = {
    infinite: true,           // Vuốt liên tục vòng tròn
    speed: 500,               // Tốc độ chuyển slide (ms)
    slidesToShow: 4,          // Hiển thị 4 sản phẩm cùng lúc
    slidesToScroll: 1,        // Vuốt 1 sản phẩm mỗi lần
    autoplay: true,           // Tự động chuyển slide
    autoplaySpeed: 3000,      // Thời gian giữa các lần auto chuyển
    arrows: true,             // Hiển thị nút mũi tên
    dots: false,              // Ẩn dots navigation
    swipe: true,              // Cho phép vuốt touch
    swipeToSlide: true,       // Vuốt trực tiếp đến slide
    touchMove: true,          // Cho phép di chuyển touch
    draggable: true,          // Cho phép kéo trên desktop
    pauseOnHover: true,       // Dừng autoplay khi hover
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: () => setIsDragging(true),
    afterChange: () => setIsDragging(false),
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,    // Tắt autoplay trên mobile
          arrows: false,      // Ẩn arrows trên mobile (dùng swipe)
        }
      }
    ]
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
          {/* Section Header với title và link Xem tất cả */}
          <div className="selling-section-header">
            <h2 className="selling-section-title">Sản Phẩm Bán Chạy</h2>
            <Link href="/danh-sach-san-pham" className="view-all-link">
              <span className="view-all-text">Xem tất cả</span>
              <svg 
                className="arrow-icon" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Products Slider với react-slick */}
          <div className="slider-container">
            {!hasData ? (
              <p className="no-data-text">Không có dữ liệu.</p>
            ) : (
              <Slider {...sliderSettings}>
                {safeUserData.map((user) => (
                  <div key={user.id} className="slider-item">
                    <CardUser 
                      key={user.id} 
                      userData={user} 
                      isDragging={isDragging}
                    />
                  </div>
                ))}
              </Slider>
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
