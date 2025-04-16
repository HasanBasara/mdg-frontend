import React from 'react';
import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const { Header } = Layout;

const Navbar = ({ onLogout }) => {
  const { currentUser } = useAuth();

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '0 24px' }}>
      <div>
        <Link to="/">
          <h2 style={{ margin: 0 }}>Eğitim Platformu</h2>
        </Link>
      </div>
      <div>
        {currentUser ? (
          <>
            <span style={{ marginRight: 16 }}>
              Kullanıcı Tipi: {currentUser.userType === 'teacher' ? 'Öğretmen' : currentUser.userType === 'student' ? 'Öğrenci' : 'Veli'}
            </span>
            <Button type="primary" danger onClick={onLogout}>
              Çıkış Yap
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button type="default" style={{ marginRight: 8 }}>Giriş Yap</Button>
            </Link>
            <Link to="/register">
              <Button type="primary">Üye Ol</Button>
            </Link>
          </>
        )}
      </div>
    </Header>
  );
};

export default Navbar;