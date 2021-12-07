import React from 'react';
import { IconContext } from 'react-icons';
import { MdOutlineColorLens } from 'react-icons/md';
import Select, { ActionMeta, SingleValue } from 'react-select';
import Switch from 'react-switch';
import styled from 'styled-components';
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
};

export const MakerConsole: React.FC<Props> = (props) => {
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

    const newIndentOptions = props.indentOptions.map((option) => {
      if (option.label === label) {
        return { value, label };
      }
      return option;
    });

    props.setIndentOptions(newIndentOptions);

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
    <>
      <TitleWrapper>
        <Title>Select Favorite Maker</Title>
        <SwitchLabel>
          <Switch
            checked={props.indentLining}
            onChange={props.handleIndentLiningChange}
            onColor="#00b428"
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            height={16}
            width={30}
            handleDiameter={18}
            checkedIcon={false}
            uncheckedIcon={false}
          />
          <Spacer width={6} />
          <span>Indent Visible</span>
        </SwitchLabel>
        <IconContext.Provider
          value={{ size: '20px', style: { padding: '2px' } }}
        >
          <ColorLens />
        </IconContext.Provider>
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
  font-size: 16px;
  text-align: left;
  margin: 10px 12px;
`;

const ColorLens = styled(MdOutlineColorLens)`
  color: #00b428;
  :hover {
    color: #b4008c;
    cursor: pointer;
  }
`;

const SwitchLabel = styled.label`
  margin-left: 8px;
  display: flex;
  align-items: center;
`;

const IndentContainer = styled.div`
  margin: 0px 10px;
`;

const Spacer = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
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
