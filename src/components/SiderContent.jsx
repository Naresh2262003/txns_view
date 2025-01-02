
import React, { useState, useEffect } from 'react';
import { DashboardOutlined, FileSearchOutlined, BarChartOutlined, WarningOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

// Custom component for Sider Content
const SiderContent = ({ collapsed, setCollapsed }) => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  const items = [
    { key: '1', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '2', icon: <FileSearchOutlined />, label: 'Audit' },
    { key: '3', icon: <BarChartOutlined />, label: 'Reports' },
    { key: '4', icon: <WarningOutlined />, label: 'Limits' },
  ];

  const onClickHandler = (item) => {
    setActiveItem(item.key);
    if (collapsed) {
      setCollapsed(false); // Only toggle collapse if necessary
    }
    navigate(`/txns_view/${item.label.toLowerCase()}`);
  };

  const handleClickOutside = (event) => {
    const target = event.target.closest('.sider-content');
    if (!target) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="sider-content"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a, #2c3e50)', // Deep gradient for dark theme
        padding: '10px',
        height: '100vh',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)', // Add subtle shadow for depth
        transition: 'all 0.3s ease-in-out',
      }}
      onClick={() => setCollapsed(false)}
    >
      <ul
        style={{
          listStyleType: 'none',
          padding: 0,
          margin: 0,
          width: '100%',
        }}
      >
        {items.map((item) => (
          <li
            key={item.key}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: '10px 15px',
              cursor: 'pointer',
              borderRadius: '10px', // Rounded corners for a smoother look
              background: activeItem === item.key
                  ? 'linear-gradient(135deg, #00bcd4, #03a9f4)' // Bright active gradient
                  : 'transparent',
              color: activeItem === item.key ? '#fff' : '#BDC3C7', // Lighter text color
              transition: 'all 0.3s ease, box-shadow 0.2s ease',
              boxShadow: activeItem === item.key ? '0 4px 15px rgba(0, 188, 212, 0.5)' : 'none', // Subtle shadow for active items
            }}
            onClick={() => onClickHandler(item)}
            // Add hover effect only if the item is not active
            onMouseEnter={(e) => {
              if (activeItem !== item.key) {
                e.currentTarget.style.background = '#34495e'; // Darker hover effect
              }
            }}
            onMouseLeave={(e) => {
              if (activeItem !== item.key) {
                e.currentTarget.style.background = 'transparent'; // Remove background if not active
              }
            }}
          >
            <span
              style={{
                fontSize: '24px',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: activeItem === item.key ? '#fff' : '#BDC3C7',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {item.icon}
            </span>
            <span
              style={{
                marginLeft: collapsed ? '0px' : '10px',
                opacity: collapsed ? 0 : 1,
                visibility: collapsed ? 'hidden' : 'visible',
                whiteSpace: 'nowrap',
                color: activeItem === item.key ? '#fff' : '#BDC3C7',
                fontWeight: activeItem === item.key ? 'bold' : 'normal',
                transition: 'opacity 0.3s ease, margin-left 0.3s ease, visibility 0.3s ease',
              }}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiderContent;
