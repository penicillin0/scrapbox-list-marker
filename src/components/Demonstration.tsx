import Color from 'color';
import React from 'react';
import styled from 'styled-components';
import { IndentOptionsType } from '../utils/types';

type Props = {
  hasLine: boolean;
  indentOptions: IndentOptionsType;
  indentLiningColor: string;
  markerColor: string;
};

export const Demonstration: React.FC<Props> = (props) => {
  const markerIsDark = Color(props.markerColor).isDark();

  return (
    <MainContainer
      bgColor={markerIsDark ? '#fefefe' : '#444444'}
      textColor={markerIsDark ? '#111111' : '#fefefe'}
    >
      <Main borderColor={markerIsDark ? '#333333' : '#aaaaaa'}>
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
                        {props.hasLine && (
                          <VerticalLine
                            indentLiningColor={props.indentLiningColor}
                          />
                        )}
                        <Indent />
                      </VerticalLineIndentContainer>
                    );
                  })}
                  <IndentContent>
                    <IndentValue markerColor={props.markerColor}>
                      {indentOption.value}
                    </IndentValue>
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

const MainContainer = styled.div<{ bgColor: string; textColor: string }>`
  margin: 12px 14px;
  padding: 6px 0px;
  border-radius: 2%;
  box-shadow: 0px 5px 5px -3px #9e9e9e;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
`;

const Main = styled.div<{ borderColor: string }>`
  padding: 0px 12px;
  border-left: 5px solid ${(props) => props.borderColor};
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

const VerticalLine = styled.div<{ indentLiningColor: string }>`
  width: 1px;
  height: 23px;
  position: absolute;
  top: 0;
  left: 45%;
  background-color: ${(props) => props.indentLiningColor};
`;

const Indent = styled.div`
  width: 24px;
  height: 23px;
`;

const IndentContent = styled.div`
  margin-left: 6px;
  margin-top: 1.8px;
  margin-bottom: 1.8px;
  display: flex;
  align-items: center;
`;

const IndentValue = styled.span<{ markerColor: string }>`
  font-size: 10px;
  transform: scale(0.75);
  font-weight: bold;
  color: ${(props) => props.markerColor};
`;

const IndentOption = styled.span`
  font-size: 12px;
`;
