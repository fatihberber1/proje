import React, { useEffect, useState, useCallback } from 'react';
import { Table, Card, Modal, DatePicker, Button } from 'antd'; // 'message' kaldırıldı
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import './Fields.css';

const Fields = () => {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [visible, setVisible] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedSlots, setBookedSlots] = useState({});

  const location = useLocation();
  const navigate = useNavigate(); // 'navigate' tanımlandı
  const { filters } = location.state || {};

  useEffect(() => {
    // LocalStorage'dan halı saha kayıtlarını al
    const storedFields = localStorage.getItem('fields');
    if (storedFields) {
      setFields(JSON.parse(storedFields));
    }
  }, []);

  const generateRandomBookings = useCallback(() => {
    if (!selectedDate) return;

    const date = moment(selectedDate).format('YYYY-MM-DD');
    const today = moment().startOf('day');
    const diffDays = moment(date).diff(today, 'days');
    const slots = [];
    let numBookings;

    // Gün ilerledikçe randevu sayısı azalır (sadece ilk 7 gün için)
    if (diffDays === 0) {
      numBookings = 16;
    } else if (diffDays === 1) {
      numBookings = 10;
    } else if (diffDays === 2) {
      numBookings = 8;
    } else if (diffDays === 3) {
      numBookings = 6;
    } else if (diffDays === 4) {
      numBookings = 4;
    } else if (diffDays === 5) {
      numBookings = 2;
    } else if (diffDays === 6) {
      numBookings = 1;
    } else {
      numBookings = 0;
    }

    while (slots.length < numBookings) {
      const slot = Math.floor(Math.random() * 24);
      if (!slots.includes(slot)) {
        slots.push(slot);
      }
    }

    setBookedSlots((prev) => ({ ...prev, [date]: slots }));
  }, [selectedDate]);

  useEffect(() => {
    // Rastgele randevuları oluştur
    generateRandomBookings();
  }, [selectedDate, generateRandomBookings]);

  const showModal = (field) => {
    setSelectedField(field);
    generateTimeSlots();
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setSelectedField(null);
    setSelectedSlots([]);
    setSelectedDate(null);
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      slots.push(`${i}:00 - ${i + 1}:00`);
    }
    setTimeSlots(slots);
  };

  const handleSlotClick = (slotIndex) => {
    if (selectedSlots.includes(slotIndex)) {
      setSelectedSlots(selectedSlots.filter(index => index !== slotIndex));
    } else if (selectedSlots.length === 0) {
      setSelectedSlots([slotIndex]);
    } else {
      const newSlots = [];
      const start = Math.min(selectedSlots[0], slotIndex);
      const end = Math.max(selectedSlots[0], slotIndex);
      for (let i = start; i <= end; i++) {
        newSlots.push(i);
      }
      setSelectedSlots(newSlots);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    const cartItem = {
      field: selectedField,
      date: selectedDate.format('YYYY-MM-DD'),
      time: selectedSlots.map(index => timeSlots[index]).join(', ')
    };

    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));

    handleCancel();
    navigate('/cart');
  };

  const filteredFields = fields.filter(field => {
    if (!filters) return true;

    const fieldBookings = bookedSlots[moment(filters.date).format('YYYY-MM-DD')] || [];
    const isFieldAvailable = !fieldBookings.includes(parseInt(filters.time));

    return (
      field.city === filters.city &&
      field.district === filters.district &&
      isFieldAvailable
    );
  });

  const columns = [
    { 
      title: 'Halı Saha Adı', 
      dataIndex: 'name', 
      key: 'name', 
      render: (text, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          {text}
        </Button>
      )
    },
    { title: 'Şehir', dataIndex: 'city', key: 'city' },
    { title: 'İlçe', dataIndex: 'district', key: 'district' },
    { title: 'Fiyat', dataIndex: 'price', key: 'price' },
  ];

  return (
    <div className="fields-container">
      <Card title="Halı Sahalar" className="main-card">
        <Table dataSource={filteredFields} columns={columns} rowKey="id" />
        <Modal
          title={selectedField ? `${selectedField.name} - Randevu Al` : 'Randevu Al'}
          visible={visible}
          onCancel={handleCancel}
          onOk={handleSubmit}
        >
          <div className="booking-modal-content">
            <DatePicker 
              placeholder="Gün Seçiniz" 
              style={{ width: '100%', marginBottom: '20px' }} 
              onChange={handleDateChange}
            />
            <div className="time-slots">
              {timeSlots.map((slot, index) => (
                <Button
                  key={index}
                  className={`time-slot-button ${selectedSlots.includes(index) ? 'selected' : ''} ${bookedSlots[selectedDate && moment(selectedDate).format('YYYY-MM-DD')]?.includes(index) ? 'booked' : ''}`}
                  onClick={() => handleSlotClick(index)}
                  disabled={bookedSlots[selectedDate && moment(selectedDate).format('YYYY-MM-DD')]?.includes(index)}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        </Modal>
      </Card>
    </div>
  );
};

export default Fields;
