import React from 'react';
import styled from 'styled-components';
import Icon from '../images/icon.png';

type Props = Record<string, never>;

export const Header: React.FC<Props> = () => {
  return (
    <Main>
      <Image src={Icon} />
      <Title>Scrapbox List Marker</Title>
    </Main>
  );
};

const Main = styled.div`
  padding: 7px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: left;
  background-color: rgba(0, 180, 40, 0.6);
  box-shadow: 0px 2px 3px 0px #9e9e9e;
  position: relative;
`;

const Image = styled.img`
  padding: 0px 12px;
  height: 36px;
  width: 36px;
`;

const Title = styled.p`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  font-family: 'Noto Serif JP', 游ゴシック体, 'Yu Gothic', YuGothic,
    'ヒラギノ角ゴシック Pro', sans-serif;
`;
