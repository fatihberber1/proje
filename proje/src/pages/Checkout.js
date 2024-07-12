import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount } = location.state || { totalAmount: 0 };

  const handleSubmit = (values) => {
    console.log('Ödeme Bilgileri:', values);
    message.success('Siparişiniz mail ile gönderildi!');
    navigate('/home');
  };

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Sadece harflere izin ver
    form.setFieldsValue({ cardName: value });
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // Sadece rakamlara izin ver
    if (value.length <= 16) {
      value = value.replace(/(.{4})/g, '$1 ').trim(); // Her 4 haneden sonra ' ' ekle
    }
    form.setFieldsValue({ cardNumber: value });
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // Sadece rakamlara izin ver
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4); // İlk iki haneden sonra '/' ekle
    }
    form.setFieldsValue({ expiryDate: value });
  };

  return (
    <div className="checkout-container">
      <Card title="Ödeme Yap" className="main-card">
        <Form form={form} onFinish={handleSubmit} className="checkout-form" layout="vertical">
          <Form.Item
            name="cardName"
            label="Kart Sahibi Adı Soyadı"
            rules={[{ required: true, message: 'Lütfen kart sahibi adı soyadı giriniz!' }]}
          >
            <Input placeholder="Kart Sahibi Adı Soyadı" onChange={handleNameChange} />
          </Form.Item>
          <Form.Item
            name="cardNumber"
            label="Kart Numarası"
            rules={[
              { required: true, message: 'Lütfen kart numarasını giriniz!' },
              { len: 19, message: 'Kart numarası 16 haneli olmalıdır!' }, // 19 karakter dahil '-' işaretleri
            ]}
          >
            <Input placeholder="Kart Numarası" maxLength={19} onChange={handleCardNumberChange} />
          </Form.Item>
          <Form.Item
            name="expiryDate"
            label="Son Kullanma Tarihi"
            rules={[{ required: true, message: 'Lütfen son kullanma tarihini giriniz!' }]}
          >
            <Input placeholder="AA/YY" maxLength={5} onChange={handleExpiryDateChange} />
          </Form.Item>
          <Form.Item
            name="cvv"
            label="CVV"
            rules={[
              { required: true, message: 'Lütfen CVV numarasını giriniz!' },
              { len: 3, message: 'CVV numarası 3 haneli olmalıdır!' },
            ]}
          >
            <Input placeholder="CVV" maxLength={3} />
          </Form.Item>
          <div className="total-amount">
            <h3>Toplam Tutar: {totalAmount.toFixed(2)} TL</h3>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Ödeme Yap
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Checkout;
