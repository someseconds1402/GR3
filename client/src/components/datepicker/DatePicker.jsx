import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDatePicker = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.func(date ? date.toString() : '2022-07-18');
  };

  return (
    <div className='rounded-md focus:outline-none w-full mt-4 border-2 border-gray-600'>
        <DatePicker 
        selected={selectedDate} 
        onChange={handleDateChange} 
        dateFormat="dd/MM/yyyy"
        placeholderText="Chọn thời gian"
        className='py-2 px-4 '
        />
    </div>
  );
};

export default MyDatePicker;
