import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Toast from "../../components/Toast/toast";
import "./register.css";

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Vui lòng nhập họ và tên";
    }

    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    if (!formData.terms) {
      newErrors.terms = "Vui lòng đồng ý với điều khoản dịch vụ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || loading) return;

    setLoading(true);

    try {
      await register(formData.fullname, formData.email, formData.password);
      setToast({ type: "success", message: "Đăng ký thành công!" });
    } catch (error) {
      setToast({ type: "error", message: "Có lỗi xảy ra, vui lòng thử lại" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-container">
        <div className="auth-card glass-card">
          <div className="auth-header">
            <div className="logo">
              <i className="fas fa-music"></i>
              <h1>VibeMusic</h1>
            </div>
            <h2>Tạo tài khoản mới</h2>
            <p>Tham gia cộng đồng âm nhạc của chúng tôi</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullname">Họ và tên</label>
              <div
                className={`input-container ${errors.fullname ? "error" : ""}`}
              >
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Nhập họ và tên"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.fullname && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.fullname}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className={`input-container ${errors.email ? "error" : ""}`}>
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div
                className={`input-container ${errors.password ? "error" : ""}`}
              >
                <i className="fas fa-lock"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Tạo mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
              {errors.password && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.password}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <div
                className={`input-container ${
                  errors.confirmPassword ? "error" : ""
                }`}
              >
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.confirmPassword && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                />
                <span className="checkmark"></span>
                Tôi đồng ý với{" "}
                <a href="#" className="terms-link">
                  Điều khoản dịch vụ
                </a>
              </label>
              {errors.terms && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.terms}
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`auth-btn primary ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              <span>Tạo tài khoản</span>
              <i className="fas fa-arrow-right"></i>
            </button>

            <div className="divider">
              <span>hoặc</span>
            </div>

            <button type="button" className="auth-btn secondary">
              <i className="fab fa-google"></i>
              <span>Đăng ký với Google</span>
            </button>

            <div className="auth-footer">
              <p>
                Đã có tài khoản?{" "}
                <Link to="/login" className="auth-link">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Register;
