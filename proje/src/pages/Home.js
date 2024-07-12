// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Button, DatePicker, TimePicker, Select, Row, Col, Form, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './Home.css';

const { Option } = Select;

const Home = () => {
  const [form] = Form.useForm();
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCities = localStorage.getItem('cities');
    if (storedCities) {
      const cities = JSON.parse(storedCities);
      form.setFieldsValue({ cities });
    }
  }, [form]);

  const handleCityChange = (value) => {
    const storedCities = localStorage.getItem('cities');
    const cities = storedCities ? JSON.parse(storedCities) : {};
    setDistricts(cities[value] || []);
    form.setFieldsValue({ district: undefined });
  };

  const handleSubmit = (values) => {
    console.log('Form Values:', values);
    values.date = values.date ? moment(values.date).format('YYYY-MM-DD') : null;
    values.time = values.time ? moment(values.time).format('HH:mm') : null;
    navigate('/fields', { state: { filters: values } });
  };

  return (
    <div className="home-container">
      <Card title="Halı Saha Ara" className="main-card">
        <Form form={form} onFinish={handleSubmit} className="booking-form">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="date" label="Tarih" rules={[{ required: true, message: 'Lütfen tarih seçiniz!' }]}>
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="time" label="Saat" rules={[{ required: true, message: 'Lütfen saat seçiniz!' }]}>
                <TimePicker format="HH:mm" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="city" label="Şehir" rules={[{ required: true, message: 'Lütfen şehir seçiniz!' }]}>
                <Select placeholder="Şehir seçiniz" onChange={handleCityChange}>
                  {Object.keys(JSON.parse(localStorage.getItem('cities') || '{}')).map((city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="district" label="İlçe" rules={[{ required: true, message: 'Lütfen ilçe seçiniz!' }]}>
                <Select placeholder="İlçe seçiniz" disabled={!districts.length}>
                  {districts.map((district) => (
                    <Option key={district} value={district}>
                      {district}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="duration" label="Süre" rules={[{ required: true, message: 'Lütfen süre seçiniz!' }]}>
                <Select placeholder="Süre seçiniz">
                  <Option value="1">1 Saat</Option>
                  <Option value="2">2 Saat</Option>
                  <Option value="3">3 Saat</Option>
                  <Option value="4">1 Gün</Option>
                  <Option value="5">2 Gün</Option>
                  <Option value="6">3 Gün</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Uygun Zamanı Filtrele
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Home;
