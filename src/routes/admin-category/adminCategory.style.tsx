import styled from 'styled-components';
import theme from '../../style/theme';

export const Container = styled.div`
  display: flex;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    margin-top: 50px;
  }
`;

export const Wrap = styled.div`
  flex: 1 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  &.left {
    height: 100vh;
  }

  @media screen and (max-width: 1000px) {
    &.left {
      margin-bottom: 50px;
    }
  }
`;

export const CategoryButtonContainer = styled.div`
  position: fixed;
  @media screen and (max-width: 1000px) {
    position: static;
  }
`;

export const CategoryButton = styled.button`
  border: none;
  cursor: pointer;
  width: 10em;
  height: 7em;
  border-radius: 10px;
  margin-right: 30px;

  & > span {
    font-size: 24px;
  }

  &:hover {
    transform: scale(1.1);
  }

  &.focused {
    background-color: ${theme.colors.main};
    color: #fff;
  }

  @media screen and (max-width: 1000px) {
    width: 8em;
    height: 5em;
  }
`;

export const FormContainer = styled.div`
  width: 70%;
  padding: 20px 30px;
  box-sizing: border-box;
  margin: 50px 0;
  border: 1px solid ${theme.colors.border};
  border-radius: 10px;

  @media screen and (max-width: 1000px) {
    margin: 0px;
    margin-bottom: 50px;
  }
`;

export const CategoryElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

export const SmallButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 10px;
  width: 60px;
  height: 40px;

  &.left {
    margin-right: 10px;
  }

  &:hover {
    background-color: ${theme.colors.main};
    color: #fff;
  }
`;

export const AddButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const AddButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 10px;
  width: 80%;
  height: 50px;
  font-size: 20px;

  &:hover {
    transform: scale(1.1);
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
