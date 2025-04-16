import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ userType }) => {
  const getMenuItems = () => {
    const commonItems = [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' }
    ];
    switch(userType) {
      case 'teacher':
        return [
          ...commonItems,
          { path: '/courses', label: 'Derslerim', icon: '📚' },
          { path: '/students', label: 'Öğrencilerim', icon: '👨‍🎓' },
          { path: '/tests', label: 'Testler', icon: '📝' },
          { path: '/reports', label: 'Raporlar', icon: '📊' }
        ];
      case 'student':
        return [
          ...commonItems,
          { path: '/my-courses', label: 'Derslerim', icon: '📚' },
          { path: '/my-tests', label: 'Testlerim', icon: '📝' },
          { path: '/my-profile', label: 'Profilim', icon: '👤' }
        ];
      case 'parent':
        return [
          ...commonItems,
          { path: '/my-children', label: 'Çocuklarım', icon: '👪' },
          { path: '/progress', label: 'İlerleme Durumu', icon: '📈' }
        ];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <Menu
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
      defaultSelectedKeys={[window.location.pathname]}
      items={menuItems.map(item => ({
        key: item.path,
        icon: <span>{item.icon}</span>,
        label: <NavLink to={item.path}>{item.label}</NavLink>
      }))}
    />
  );
};

export default Sidebar;