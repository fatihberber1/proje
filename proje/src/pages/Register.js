import React from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const { Option } = Select;

const Register = ({ setUserInfo }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log('Form Values:', values);

    // Mevcut kullanıcıları al
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Yeni kullanıcıyı ekle
    users.push(values);

    // Kullanıcıları LocalStorage'a kaydet
    localStorage.setItem('users', JSON.stringify(users));

    setUserInfo(values);
    navigate('/'); // Login sayfasına yönlendirme
  };

  const handlePhoneKeyPress = (e) => {
    const regex = /^[0-9\b]+$/; // Sadece rakamlara izin verir
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="register-container">
      <Row justify="center" align="middle" className="register-row">
        <Col>
          <Card bordered={false} className="register-card">
            <h2>Kayıt Ol</h2>
            <Form
              form={form}
              name="register"
              onFinish={handleSubmit}
              className="register-form"
              layout="vertical"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Lütfen kullanıcı adınızı giriniz!' }]}
              >
                <Input placeholder="Kullanıcı Adı" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Lütfen şifrenizi giriniz!' }]}
              >
                <Input.Password placeholder="Şifre" />
              </Form.Item>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Lütfen isminizi giriniz!' }]}
              >
                <Input placeholder="İsim" />
              </Form.Item>
              <Form.Item
                name="surname"
                rules={[{ required: true, message: 'Lütfen soyisminizi giriniz!' }]}
              >
                <Input placeholder="Soyisim" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Lütfen eposta adresinizi giriniz!' },
                  { type: 'email', message: 'Lütfen geçerli bir eposta adresi giriniz!' }
                ]}
              >
                <Input placeholder="Eposta" />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: 'Lütfen telefon numaranızı giriniz!' },
                  { len: 11, message: 'Telefon numarası 11 rakam olmalıdır!' },
                ]}
              >
                <Input placeholder="Telefon Numarası" onKeyPress={handlePhoneKeyPress} maxLength={11} />
              </Form.Item>
              <Form.Item
                name="userType"
                rules={[{ required: true, message: 'Lütfen kullanıcı türünü seçiniz!' }]}
              >
                <Select placeholder="Kullanıcı Türünü Seçiniz">
                  <Option value="user">Kullanıcı</Option>
                  <Option value="owner">Tesis Sahibi</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Kayıt Ol
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
