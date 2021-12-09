import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getLocalStorage, sendMessageToScrapboxIo } from '../utils/chromeApi';
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
  const [indentLining, setIndentLining] = useState<boolean>(false);
  const [indentLiningColor, setIndentLiningColor] = useState<string>('#dcdcdc');

  useEffect(() => {
    (async () => {
      const scrapboxIndentOption =
        await getLocalStorage<IndentOptionsType | null>('scrapboxIndentOption');

      if (!scrapboxIndentOption) {
        chrome.storage.local.set({
          scrapboxIndentOption: initialState,
        });
        setIndentOptions(initialState);
      } else {
        setIndentOptions(scrapboxIndentOption);
      }

      const scrapboxIndentLining = await getLocalStorage<boolean | null>(
        'scrapboxIndentLining'
      );

      if (!scrapboxIndentLining) {
        chrome.storage.local.set({ scrapboxIndentLining: false });
        setIndentLining(false);
      } else {
        setIndentLining(scrapboxIndentLining);
      }

      const scrapboxIndentLineColor = await getLocalStorage<string | null>(
        'scrapboxIndentLineColor'
      );

      if (!scrapboxIndentLineColor) {
        chrome.storage.local.set({ scrapboxIndentLineColor: '#dcdcdc' });
        setIndentLiningColor('#dcdcdc');
      } else {
        setIndentLiningColor(scrapboxIndentLineColor);
      }
    })();
  }, []);

  const handleIndentLiningChange = (checked: boolean) => {
    chrome.storage.local.set({ scrapboxIndentLining: checked });
    setIndentLining(checked);

    sendMessageToScrapboxIo('scrapbox_indent_lining');
  };

  return (
    <MainContainer>
      <MakerConsole
        indentOptions={indentOptions}
        setIndentOptions={setIndentOptions}
        indentLining={indentLining}
        handleIndentLiningChange={handleIndentLiningChange}
        setIndentLiningColor={setIndentLiningColor}
      />
      <Demonstration
        hasLine={indentLining}
        indentOptions={indentOptions}
        indentLiningColor={indentLiningColor}
      />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  background-color: #dcdde0;
  padding: 4px;
  padding-bottom: 8px;
`;
