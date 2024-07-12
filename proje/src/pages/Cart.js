import React, { useState, useEffect } from 'react';
import { Card, Table, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const items = JSON.parse(storedCart);
      setCartItems(items);

      const total = items.reduce((sum, item) => {
        const duration = item.time.split(', ').length;
        return sum + (parseFloat(item.field.price.replace(' TL', '')) * duration);
      }, 0);

      setTotalAmount(total);
    }
  }, []);

  const handleDelete = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    const total = updatedCart.reduce((sum, item) => {
      const duration = item.time.split(', ').length;
      return sum + (parseFloat(item.field.price.replace(' TL', '')) * duration);
    }, 0);

    setTotalAmount(total);

    message.success('Randevu sepetten silindi.');
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { totalAmount } });
  };

  const columns = [
    {
      title: 'Halı Saha Adı',
      dataIndex: ['field', 'name'],
      key: 'name',
    },
    {
      title: 'Tarih',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Saat',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Ücret',
      dataIndex: ['field', 'price'],
      key: 'price',
    },
    {
      title: 'İşlem',
      key: 'action',
      render: (_, record, index) => (
        <Button type="link" onClick={() => handleDelete(index)}>
          Sil
        </Button>
      ),
    },
  ];

  return (
    <div className="cart-container">
      <Card title="Sepetim" className="main-card">
        <Table dataSource={cartItems} columns={columns} rowKey="date" pagination={false} />
        <div className="total-amount">
          <h3>Toplam Tutar: {totalAmount.toFixed(2)} TL</h3>
        </div>
        <Button type="primary" onClick={handleCheckout} block>
          Ödeme Yap
        </Button>
      </Card>
    </div>
  );
};

export default Cart;
