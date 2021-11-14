import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'circleBlack', label: '●' },
  { value: 'circleWhite', label: '○' },
  { value: 'squareBlack', label: '■' },
  { value: 'squareWhite', label: '□' },
];

const initialState = [
  { value: '', label: 'indent-1' },
  { value: '', label: 'indent-2' },
  { value: '', label: 'indent-3' },
  { value: '', label: 'indent-4' },
];

export const Console = () => {
  const [indentOptions, setIndentOptions] = useState(initialState);

  useEffect(() => {
    localStorage.getItem('scrapboxIndentOption', (result) => {
      if (!result.scrapboxIndentOption) {
        localStorage.setItem('scrapboxIndentOption', indentOptions);
      }
      setIndentOptions(result.scrapboxIndentOption || initialState);
    });
  }, []);

  return (
    <>
      {indentOptions.map((indentOption) => {
        return (
          <Select
            key={indentOption.label}
            name={indentOption.label}
            options={options}
          ></Select>
        );
      })}
    </>
  );
};
