import styled from 'styled-components';
import theme from '../../style/theme';
import { MdPersonPin } from 'react-icons/md';

export const Text = styled.span`
  color: ${theme.colors.main};
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.2);
`;

export const HeaderText = styled.span`
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 10px;
`;

export const AdvertiseImg = styled.img`
  height: 60px;
  cursor: pointer;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
`;

export const LoginIcon = styled.div`
  margin: 0 1px;
  width: 35px;
  height: 15px;
  line-height: 15px;
  background-color: ${(props) => props.color};

  > span {
    font-size: 8px;
  }
`;

export const MypageContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  min-width: 380px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0px;
  padding: 10px;

  background-color: #ffffff;
  justify-content: center;
`;

export const UserIcon = styled(MdPersonPin)`
  &.override {
    font-size: 50px;
    border: 1px solid #000000;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 10px;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
  width: 100%;

  .icon {
    font-size: 30px;
    margin-bottom: 8px;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const ModifyButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  opacity: 0.4;
  font-size: 12px;
`;

export const ItemMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33.3%;
  font-size: 12px;
  padding: 5px;
  border-right: 1px solid #000;

  > span {
    font-size: 15px;
  }

  &:last-child {
    border: none;
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

export const Coupon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  font-size: 12px;
  padding: 10px;

  &:last-child {
    border: none;
  }
`;