import React from 'react';
import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const { Content, Sider } = Layout;

const MainLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar onLogout={handleLogout} />
      <Layout>
        <Sider width={220} style={{ background: '#fff' }}>
          <Sidebar userType={currentUser?.userType} />
        </Sider>
        <Content style={{ margin: '24px 16px 0', background: '#fff', padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;