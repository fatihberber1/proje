import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Card } from 'antd';
import moment from 'moment';
import './Results.css';

const Results = () => {
  const location = useLocation();
  const { filters } = location.state || {};

  const fields = JSON.parse(localStorage.getItem('fields')) || [];
  const bookedSlots = JSON.parse(localStorage.getItem('bookedSlots')) || {};

  const formattedDate = filters?.date ? moment(filters.date).format('YYYY-MM-DD') : null;
  const time = filters?.time ? parseInt(filters.time, 10) : null;

  const filteredFields = fields.filter(field => {
    const slots = bookedSlots[formattedDate] || [];
    return (
      field.city === filters.city &&
      field.district === filters.district &&
      !slots.includes(time)
    );
  });

  const columns = [
    { title: 'Halı Saha Adı', dataIndex: 'name', key: 'name' },
    { title: 'Şehir', dataIndex: 'city', key: 'city' },
    { title: 'İlçe', dataIndex: 'district', key: 'district' },
    { title: 'Fiyat', dataIndex: 'price', key: 'price' },
  ];

  return (
    <div className="results-container">
      <Card title="Uygun Halı Sahalar" className="main-card">
        <Table dataSource={filteredFields} columns={columns} rowKey="id" />
      </Card>
    </div>
  );
};

export default Results;
