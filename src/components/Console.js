import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'circleBlack', label: '●' },
  { value: 'circleWhite', label: '○' },
  { value: 'squareBlack', label: '■' },
  { value: 'squareWhite', label: '□' },
];

const handleOptionChange = (value) => {};

export const Console = () => {
  return (
    <>
      <Select options={options} onChange={handleOptionChange} />
    </>
  );
};
