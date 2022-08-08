import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RiAdminLine } from 'react-icons/ri';
import theme from '../../style/theme';
export const AdminInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 10px;
  margin-bottom: 30px;
  box-sizing: border-box;
  flex-direction: column;
  border-bottom: 1px solid ${theme.colors.border};
`;
export const GreetingText = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
`;

export const AdminIcon = styled(RiAdminLine)`
  font-size: 50px;
  color: ${theme.colors.main};
  border: 3px solid ${theme.colors.border};
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
`;

export const AdminContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
`;

export const ContentItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33.3%;
  font-size: 12px;
  font-weight: 700;
  color: #000;
  padding: 5px;
  border-right: 1px solid ${theme.colors.border};
  text-decoration: none;
  &:last-child {
    border: none;
  }
  .icon {
    color: ${theme.colors.main};
    font-size: 30px;
    margin-bottom: 8px;
    &:hover {
      transform: scale(1.1);
    }
  }
  @media screen and (max-width: 400px) {
    .icon {
      font-size: 20px;
    }
    > span {
      font-size: 10px;
    }
  }
`;

export const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export const Content = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 700;
  padding: 30px;
  border-right: 1px solid ${theme.colors.border};
  text-decoration: none;
  color: #000;

  &:last-child {
    border: none;
  }

  .icon {
    color: ${theme.colors.main};
    font-size: 36px;
    margin-bottom: 8px;
  }
  @media screen and (max-width: 400px) {
    .icon {
      font-size: 20px;
    }
    > span {
      font-size: 10px;
    }
  }

  &:hover {
    & > * {
      transform: scale(1.1);
    }
  }
`;
