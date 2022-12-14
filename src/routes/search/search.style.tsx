import styled from 'styled-components';
import theme from '../../style/theme';

export const Wrapper = styled.div`
  padding-bottom: 60px;

  &.two {
    height: 80vh;

    @media (max-width: 480px) {
      height: auto;
    }
  }

  &.one {
    height: 80vh;
  }
`;

export const FilterWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e6e6e6;
  padding: 10px;
  position: fixed;
  background-color: #fff;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const FilterTop = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

export const SearchButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const SearchButton = styled.button`
  padding: 10px 20px;

  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${theme.colors.main};
  border: 0;
  color: #fff;
  &:hover {
    background-color: ${theme.colors.mainButtonHover};
    border: 1px solid: ${theme.colors.mainButtonHover};
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  margin-right: 10px;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    &.checkout {
      margin-right: 0;
    }
  }
`;

export const CategoryTitle = styled.span`
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  margin-right: 10px;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const CagtegoryButton = styled.button`
  width: 160px;
  height: 36px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  &.regionName {
    width: 150px;
  }

  @media (max-width: 768px) {
    width: 100%;

    &.regionName {
      width: 100%;
    }
  }
`;

export const IconButton = styled.button`
  width: 36px;
  height: 36px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding-top: 5px;
  cursor: pointer;
`;

export const IconButtonContainer = styled.div`
  display: flex;

  & > * + * {
    margin-left: 5px;
  }

  &.mobile {
    display: none;
  }

  @media (max-width: 768px) {
    &.mobile {
      display: flex;
    }

    &.desktop {
      display: none;
    }
  }
`;

export const RowContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;

    & + & {
      margin-top: 10px;
    }
  }
`;

export const ProductListContainer = styled.div`
  padding-top: 140px;
  // height: 60vh;

  @media (max-width: 768px) {
    padding-top: 175px;
  }
`;

export const EmptySearchResult = styled.div`
  height: 65vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
