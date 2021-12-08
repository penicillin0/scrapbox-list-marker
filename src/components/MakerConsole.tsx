import Popper from '@mui/material/Popper';
import React from 'react';
import { ColorResult, TwitterPicker } from 'react-color';
import { IconContext } from 'react-icons';
import { MdOutlineColorLens } from 'react-icons/md';
import OutsideClickHandler from 'react-outside-click-handler';
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
  setIndentLiningColor: (color: string) => void;
};

export const MakerConsole: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | SVGElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleColorIconClick = (event: React.MouseEvent<SVGElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
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

  const handleColorChange = ({ hex }: ColorResult) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.storage.local.set({ scrapboxIndentLineColor: hex });

      tabs.forEach((tab) => {
        if (tab.url === undefined || tab.id === undefined) return;
        const url = new URL(tab.url);
        if (url.hostname === 'scrapbox.io') {
          chrome.tabs.sendMessage(tab.id, 'scrapbox_indent_lining_color');
        }
      });
    });

    props.setIndentLiningColor(hex);
  };

  const handleOnOutsideClick = () => {
    setOpen(false);
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
          <ColorLens onClick={handleColorIconClick} />
        </IconContext.Provider>
      </TitleWrapper>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [10, 10],
            },
          },
        ]}
      >
        <OutsideClickHandler onOutsideClick={handleOnOutsideClick}>
          <TwitterPicker
            triangle="top-right"
            onChangeComplete={handleColorChange}
          />
        </OutsideClickHandler>
      </Popper>

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

const TwitterPickerWrapper = styled.div`
  position: absolute;
  top: 114px;
  right: 10px;
  z-index: 1;
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
