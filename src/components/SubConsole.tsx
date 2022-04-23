import React from 'react';
import styled from 'styled-components';

type Props = { children?: React.ReactNode };

export const SubConsole: React.FC<Props> = () => {
  return (
    <MainContainer>
      <div>Sub page</div>
    </MainContainer>
  );
};

const MainContainer = styled.div``;
