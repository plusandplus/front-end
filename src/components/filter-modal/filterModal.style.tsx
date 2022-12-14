import styled from 'styled-components';
import theme from '../../style/theme';

export const FilterModalContainer = styled.div`
  padding: 0 20px;
  max-height: calc(100vh - 270px);
  overflow-y: auto;
  position: relative;
  margin-bottom: 70px;
`;

export const CostSliderContainer = styled.div`
  width: 280px;
  padding-left: 15px;
`;

export const CategoryContainer = styled.div`
  padding: 25px 0;
  border-bottom: 1px solid #d9d9d9;

  & + * + * {
    border: none;
  }
`;

export const CategoryTitle = styled.h2`
  font-size: 22px;
  margin: 0px;
  margin-bottom: 20px;
`;

export const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid ${theme.colors.border};
  align-items: center;
`;

export const ResetButton = styled.button`
  padding: 10px 10px 3px 10px;
  height: 50px;
  margin-left: 40px;
  background-color: #fff;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  box-sizing: border-box;

  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 1px;
    background: #000;
    margin-top: 2px;
  }

  &:hover {
    background-color: ${theme.colors.buttonHover};
  }
`;

export const SearchButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: ${theme.colors.main};
  border-radius: 10px;
  color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-right: 50px;
  font-weight: bold;
`;

export const CheckboxContainer = styled.div`
  padding: 0 10px;
  display: flex;
  flex-flow: row wrap;
  width: 96%;
`;
export const CheckboxElement = styled.div`
  flex-basis: 48%;
  display: flex;
  padding: 12px 0;
`;
export const CheckboxInput = styled.input`
  transform: scale(2);
  margin-right: 20px;
  border: 1px solid ${theme.colors.main};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.main};
  }
`;
export const CheckboxLabel = styled.label`
  display: inline-block;
  width: 100%;
  cursor: pointer;
`;

export const CostContainer = styled.div`
  display: flex;
  padding: 15px 0 0 10px;

  & > span {
    margin: 20px;
    padding-top: 3px;
  }
`;

export const CostTitle = styled.div`
  font-size: 12px;
  color: ${theme.colors.subTitle};
`;

export const CostInputContainer = styled.div`
  border: 1px solid ${theme.colors.border};
  padding: 8px;
  width: 70px;
  text-align: right;

  & > input {
    border: none;
    outline: none;
    text-align: right;
    width: 85px;
  }
`;
