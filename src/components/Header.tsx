import React from 'react';
import styled from 'styled-components';

type Props = Record<string, never>;

export const Header: React.FC<Props> = () => {
  return (
    <Main>
      <Title>Scrapbox List Marker</Title>
    </Main>
  );
};

const Main = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #01b52ebd;
  box-shadow: 0px 2px 3px 0px #9e9e9e;
  position: relative;
`;

const Title = styled.p`
  font-size: 22px;
  color: #fff;
  font-weight: bold;
  font-family: 'Noto Serif JP', 游ゴシック体, 'Yu Gothic', YuGothic,
    'ヒラギノ角ゴシック Pro', sans-serif;
`;
