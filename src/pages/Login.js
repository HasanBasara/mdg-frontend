import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import { Form, Input, Button, Alert } from 'antd';

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
    <Card className="auth-card">
      <h2 className="auth-title">Giriş Yap</h2>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      <Form layout="vertical" onFinish={handleSubmit} className="auth-form">
        <Form.Item label="E-posta" name="email" rules={[{ required: true, message: 'E-posta zorunlu' }]}> 
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="Şifre" name="password" rules={[{ required: true, message: 'Şifre zorunlu' }]}> 
          <Input.Password value={password} onChange={e => setPassword.e.target.value} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <p>
          Hesabınız yok mu? <Link to="/register">Üye Ol</Link>
        </p>
        <p>
          <Link to="/forgot-password">Şifremi Unuttum</Link>
        </p>
      </div>
    </Card>
  );
};

export default Login;