import { Grid } from '@mui/material';
import Popper from '@mui/material/Popper';
import React from 'react';
import { ColorResult, TwitterPicker } from 'react-color';
import { IconContext } from 'react-icons';
import { MdOutlineColorLens } from 'react-icons/md';
import OutsideClickHandler from 'react-outside-click-handler';
import Switch from 'react-switch';
import styled from 'styled-components';
import { setLocalStorage } from '../utils/chromeApi';

type Props = {
  indentLining: boolean;
  handleIndentLiningChange: (checked: boolean) => void;
  setIndentLiningColor: (color: string) => void;
  setMarkerColor: (color: string) => void;
  markerColoring: boolean;
  handleMarKerColoringChange: (checked: boolean) => void;
};

export const SubConsole: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | SVGElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleColorIconClick = (event: React.MouseEvent<SVGElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleColorChange = async ({ hex }: ColorResult) => {
    if (anchorEl?.id === 'lineColor') {
      setLocalStorage('scrapboxIndentLineColor', hex);
      props.setIndentLiningColor(hex);
    } else if (anchorEl?.id === 'markerColor') {
      setLocalStorage('scrapboxMarkerColor', hex);
      props.setMarkerColor(hex);
    }
  };

  const handleOnOutsideClick = () => {
    setOpen(false);
  };

  return (
    <MainContainer>
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

      <Title>Customize your maker</Title>

      <Grid container alignItems="center" padding={1} paddingLeft={4}>
        <Grid item xs={8}>
          <SettingTitle>Show indentation line</SettingTitle>
        </Grid>
        <Grid item xs={2}>
          <Item>
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
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <IconContext.Provider
              value={{ size: '20px', style: { padding: '2px' } }}
            >
              <ColorLens onClick={handleColorIconClick} id="lineColor" />
            </IconContext.Provider>
          </Item>
        </Grid>
      </Grid>

      <Grid container alignItems="center" padding={1} paddingLeft={4}>
        <Grid item xs={8}>
          <SettingTitle>Change list markers</SettingTitle>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <Switch
              checked={props.markerColoring}
              onChange={props.handleMarKerColoringChange}
              onColor="#00b428"
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              height={16}
              width={30}
              handleDiameter={18}
              checkedIcon={false}
              uncheckedIcon={false}
            />
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>
            <IconContext.Provider
              value={{ size: '20px', style: { padding: '2px' } }}
            >
              <ColorLens onClick={handleColorIconClick} id="markerColor" />
            </IconContext.Provider>
          </Item>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

const MainContainer = styled.div``;

const ColorLens = styled(MdOutlineColorLens)`
  color: #00b428;
  :hover {
    color: #b4008c;
    cursor: pointer;
  }
`;

const SettingTitle = styled.div`
  font-size: 15px;
  text-align: left;
`;

const Title = styled.div`
  font-size: 18px;
  text-align: left;
  margin: 10px 12px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
