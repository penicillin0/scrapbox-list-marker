import React from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';
import styled from 'styled-components';
import { setLocalStorage } from '../utils/chromeApi';
import { IndentOptionsType } from '../utils/types';

const options = [
  { value: '●', label: '●' },
  { value: '○', label: '○' },
  { value: '■', label: '■' },
  { value: '□', label: '□' },
];

type Props = {
  indentOptions: IndentOptionsType;
  setIndentOptions: React.Dispatch<React.SetStateAction<IndentOptionsType>>;
  indentLining: boolean;
  handleIndentLiningChange: (checked: boolean) => void;
  setIndentLiningColor: (color: string) => void;
  setMarkerColor: (color: string) => void;
};

export const MakerConsole: React.FC<Props> = (props) => {
  const handleOnChange = async (
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

    const newIndentOptions = props.indentOptions.map((option) => {
      if (option.label === label) {
        return { value, label };
      }
      return option;
    });

    props.setIndentOptions(newIndentOptions);

    setLocalStorage('scrapboxIndentOption', newIndentOptions);
  };

  return (
    <>
      <TitleWrapper>
        <Title>Select Favorite Maker</Title>
      </TitleWrapper>

      <IndentContainer>
        {props.indentOptions.map((indentOption) => {
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
    </>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 18px;
  text-align: left;
  margin: 10px 12px;
`;

const IndentContainer = styled.div`
  margin: 0px 10px;
  position: relative;
`;

const IndentRow = styled.div<{ spaceNum: number }>`
  margin-left: ${(props) => `${props.spaceNum * 30}px`};
  margin-top: 4px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  font-size: 14px;
  margin-left: 12px;
`;
