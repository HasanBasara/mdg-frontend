import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import { Form, Input, Button, Select, Alert } from 'antd';

const { Option } = Select;

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (changedValues) => {
    setFormData(prev => ({ ...prev, ...changedValues }));
  };
  
  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }
    try {
      setError('');
      setLoading(true);
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        userType: formData.userType
      });
      alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Kayıt işlemi başarısız. Lütfen tekrar deneyin.');
      }
      console.error('Register error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="auth-card register-card">
      <h2 className="auth-title">Yeni Hesap Oluştur</h2>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      <Form layout="vertical" onFinish={handleSubmit} onValuesChange={(_, allValues) => handleChange(allValues)} initialValues={formData} className="auth-form">
        <Form.Item label="Ad" name="firstName" rules={[{ required: true, message: 'Ad zorunlu' }]}> 
          <Input />
        </Form.Item>
        <Form.Item label="Soyad" name="lastName" rules={[{ required: true, message: 'Soyad zorunlu' }]}> 
          <Input />
        </Form.Item>
        <Form.Item label="E-posta" name="email" rules={[{ required: true, message: 'E-posta zorunlu' }]}> 
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Şifre" name="password" rules={[{ required: true, message: 'Şifre zorunlu' }]}> 
          <Input.Password minLength={6} />
        </Form.Item>
        <Form.Item label="Şifre Tekrar" name="confirmPassword" rules={[{ required: true, message: 'Şifre tekrar zorunlu' }]}> 
          <Input.Password minLength={6} />
        </Form.Item>
        <Form.Item label="Kullanıcı Tipi" name="userType" rules={[{ required: true, message: 'Kullanıcı tipi zorunlu' }]}> 
          <Select>
            <Option value="student">Öğrenci</Option>
            <Option value="teacher">Öğretmen</Option>
            <Option value="parent">Veli</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Üye Ol
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <p>
          Zaten hesabınız var mı? <Link to="/login">Giriş Yap</Link>
        </p>
      </div>
    </Card>
  );
};

export default Register;