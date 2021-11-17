import React, { useEffect, useState } from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';
import styled from 'styled-components';

const options = [
  { value: '●', label: '●' },
  { value: '○', label: '○' },
  { value: '■', label: '■' },
  { value: '□', label: '□' },
];

const initialState = [
  { value: '●', label: 'indent-1' },
  { value: '●', label: 'indent-2' },
  { value: '●', label: 'indent-3' },
  { value: '●', label: 'indent-4' },
];

type Props = Record<string, never>;

export const Console: React.FC<Props> = () => {
  const [indentOptions, setIndentOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >(initialState);

  useEffect(() => {
    chrome.storage.local.get('scrapboxIndentOption', (result) => {
      const scrapboxIndentOption = result.scrapboxIndentOption;

      if (!scrapboxIndentOption) {
        chrome.storage.local.set({ scrapboxIndentOption: initialState });
        setIndentOptions(initialState);
      } else {
        setIndentOptions(scrapboxIndentOption);
      }
    });
  }, []);

  const handleOnChange = (
    newValue: SingleValue<{
      value: string;
      label: string;
    }>,
    metaAction: ActionMeta<{
      value: string;
      label: string;
    }>
  ) => {
    // eslint-disable-next-line
    const value = newValue!.value;
    const label = metaAction.name;

    const newIndentOptions = indentOptions.map((option) => {
      if (option.label === label) {
        return { value, label };
      }
      return option;
    });

    setIndentOptions(newIndentOptions);

    chrome.storage.local.set({ scrapboxIndentOption: newIndentOptions });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.url === undefined || tab.id === undefined) return;

        const url = new URL(tab.url);
        if (url.hostname === 'scrapbox.io') {
          chrome.tabs.sendMessage(tab.id, 'scrapbox_list_maker');
        }
      });
    });
  };

  return (
    <MainContainer>
      <Title>Select Favorite List Maker</Title>
      <IndentContainer>
        {indentOptions.map((indentOption) => {
          const spaceNum = +indentOption.label.replace(/[^0-9]/g, '') - 1;

          return (
            <>
              <IndentRow spaceNum={spaceNum}>
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
                <Label>{indentOption.label}</Label>
              </IndentRow>
            </>
          );
        })}
      </IndentContainer>

      <DemonstrationContainer>
        <Demonstration>
          <Title>Demonstration</Title>
          <IndentContainer>
            {indentOptions.map((indentOption) => {
              const spaceNum = +indentOption.label.replace(/[^0-9]/g, '') - 1;
              return [...Array(spaceNum + 1)].map(() => {
                return (
                  <>
                    <IndentRow spaceNum={spaceNum * 0.8}>
                      {indentOption.value}
                      &nbsp;&nbsp;&nbsp;
                      {indentOption.label}
                    </IndentRow>
                  </>
                );
              });
            })}
          </IndentContainer>
        </Demonstration>
      </DemonstrationContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  background-color: #dcdde0;
  padding: 4px;
  padding-bottom: 8px;
`;

const Title = styled.div`
  font-size: 18px;
  text-align: left;
  margin: 12px 10px;
`;

const Label = styled.div`
  font-size: 14px;
  margin-left: 12px;
`;

const IndentContainer = styled.div`
  margin: 0px 10px;
`;

const IndentRow = styled.div<{ spaceNum: number }>`
  margin-left: ${(props) => `${props.spaceNum * 30}px`};
  margin-top: 6px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
`;

const DemonstrationContainer = styled.div`
  margin: 14px;
  padding: 6px 0px;
  background-color: #fefefe;
  border-radius: 2%;
  box-shadow: 0px 5px 5px -3px #9e9e9e;
`;

const Demonstration = styled.div`
  padding: 0px 10px;
  border-left: 5px solid #808b8c;
  box-sizing: border-box;
`;
