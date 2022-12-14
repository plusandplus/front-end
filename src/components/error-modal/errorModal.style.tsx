import styled from 'styled-components';
import theme from '../../style/theme';

export const ErrorModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  white-space: pre-wrap;
`;

export const ContentText = styled.div`
  width: 100%;
  font-size: 20px;
  margin: 40px 0px;
  align-items: center;
  text-align: center;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ConfirmButton = styled.button`
  border: none;
  width: 100px;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
  color: white;
  background-color: ${theme.colors.main};
`;
