import React from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setUserInfo }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Success:', values);

    // Kullanıcıları LocalStorage'dan al
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Kullanıcıyı kontrol et
    const user = users.find(user => user.username === values.username && user.password === values.password);

    if (user) {
      setUserInfo(user);
      navigate('/home'); // Ana sayfaya yönlendirme
    } else {
      alert('Kullanıcı adı veya şifre yanlış.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container">
      <Row justify="center" align="middle" className="login-row">
        <Col>
          <Card bordered={false} className="login-card">
            <h2>Giriş Yap</h2>
            <Form
              form={form}
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="login-form"
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

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Giriş Yap
                </Button>
              </Form.Item>
            </Form>
            <Button type="link" onClick={() => navigate('/register')} block>
              Kayıt Ol
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
