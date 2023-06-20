import React, { useState } from 'react';

const Dropdown = (props) => {
  const options = props.data;
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    // console.log('value: ' + value);
    // console.log('option: ' + value);
    props.func(value);
  };

  return (
    <div>
        <select 
        value={selectedOption} 
        onChange={handleOptionChange} 
        className="py-2 px-4 rounded-md focus:outline-none w-full mt-4 border-2 border-gray-600">
            {options.map((option, index) => (
            <option key={index} value={option}>
                {option}
            </option>
            ))}
        </select>
        {/* <p>Selected option: {selectedOption}</p> */}
    </div>
  );
};

export default Dropdown;
