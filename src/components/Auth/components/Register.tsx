"use client";

interface RegisterProps {
  onSwitchToLogin: () => void;
  onSubmit: (data: {
    userName: string;
    email: string;
    passwordHash: string;
  }) => void;
}

export const Register = ({ onSwitchToLogin, onSubmit }: RegisterProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userName = formData.get("userName") as string;
    const email = formData.get("email") as string;
    const passwordHash = formData.get("passwordHash") as string;
    const confirmPasswordHash = formData.get("confirmPasswordHash") as string;

    if (passwordHash !== confirmPasswordHash) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    const data = { userName, email, passwordHash };
    onSubmit(data);
  };

  return (
    <div className="auth-form-container">
      <div className="card shadow-lg border-0">
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="card-title fw-bold mb-2">Đăng ký</h2>
            <p className="text-muted">Tạo tài khoản mới của bạn</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="register-username"
                className="form-label fw-semibold"
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="register-username"
                name="userName"
                placeholder="Nhập tên đăng nhập của bạn"
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="register-email"
                className="form-label fw-semibold"
              >
                Email
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="register-email"
                name="email"
                placeholder="Nhập email của bạn"
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="register-password"
                className="form-label fw-semibold"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="register-password"
                name="passwordHash"
                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                minLength={6}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="register-confirm-password"
                className="form-label fw-semibold"
              >
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="register-confirm-password"
                name="confirmPasswordHash"
                placeholder="Nhập lại mật khẩu"
                minLength={6}
                required
              />
            </div>

            <div className="mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agree-terms"
                  required
                />
                <label className="form-check-label" htmlFor="agree-terms">
                  Tôi đồng ý với{" "}
                  <a href="#" className="text-primary text-decoration-none">
                    Điều khoản sử dụng
                  </a>{" "}
                  và{" "}
                  <a href="#" className="text-primary text-decoration-none">
                    Chính sách bảo mật
                  </a>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
              Đăng ký
            </button>
          </form>

          <div className="text-center">
            <p className="text-muted mb-0">
              Đã có tài khoản?{" "}
              <button
                type="button"
                className="btn btn-link text-primary p-0 text-decoration-none fw-semibold"
                onClick={onSwitchToLogin}
              >
                Đăng nhập ngay
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
