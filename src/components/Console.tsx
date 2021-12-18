import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getLocalStorage, setLocalStorage } from '../utils/chromeApi';
import { IndentOptionsType } from '../utils/types';
import { Demonstration } from './Demonstration';
import { MakerConsole } from './MakerConsole';

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
  const [markerColor, setMarkerColor] = useState<string>('rgba(0,0,0,0.65)');
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
        setLocalStorage('scrapboxMarkerColor', 'rgba(0,0,0,0.65)');
        setMarkerColor('rgba(0,0,0,0.65)');
      } else {
        setMarkerColor(scrapboxMarkerColor);
      }
    })();
  }, []);

  const handleIndentLiningChange = async (checked: boolean) => {
    await setLocalStorage<boolean>('scrapboxIndentLining', checked);
    setIndentLining(checked);
  };

  return (
    <MainContainer>
      <MakerConsole
        indentOptions={indentOptions}
        setIndentOptions={setIndentOptions}
        indentLining={indentLining}
        handleIndentLiningChange={handleIndentLiningChange}
        setIndentLiningColor={setIndentLiningColor}
        setMarkerColor={setMarkerColor}
      />
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
