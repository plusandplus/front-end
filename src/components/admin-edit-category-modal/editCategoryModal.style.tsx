import styled from 'styled-components';
import theme from '../../style/theme';

export const ContentsContainer = styled.div`
  padding: 30px 50px;
`;

export const ContentsText = styled.div`
  font-size: 20px;
  margin-bottom: 20px;

  & > * {
    display: inline-block;
    margin-left: 10px;
  }

  &:last-child {
    margin-bottom: 0px;
  }
`;

export const CategoryInput = styled.input`
  width: 230px;
  height: 30px;
  border: 2px solid ${theme.colors.border};
  border-radius: 7px;
  padding: 0 10px;
  font-size: 16px;

  &.warning {
    border: 2px solid red;
  }

  &:focus {
    border: 2px solid ${theme.colors.main};
    outline: none;
  }
`;

export const WarningMessageContainer = styled.div`
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
`;

export const WarningMessage = styled.div`
  font-size: 14px;
  color: red;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
`;

export const BottomButton = styled.button`
  border: none;
  cursor: pointer;
  width: 80px;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;

  &.edit {
    background-color: ${theme.colors.main};
    color: #fff;
  }
`;
