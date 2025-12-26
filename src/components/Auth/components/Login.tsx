"use client";

interface LoginProps {
  onSwitchToRegister: () => void;
  onSubmit: (data: { userName: string; passwordHash: string }) => void;
}

export const Login = ({ onSwitchToRegister, onSubmit }: LoginProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userName = formData.get("userName") as string;
    const passwordHash = formData.get("passwordHash") as string;
    const data = { userName, passwordHash };
    onSubmit(data);
  };

  return (
    <div className="auth-form-container">
      <div className="card shadow-lg border-0">
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="card-title fw-bold mb-2">Đăng nhập</h2>
            <p className="text-muted">Chào mừng bạn trở lại!</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="login-username"
                className="form-label fw-semibold"
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="login-username"
                name="userName"
                placeholder="Nhập tên đăng nhập của bạn"
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="login-password"
                className="form-label fw-semibold"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="login-password"
                name="passwordHash"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember-me"
                />
                <label className="form-check-label" htmlFor="remember-me">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <a href="#" className="text-decoration-none text-primary">
                Quên mật khẩu?
              </a>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
              Đăng nhập
            </button>
          </form>

          <div className="text-center">
            <p className="text-muted mb-0">
              Chưa có tài khoản?{" "}
              <button
                type="button"
                className="btn btn-link text-primary p-0 text-decoration-none fw-semibold"
                onClick={onSwitchToRegister}
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
