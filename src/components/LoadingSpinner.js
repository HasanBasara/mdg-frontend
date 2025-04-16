import React from 'react';
import { Spin } from 'antd';

const LoadingSpinner = ({ size = 'middle', message = 'Yükleniyor...' }) => {
  return (
    <div style={{ textAlign: 'center', padding: '24px' }}>
      <Spin size={size} tip={message} />
    </div>
  );
};

export default LoadingSpinner;