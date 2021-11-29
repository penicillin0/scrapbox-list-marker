import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { MdOutlineColorLens } from 'react-icons/md';
import Select, { ActionMeta, SingleValue } from 'react-select';
import Switch from 'react-switch';
import styled from 'styled-components';
import { IndentOptionsType } from '../utils/types';
import { Demonstration } from './Demonstration';

const options = [
  { value: '●', label: '●' },
  { value: '○', label: '○' },
  { value: '■', label: '■' },
  { value: '□', label: '□' },
];

const initialState: IndentOptionsType = [
  { value: '●', label: 'indent-1' },
  { value: '●', label: 'indent-2' },
  { value: '●', label: 'indent-3' },
  { value: '●', label: 'indent-4' },
];

type Props = Record<string, never>;

export const Console: React.FC<Props> = () => {
  const [indentOptions, setIndentOptions] =
    useState<IndentOptionsType>(initialState);
  const [indentLining, setIndentLining] = useState<boolean>(false);

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

    chrome.storage.local.get('scrapboxIndentLining', (result) => {
      const scrapboxIndentLining = result.scrapboxIndentLining;

      if (!scrapboxIndentLining) {
        chrome.storage.local.set({ scrapboxIndentLining: false });
        setIndentLining(false);
      } else {
        setIndentLining(scrapboxIndentLining);
      }
    });
  }, []);

  const handleIndentLiningChange = (checked: boolean) => {
    chrome.storage.local.set({ scrapboxIndentLining: checked });
    setIndentLining(checked);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.url === undefined || tab.id === undefined) return;
        const url = new URL(tab.url);
        if (url.hostname === 'scrapbox.io') {
          chrome.tabs.sendMessage(tab.id, 'scrapbox_indent_lining');
        }
      });
    });
  };

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
      <TitleWrapper>
        <Title>Select Favorite Maker</Title>
        <SwitchLabel>
          <Switch
            checked={indentLining}
            onChange={handleIndentLiningChange}
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
      <Demonstration hasLine={indentLining} indentOptions={indentOptions} />
    </MainContainer>
  );
};

const ColorLens = styled(MdOutlineColorLens)`
  color: #00b428;
  :hover {
    color: #b4008c;
    cursor: pointer;
  }
`;

const MainContainer = styled.div`
  background-color: #dcdde0;
  padding: 4px;
  padding-bottom: 8px;
`;

const Spacer = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 16px;
  text-align: left;
  margin: 10px 12px;
`;

const SwitchLabel = styled.label`
  margin-left: 8px;
  display: flex;
  align-items: center;
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
  margin-top: 4px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
`;
