import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Card from "../components/Card";
import { Form, Input, Button, Select, Alert } from "antd";

const { Option } = Select;

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "student",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (changedValues) => {
    setFormData((prev) => ({ ...prev, ...changedValues }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }
    try {
      setError("");
      setLoading(true);
      // Alanları backend ile birebir uyumlu ve boş olmayan şekilde gönder
      const payload = {
        firstName: formData.firstName?.trim(),
        lastName: formData.lastName?.trim(),
        email: formData.email?.trim(),
        password: formData.password,
        userType: String(formData.userType),
      };
      // Eksik alan kontrolü
      if (!payload.firstName || !payload.lastName || !payload.email || !payload.password || !payload.userType) {
        setError("Tüm alanları doldurunuz.");
        setLoading(false);
        return;
      }
      console.log("Gönderilen veri:", payload);
      await register(payload);
      alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
      navigate("/login");
    } catch (err) {
      if (err && err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err && err.message) {
        setError(err.message);
      } else {
        setError("Kayıt işlemi başarısız. Lütfen tekrar deneyin.");
      }
      console.error("Register error:", err?.response || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-bg">
      <div className="register-container">
        <div className="register-logo">
          <img
            src={require("../MdgLogo.svg").default}
            alt="Logo"
            className="register-logo-img"
          />
        </div>
        <Card className="auth-card modern-register-card">
          <h2
            className="auth-title"
            style={{
              textAlign: "center",
              fontWeight: 700,
              fontSize: 28,
              marginBottom: 8,
            }}
          >
            Yeni Hesap Oluştur
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#6366f1",
              marginBottom: 24,
              fontWeight: 500,
              fontSize: 16,
              letterSpacing: 0.5,
            }}
          >
            Modern Dijital Gelişim Platformu
          </p>
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            onValuesChange={(_, allValues) => handleChange(allValues)}
            initialValues={formData}
            className="auth-form"
          >
            <div style={{ display: "flex", gap: 16, marginBottom: 5 }}>
              <Form.Item
                label="Ad"
                name="firstName"
                rules={[{ required: true, message: "Ad zorunlu" }]}
                style={{ flex: 1, marginBottom: 0 }}
              >
                <Input size="large" placeholder="Adınız" />
              </Form.Item>
              <Form.Item
                label="Soyad"
                name="lastName"
                rules={[{ required: true, message: "Soyad zorunlu" }]}
                style={{ flex: 1, marginBottom: 0 }}
              >
                <Input size="large" placeholder="Soyadınız" />
              </Form.Item>
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 5 }}>
              <Form.Item
                label="E-posta"
                name="email"
                rules={[{ required: true, message: "E-posta zorunlu" }]}
                style={{ flex: 1, marginBottom: 0 }}
              >
                <Input
                  type="email"
                  size="large"
                  placeholder="E-posta adresiniz"
                />
              </Form.Item>
              <Form.Item
                label="Kullanıcı Tipi"
                name="userType"
                rules={[{ required: true, message: "Kullanıcı tipi zorunlu" }]}
                style={{ flex: 1, marginBottom: 0 }}
              >
                <Select
                  size="large"
                  value={formData.userType}
                  onChange={(value) => handleChange({ userType: value })}
                >
                  <Option value="student">Öğrenci</Option>
                  <Option value="teacher">Öğretmen</Option>
                  <Option value="parent">Veli</Option>
                </Select>
              </Form.Item>
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 5 }}>
              <Form.Item
                label="Şifre"
                name="password"
                rules={[{ required: true, message: "Şifre zorunlu" }]}
                style={{ flex: 1, marginBottom: 0 }}
              >
                <Input.Password
                  minLength={6}
                  size="large"
                  placeholder="Şifreniz"
                />
              </Form.Item>
              <Form.Item
                label="Şifre Tekrar"
                name="confirmPassword"
                rules={[{ required: true, message: "Şifre tekrar zorunlu" }]}
                style={{ flex: 1, marginBottom: 0 }}
              >
                <Input.Password
                  minLength={6}
                  size="large"
                  placeholder="Şifrenizi tekrar girin"
                />
              </Form.Item>
            </div>
            <Form.Item style={{ marginTop: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                style={{ borderRadius: 8, fontWeight: 600 }}
              >
                Üye Ol
              </Button>
            </Form.Item>
          </Form>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <p>
              Zaten hesabınız var mı? <Link to="/login">Giriş Yap</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
