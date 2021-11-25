import React from 'react';
import styled from 'styled-components';
import { IndentOptionsType } from '../utils/types';

type Props = {
  isGrey: boolean;
  indentOptions: IndentOptionsType;
};

export const Demonstration: React.FC<Props> = (props) => {
  return (
    <MainContainer>
      <Main>
        <Title>Demonstration</Title>
        <IndentContainer>
          {props.indentOptions.map((indentOption) => {
            const spaceNum = +indentOption.label.replace(/[^0-9]/g, '') - 1;
            return [...Array(spaceNum + 1)].map((i) => {
              return (
                <Row key={i}>
                  {[...Array(spaceNum)].map((j) => {
                    return (
                      <VerticalLineIndentContainer key={j}>
                        {props.isGrey && <VerticalLine />}
                        <Indent isGrey={props.isGrey} />
                      </VerticalLineIndentContainer>
                    );
                  })}
                  <IndentContent>
                    <IndentValue>{indentOption.value}</IndentValue>
                    &nbsp;&nbsp;&nbsp;
                    <IndentOption>{indentOption.label}</IndentOption>
                  </IndentContent>
                </Row>
              );
            });
          })}
        </IndentContainer>
      </Main>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  margin: 12px 14px;
  padding: 6px 0px;
  background-color: #fefefe;
  border-radius: 2%;
  box-shadow: 0px 5px 5px -3px #9e9e9e;
`;

const Main = styled.div`
  padding: 0px 12px;
  border-left: 5px solid #808b8c;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 16px;
  text-align: left;
  margin: 10px 12px;
`;

const IndentContainer = styled.div`
  margin: 0px 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const VerticalLineIndentContainer = styled.div`
  position: relative;
`;

const VerticalLine = styled.div`
  width: 0.2px;
  height: 27px;
  position: absolute;
  top: -40%;
  left: 50%;
  background-color: #dcdcdc;
`;

const Indent = styled.div<{ isGrey: boolean }>`
  width: 24px;
  height: 15px;
  background-color: ${(props) => (props.isGrey ? '#f5f5f5' : '#fff')};
`;

const IndentContent = styled.div`
  margin-left: 6px;
  margin-top: 1.8px;
  margin-bottom: 1.8px;
  display: flex;
  align-items: center;
`;

const IndentValue = styled.span`
  font-size: 10px;
  transform: scale(0.8);
`;

const IndentOption = styled.span`
  font-size: 12px;
`;
