"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import "./Auth.css";
import { loginApi, registerApi } from "@/src/infra/authApi";

export const AuthClinet = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };
  const handleLoginSubmit = async (data: {
    userName: string;
    passwordHash: string;
  }) => {
    try {
      const response = await loginApi(data);
      if (response) {
        router.push("/");
      } 
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  const handleRegisterSubmit = async (data: {
    userName: string;
    email: string;
    passwordHash: string;
  }) => {
    try {
      const response = await registerApi(data);
      if (response.success) {
        setIsLogin(true);
      } else {
        console.error("Đăng ký thất bại:", response.message);
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    }
  };
  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            {isLogin ? (
              <Login
                onSwitchToRegister={switchToRegister}
                onSubmit={handleLoginSubmit}
              />
            ) : (
              <Register
                onSwitchToLogin={switchToLogin}
                onSubmit={handleRegisterSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
