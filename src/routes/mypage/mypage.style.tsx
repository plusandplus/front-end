import styled, { keyframes } from 'styled-components';
import theme from '../../style/theme';
import { MdFavorite } from 'react-icons/md';
import { AiFillCalendar, AiOutlineComment } from 'react-icons/ai';

const componentFade = keyframes`
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
`;

export const LogoutButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: gray;
  font-size: 12px;
`;

export const Text = styled.span`
  color: ${theme.colors.main};
`;

export const TitleText = styled.span`
  font-size: 20px;
  margin: 20px 0 0 0;
  font-weight: 700;
  text-align: center;
  letter-spacing: 1.0px;
  
  @media screen and (max-width: 480px){
     font-size: 14px;
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  animation: ${componentFade} 0.5s linear;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 20%);
  border: 1px solid #d7e2eb;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #fff;
`;

export const HeaderText = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  font-style: italic;
  margin-bottom: 10px;
`;

export const AdvertiseImg = styled.img`
  height: 60px;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
`;

export const LoginIcon = styled.div`
  margin: 0 1px;
  width: 35px;
  line-height: 15px;
  background-color: ${(props) => props.color};
  color: ${(props) => (props.color === '#2DB400' ? '#fff' : '#000')};

  > span {
    font-size: 8px;
  }
`;

export const MypageContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-width: 380px;
  margin: 0 auto;
`;

export const UserInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 20%);
  border: 1px solid #d7e2eb;

  background-color: #ffffff;
  justify-content: center;
`;

export const UserIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  padding: 10px;
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 10px 0;
  width: 100%;

  > span {
    font-size: 14px;
  }
  .icon {
    font-size: 30px;
    margin-bottom: 8px;
    cursor: pointer;
  }
`;

export const ModifyConditionBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

export const ModifyButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: gray;
  font-size: 12px;
  &::before{
    content:"|";
    margin-right: 10px;
  }
`;

export const ItemMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33.3%;
  font-size: 12px;
  padding: 5px;
  height: 50px;
  border-right: 1px solid #000;
  cursor: pointer;
  
  &:hover{
    > svg{
      transform: scale(1.1);
    }
  }

  > span {
    font-size: 12px;
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

export const FillFavoriteIcon = styled(MdFavorite)`
  color: rgb(237, 73, 86);
`;

export const FillCalendar = styled(AiFillCalendar)`
  color: ${theme.colors.main};
`;

export const FillComments = styled(AiOutlineComment)`
  color: ${theme.colors.main};
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
