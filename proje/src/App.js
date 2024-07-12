import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Fields from './pages/Fields';
import AddField from './pages/AddField';
import Results from './pages/Results';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { Layout, Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, PlusOutlined, LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './App.css';

const { Header, Content, Footer } = Layout;

const App = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch('/cities.json')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('cities', JSON.stringify(data));

        const sampleFields = [
          { id: 1, name: 'Mutlu Halı Saha', city: 'Istanbul', district: 'Kadıköy', price: '1500 TL' },
          { id: 2, name: 'Öncü Halı Saha', city: 'Ankara', district: 'Çankaya', price: '1800 TL' },
          { id: 3, name: '5 Pas Halı Saha', city: 'Izmir', district: 'Konak', price: '1900 TL' },
          { id: 4, name: 'Derici Halı Saha', city: 'Bursa', district: 'Osmangazi', price: '2200 TL' },
          { id: 5, name: 'Hüseyin Aksu Spor Tesisleri', city: 'Adana', district: 'Seyhan', price: '2000 TL' },
          { id: 6, name: 'Deport Athletics', city: 'Gaziantep', district: 'Şahinbey', price: '3000 TL' },
          { id: 7, name: 'Oksijen Halı Saha', city: 'Konya', district: 'Selçuklu', price: '2500 TL' },
          { id: 8, name: 'Gümüş Halı Saha Tesisleri', city: 'Antalya', district: 'Muratpaşa', price: '2300 TL' },
          { id: 9, name: 'Özcanlar Halı Saha', city: 'Kayseri', district: 'Melikgazi', price: '1200 TL' },
          { id: 10, name: 'Sanayi Halı Saha', city: 'Mersin', district: 'Mezitli', price: '1250 TL' }
        ];

        localStorage.setItem('fields', JSON.stringify(sampleFields));
      })
      .catch(error => console.error('Error fetching cities:', error));
  }, []);

  const HeaderButtons = () => {
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === '/' || location.pathname === '/register') {
      return null;
    }

    const handleHomeClick = () => {
      if (location.pathname !== '/home') {
        navigate('/home');
      }
    };

    const handleFieldsClick = () => {
      if (location.pathname !== '/fields') {
        navigate('/fields');
      }
    };

    const handleAddFieldClick = () => {
      if (userInfo && userInfo.userType === 'owner') {
        if (location.pathname !== '/add-field') {
          navigate('/add-field');
        }
      } else {
        alert('Bu sayfaya erişim izniniz yok.');
      }
    };

    const handleCartClick = () => {
      navigate('/cart');
    };

    const handleLogout = () => {
      setUserInfo(null);
      navigate('/');
    };

    return (
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />} onClick={handleHomeClick}>
          Giriş Ekranı
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />} onClick={handleFieldsClick}>
          Halı Sahalar
        </Menu.Item>
        <Menu.Item key="3" icon={<PlusOutlined />} onClick={handleAddFieldClick}>
          Halı Saha Ekleme
        </Menu.Item>
        <Menu.Item key="4" icon={<ShoppingCartOutlined />} onClick={handleCartClick}>
          Sepet
        </Menu.Item>
        <Menu.Item key="5" icon={<LogoutOutlined />} onClick={handleLogout} style={{ marginLeft: 'auto' }}>
          Çıkış Yap
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <HeaderButtons />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<Login setUserInfo={setUserInfo} userInfo={userInfo} />} />
              <Route path="/register" element={<Register setUserInfo={setUserInfo} />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/home" element={<Home />} />
              <Route path="/fields" element={<Fields />} />
              <Route path="/add-field" element={userInfo?.userType === 'owner' ? <AddField /> : <Login />} />
              <Route path="/results" element={<Results />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Halı Saha Otomasyonu ©2024</Footer>
      </Layout>
    </Router>
  );
};

export default App;
