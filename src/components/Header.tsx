import React from 'react';
import { IconContext } from 'react-icons';
import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';
import Icon from '../images/icon.png';

type Props = Record<string, never>;

export const Header: React.FC<Props> = () => {
  return (
    <Main>
      <Image src={Icon} />
      <Title>Scrapbox List Marker</Title>
      <IconContext.Provider value={githubIconConfig}>
        <a
          href="https://github.com/penicillin0/scrapbox-list-marker"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
      </IconContext.Provider>
    </Main>
  );
};

const githubIconConfig = {
  color: '#444',
  size: '22px',
  style: { paddingLeft: '36px' },
};

const Main = styled.div`
  padding: 7px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: rgba(0, 180, 40, 0.8);
  position: relative;
`;

const Image = styled.img`
  padding: 0px 12px;
  height: 36px;
  width: 36px;
`;

const Title = styled.p`
  font-size: 21px;
  color: #fff;
  font-weight: bold;
  font-family: 'Noto Serif JP', 游ゴシック体, 'Yu Gothic', YuGothic,
    'ヒラギノ角ゴシック Pro', sans-serif;
`;
