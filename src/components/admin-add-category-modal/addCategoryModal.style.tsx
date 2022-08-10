import styled from 'styled-components';
import theme from '../../style/theme';

export const CategoryButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

export const CategoryButton = styled.button`
  border: none;
  cursor: pointer;
  width: 100px;
  height: 60px;
  border-radius: 10px;
  margin-right: 30px;
  font-size: 18px;

  &:last-child {
    margin-right: 0px;
  }

  &.focused {
    background-color: ${theme.colors.main};
    color: #fff;
    font-weight: bold;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0 70px;
`;

export const CategoryInput = styled.input`
  width: 300px;
  height: 50px;
  border-radius: 10px;
  border: 2px solid ${theme.colors.subTitle};
  font-size: 20px;
  padding: 0 10px;

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

  &.add {
    background-color: ${theme.colors.main};
    color: #fff;
  }
`;
