"use client";

import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import CardUser, { UserData } from "./components/CardUser";
import { Section } from "./components/Section";
import { AboutUs } from "./components/AboutUs";
import { CTASection } from "./components/CTASection";
import UserInfiniteScroll from "./components/UserInfiniteScroll";

export const HomeClient = ({ userData }: { userData: UserData[] }) => {
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
  const sliderSettings = useMemo(
    () => ({
      infinite: true,
      speed: 500,
      slidesToShow: 4, // Mặc định Desktop
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
      dots: false,
      swipe: true,
      swipeToSlide: true,
      touchMove: true,
      draggable: true,
      pauseOnHover: true,
      beforeChange: () => setIsDragging(true),
      afterChange: () => setIsDragging(false),
      responsive: [
        // Chú ý tên đúng là 'responsive'
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 992, // Tablet
          settings: {
            slidesToShow: 2, // Nên để 2 ảnh cho dễ nhìn
          },
        },
        {
          breakpoint: 600, // Mobile
          settings: {
            slidesToShow: 1, // Bắt buộc 1 ảnh trên mobile
            slidesToScroll: 1,
            arrows: false, // Ẩn nút trên mobile
            autoplay: false,
          },
        },
      ],
    }),
    []
  );

  return (
    <div className="home-container">
      {/* Hero Section */}
      <Section />
      <AboutUs />

      {/* Products Section */}
      <section className="products-section" id="products">
        <div className="container">
          {/* Section Header với title và link Xem tất cả */}
          <div className="selling-section-header">
            <h2 className="selling-section-title">Người dùng</h2>
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
                    <CardUser userData={user} isDragging={isDragging} />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </section>
      <section className="products-section" id="user-list">
        <div className="container">
          <div className="selling-section-header">
            <h2 className="selling-section-title">Danh sách người dùng</h2>
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
          <UserInfiniteScroll />
        </div>
      </section>
      {/* CTA Section */}
      <CTASection />
    </div>
  );
};
