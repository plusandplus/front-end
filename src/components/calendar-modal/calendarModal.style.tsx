import styled from 'styled-components';
import theme from '../../style/theme';

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 768px;
  background-color: #fff;
  margin: 0 auto;
`;

export const ReservationButton = styled.button`
  background-color: ${theme.colors.main};
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 12px;
  padding: 10px;
`;

export const CalendarBox = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;

  overflow-y: auto;

  /* 스크롤 바 안보이게 처리 */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  position: relative;
  max-height: calc(100vh - 200px);

  @media screen and (max-width: 768px) {
  }
`;
