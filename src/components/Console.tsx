import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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

    chrome.storage.local.get('scrapboxIndentLineColor', (result) => {
      const scrapboxIndentLineColor = result.scrapboxIndentLineColor;

      if (!scrapboxIndentLineColor) {
        chrome.storage.local.set({ scrapboxIndentLineColor: '#dcdcdc' });
        setIndentLiningColor('#dcdcdc');
      } else {
        setIndentLiningColor(scrapboxIndentLineColor);
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
