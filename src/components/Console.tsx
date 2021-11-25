import React, { useEffect, useState } from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';
import Switch from 'react-switch';
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
  const [indentColoring, setIndentColoring] = useState<boolean>(false);

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

    chrome.storage.local.get('scrapboxIndentColoring', (result) => {
      const scrapboxIndentColoring = result.scrapboxIndentColoring;

      if (!scrapboxIndentColoring) {
        chrome.storage.local.set({ scrapboxIndentColoring: false });
        setIndentColoring(false);
      } else {
        setIndentColoring(scrapboxIndentColoring);
      }
    });
  }, []);

  const handleIndentColoringChange = (checked: boolean) => {
    chrome.storage.local.set({ scrapboxIndentColoring: checked });
    setIndentColoring(checked);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.url === undefined || tab.id === undefined) return;
        const url = new URL(tab.url);
        if (url.hostname === 'scrapbox.io') {
          chrome.tabs.sendMessage(tab.id, 'scrapbox_indent_coloring');
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
        <Title>Select Favorite List Maker</Title>
        <SwitchLabel>
          <Switch
            checked={indentColoring}
            onChange={handleIndentColoringChange}
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
      <DemonstrationContainer>
        <Demonstration>
          <Title>Demonstration</Title>
          <IndentContainer>
            {indentOptions.map((indentOption) => {
              const spaceNum = +indentOption.label.replace(/[^0-9]/g, '') - 1;
              return [...Array(spaceNum + 1)].map((i) => {
                return (
                  <Row key={i}>
                    {[...Array(spaceNum)].map((j) => {
                      return (
                        <VerticalLineIndentContainer key={j}>
                          {indentColoring && <VerticalLine />}
                          <Indent isGey={indentColoring} />
                        </VerticalLineIndentContainer>
                      );
                    })}
                    <IndentContent>
                      {indentOption.value}
                      &nbsp;&nbsp;&nbsp;
                      {indentOption.label}
                    </IndentContent>
                  </Row>
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

const VerticalLineIndentContainer = styled.div`
  position: relative;
`;

const VerticalLine = styled.div`
  width: 0.2px;
  height: 27px;
  position: absolute;
  top: -40%;
  left: 52%;
  background-color: #dcdcdc;
`;

const Indent = styled.div<{ isGey: boolean }>`
  width: 24px;
  height: 15px;
  background-color: ${(props) => (props.isGey ? '#f5f5f5' : '#fff')};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
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

const IndentContent = styled.div`
  margin-left: 6px;
  margin-top: 1.8px;
  margin-bottom: 1.8px;
  display: flex;
  align-items: center;
`;

const DemonstrationContainer = styled.div`
  margin: 12px 14px;
  padding: 6px 0px;
  background-color: #fefefe;
  border-radius: 2%;
  box-shadow: 0px 5px 5px -3px #9e9e9e;
`;

const Demonstration = styled.div`
  padding: 0px 12px;
  border-left: 5px solid #808b8c;
  box-sizing: border-box;
`;
