"use client";

import "./Header.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [userDto, setUserDto] = useState<any>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('userDto');
      
      if (storedData) {
        setUserDto(storedData); 
      }
    }
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {

    setShowUserMenu(false);
    localStorage.removeItem("userDto");
    router.push("/");
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
                  Sản phẩm
                </a>
              </li>
            </ul>

              {/* <div className="user-menu-container">
                <div
                  className="user-avatar"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="avatar-circle">
                    {getInitials(userDto.name, userDto.userName)}
                  </div>
                  <span className="user-name">
                    {userDto.name || userDto.userName || "User"}``
                  </span>
                </div>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <Link
                      href="/user"
                      className="dropdown-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        closeMenu();
                      }}
                    >
                      Trang cá nhân
                    </Link>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : ( */}
              <Link
                href="/auth"
                className="btn btn-outline-primary"
                onClick={closeMenu}
              >
                Đăng nhập
              </Link>
            
            {/* )} */}
          </div>
        </div>
      </nav>
    </header>
  );
};
