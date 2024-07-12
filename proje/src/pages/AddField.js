import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import './AddField.css';

const { Option } = Select;

const AddField = () => {
  const [form] = Form.useForm();
  const [cities, setCities] = useState({});
  const [districts, setDistricts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCities = localStorage.getItem('cities');
    if (storedCities) {
      setCities(JSON.parse(storedCities));
    }
  }, []);

  const handleCityChange = (value) => {
    setDistricts(cities[value] || []);
    form.setFieldsValue({ district: undefined });
  };

  const handleSubmit = (values) => {
    console.log('Form Values:', values);

    // Yeni halı saha verisini localStorage'a ekleyin
    const storedFields = localStorage.getItem('fields');
    const fields = storedFields ? JSON.parse(storedFields) : [];
    fields.push(values);
    localStorage.setItem('fields', JSON.stringify(fields));

    // Formu sıfırlayın
    form.resetFields();

    // Halı Sahalar sayfasına yönlendirin
    navigate('/fields');
  };

  return (
    <div className="add-field-container">
      <Card title="Halı Saha Ekle" className="main-card">
        <Form form={form} onFinish={handleSubmit} className="add-field-form">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Halı Saha Adı" rules={[{ required: true, message: 'Lütfen halı saha adını giriniz!' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="price" label="Fiyat" rules={[{ required: true, message: 'Lütfen fiyatı giriniz!' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="city" label="Şehir" rules={[{ required: true, message: 'Lütfen şehir seçiniz!' }]}>
                <Select placeholder="Şehir seçiniz" onChange={handleCityChange}>
                  {Object.keys(cities).map((city) => (
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
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Halı Saha Ekle
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddField;
