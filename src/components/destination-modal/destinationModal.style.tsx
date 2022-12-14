import styled from 'styled-components';
import theme from '../../style/theme';

export const RegionButtonContainer = styled.div`
  padding: 20px 20px 0 20px;

  ul {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }
`;

export const RegionButton = styled.button<{
  regionName: string;
  clickedRegionName: string;
}>`
  background-color: #fff;
  border: none;
  border-radius: 10px;
  padding: 15px 25px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;

  &:hover {
    background-color: ${theme.colors.buttonHover};
  }

  ${({ regionName, clickedRegionName }) => {
    return (
      regionName === clickedRegionName &&
      `background-color: ${theme.colors.main}; 
      color: #fff; 
      font-weight: bold;
      &:hover {
        background-color: ${theme.colors.main};
      }
      `
    );
  }}
`;
