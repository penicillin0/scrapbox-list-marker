import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const options = [
  { value: '●', label: '●' },
  { value: '○', label: '○' },
  { value: '■', label: '■' },
  { value: '□', label: '□' },
];

const initialState = [
  { value: '○', label: 'indent-1' },
  { value: '○', label: 'indent-2' },
  { value: '○', label: 'indent-3' },
  { value: '○', label: 'indent-4' },
];

export const Console = () => {
  const [indentOptions, setIndentOptions] = useState(initialState);

  useEffect(() => {
    const scrapboxIndentOption = localStorage.getItem('scrapboxIndentOption');

    if (!scrapboxIndentOption) {
      localStorage.setItem(
        'scrapboxIndentOption',
        JSON.stringify(initialState)
      );
      setIndentOptions(initialState);
    } else {
      setIndentOptions(JSON.parse(scrapboxIndentOption));
    }
  }, []);

  const handleOnChange = (newValue, metaAction) => {
    const value = newValue.value;
    const label = metaAction.name;

    const newIndentOptions = indentOptions.map((option) => {
      if (option.label === label) {
        return { value, label };
      }
      return option;
    });

    setIndentOptions(newIndentOptions);
    localStorage.setItem(
      'scrapboxIndentOption',
      JSON.stringify(newIndentOptions)
    );
  };

  return (
    <>
      {indentOptions
        ? indentOptions.map((indentOption) => {
            return (
              <Select
                value={{
                  value: indentOption.value,
                  label: indentOption.value,
                }}
                onChange={handleOnChange}
                key={indentOption.label}
                name={indentOption.label}
                options={options}
              ></Select>
            );
          })
        : 'keyがないよ'}
    </>
  );
};
