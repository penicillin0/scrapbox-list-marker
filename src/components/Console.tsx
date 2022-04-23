import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getLocalStorage, setLocalStorage } from '../utils/chromeApi';
import { IndentOptionsType } from '../utils/types';
import { Demonstration } from './Demonstration';
import { MakerConsole } from './MakerConsole';
import { SubConsole } from './SubConsole';

const initialState: IndentOptionsType = [
  { value: '●', label: 'indent-1' },
  { value: '●', label: 'indent-2' },
  { value: '●', label: 'indent-3' },
  { value: '●', label: 'indent-4' },
];

type Props = Record<string, never>;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
};

export const Console: React.FC<Props> = () => {
  const [value, setValue] = useState<number>(0);
  const [indentOptions, setIndentOptions] =
    useState<IndentOptionsType>(initialState);
  const [markerColor, setMarkerColor] = useState<string>('#111111');
  const [indentLining, setIndentLining] = useState<boolean>(false);
  const [indentLiningColor, setIndentLiningColor] = useState<string>('#dcdcdc');

  useEffect(() => {
    (async () => {
      const scrapboxIndentOption =
        await getLocalStorage<IndentOptionsType | null>('scrapboxIndentOption');

      if (!scrapboxIndentOption) {
        setLocalStorage('scrapboxIndentOption', initialState);
        setIndentOptions(initialState);
      } else {
        setIndentOptions(scrapboxIndentOption);
      }

      const scrapboxIndentLining = await getLocalStorage<boolean | null>(
        'scrapboxIndentLining'
      );

      if (!scrapboxIndentLining) {
        setLocalStorage('scrapboxIndentLining', false);
        setIndentLining(false);
      } else {
        setIndentLining(scrapboxIndentLining);
      }

      const scrapboxIndentLineColor = await getLocalStorage<string | null>(
        'scrapboxIndentLineColor'
      );

      if (!scrapboxIndentLineColor) {
        setLocalStorage('scrapboxIndentLineColor', '#dcdcdc');
        setIndentLiningColor('#dcdcdc');
      } else {
        setIndentLiningColor(scrapboxIndentLineColor);
      }

      const scrapboxMarkerColor = await getLocalStorage<string | null>(
        'scrapboxMarkerColor'
      );

      if (!scrapboxMarkerColor) {
        setLocalStorage('scrapboxMarkerColor', '#111111');
        setMarkerColor('#111111');
      } else {
        setMarkerColor(scrapboxMarkerColor);
      }
    })();
  }, []);

  const handleIndentLiningChange = async (checked: boolean) => {
    await setLocalStorage<boolean>('scrapboxIndentLining', checked);
    setIndentLining(checked);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MainContainer>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        textColor="primary"
        indicatorColor="secondary"
        variant="fullWidth"
        TabIndicatorProps={{
          style: {
            backgroundColor: '#FCFF18',
          },
        }}
      >
        <Tab label="One" />
        <Tab label="Two" />
        <Tab label="Three" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <MakerConsole
          indentOptions={indentOptions}
          setIndentOptions={setIndentOptions}
          indentLining={indentLining}
          handleIndentLiningChange={handleIndentLiningChange}
          setIndentLiningColor={setIndentLiningColor}
          setMarkerColor={setMarkerColor}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SubConsole />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Three
      </TabPanel>

      <Demonstration
        hasLine={indentLining}
        indentOptions={indentOptions}
        indentLiningColor={indentLiningColor}
        markerColor={markerColor}
      />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  background-color: #dcdde0;
  padding: 4px;
  padding-bottom: 8px;
`;
