import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const AuthLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ maxWidth: 400, margin: 'auto', padding: '48px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1>LMS Eğitim Platformu</h1>
        </div>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AuthLayout;
