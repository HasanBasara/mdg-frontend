import React from 'react';
import { Card as AntdCard } from 'antd';

const Card = ({ title, children, className = '', ...rest }) => {
  return (
    <AntdCard title={title} className={className} {...rest}>
      {children}
    </AntdCard>
  );
};

export default Card;