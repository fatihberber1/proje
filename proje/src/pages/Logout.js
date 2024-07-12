import React from 'react';
import { Button } from 'antd';
import './Logout.css';

const Logout = () => {
  const handleLogout = () => {
    console.log('User logged out');
    // Burada çıkış işlemi gerçekleştirilecek.
  };

  return (
    <div className="logout-container">
      <h2>Çıkış Yap</h2>
      <Button type="primary" onClick={handleLogout}>
        Çıkış Yap
      </Button>
    </div>
  );
};

export default Logout;
