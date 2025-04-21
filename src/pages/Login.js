import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import { Form, Input, Button, Alert } from 'antd';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Giriş yapılamadı. Email ve şifrenizi kontrol edin.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-logo">
          <img src={require('../MdgLogo.svg').default} alt="Logo" style={{ width: 200, height: 200, marginBottom: 0, filter: 'drop-shadow(0 4px 16px #6366f155)' }} />
        </div>
        <Card className="auth-card modern-login-card">
          <h2 className="auth-title" style={{ textAlign: 'center', fontWeight: 700, fontSize: 30, marginBottom: 8, letterSpacing: 1 }}>Giriş Yap</h2>
          <p style={{ textAlign: 'center', color: '#6366f1', marginBottom: 28, fontWeight: 500, fontSize: 16, letterSpacing: 0.5 }}>Modern Dijital Gelişim Platformu</p>
          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
          <Form layout="vertical" onFinish={handleSubmit} className="auth-form">
            <Form.Item label="E-posta" name="email" rules={[{ required: true, message: 'E-posta zorunlu' }]}> 
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} size="large" placeholder="E-posta adresiniz" />
            </Form.Item>
            <Form.Item label="Şifre" name="password" rules={[{ required: true, message: 'Şifre zorunlu' }]}> 
              <Input.Password value={password} onChange={e => setPassword(e.target.value)} size="large" placeholder="Şifreniz" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block size="large" style={{ borderRadius: 8, fontWeight: 600, fontSize: 18, marginTop: 8, boxShadow: '0 2px 12px #6366f133' }}>
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <p style={{ marginBottom: 8 }}>
              Hesabınız yok mu? <Link to="/register">Üye Ol</Link>
            </p>
            <p>
              <Link to="/forgot-password">Şifremi Unuttum</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;