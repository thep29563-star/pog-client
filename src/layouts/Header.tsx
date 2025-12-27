"use client";

import "./Header.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLayout } from "../contexts/LayoutContext";
import { showToast } from "../store/toastSlice";
import { useDispatch } from "react-redux";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { userDto,logout } = useLayout(); // Destructure để lấy userDto từ context
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [user, setUser] = useState<typeof userDto | null>(null);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleScrollTo = (
    sectionId: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    closeMenu();

    // Nếu đang ở trang khác, chuyển về trang chủ trước
    if (pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }

    // Nếu đang ở trang chủ, scroll đến section
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 70; // Chiều cao của header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleAccountClick = () => {
    closeMenu();
    const storedUser = localStorage.getItem('userDto');
    if (storedUser) {
      setIsAccountMenuOpen(!isAccountMenuOpen);
      setIsLoggedIn(true);

    } else {
      // Redirect to login if not logged in
      router.push('/auth');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAccountMenuOpen(false);
    logout();
    dispatch(showToast({
      message: "Đăng xuất thành công",
      severity: "success",
      time: 3000,
    }));
    router.push('/auth');
  };

  const handleGoToProfile = () => {
    setIsAccountMenuOpen(false);
    router.push('/user');
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          {/* Logo */}
          <Link href="/" className="navbar-brand" onClick={closeMenu}>
            <Image
              src="/images/logo.png"
              alt="POG Logo"
              width={120}
              height={40}
              priority
              className="logo-image"
              style={{ background: "transparent" }}
            />
          </Link>

          <button
            className={`navbar-toggler ${isMenuOpen ? "active" : ""}`}
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a
                  href="#home"
                  className="nav-link"
                  onClick={(e) => handleScrollTo("home", e)}
                >
                  Trang chủ
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#about"
                  className="nav-link"
                  onClick={(e) => handleScrollTo("about", e)}
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#products"
                  className="nav-link"
                  onClick={(e) => handleScrollTo("products", e)}
                >
                  Người dùng
                </a>
              </li>
            </ul>
              {/* Account Button with Dropdown */}
              <div className="account-container" ref={accountMenuRef}>
                <button
                  className="account-btn"
                  onClick={handleAccountClick}
                  aria-label="Tài khoản"
                >
                  <Image
                    src="/images/account.svg"
                    alt="Account"
                    width={30}
                    height={30}
                    className="account-icon"
                  />
                </button>

                {isLoggedIn && isAccountMenuOpen && (
                  <div className="account-dropdown">
                    {/* User Info Section */}
                    <div className="dropdown-user-info">
                      <div className="user-avatar-small">
                        {userDto?.userName?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="user-details">
                        <span className="user-name-text" title={userDto?.userName || ''}>
                          {userDto?.userName && userDto.userName.length > 15 
                            ? userDto.userName.substring(0, 15) + '...' 
                            : userDto?.userName || 'User'}
                        </span>
                        <span className="user-email-text" title={userDto?.email || ''}>
                          {userDto?.email && userDto.email.length > 20 
                            ? userDto.email.substring(0, 20) + '...' 
                            : userDto?.email || ''}
                        </span>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button 
                      className="dropdown-item"
                      onClick={handleGoToProfile}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span>Thông tin người dùng</span>
                    </button>
                    <div className="dropdown-divider"></div>
                    <button 
                      className="dropdown-item logout-item"
                      onClick={handleLogout}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
