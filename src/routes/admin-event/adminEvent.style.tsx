import styled from 'styled-components';
import theme from '../../style/theme';

export const Container = styled.div`
  padding: 50px;
`;

export const AddButton = styled.button`
  border: none;
  cursor: pointer;
  width: 10em;
  height: 3em;
  border-radius: 10px;
  background-color: ${theme.colors.main};
  color: #fff;
  font-size: 20px;
  margin-bottom: 30px;

  &:hover {
    transform: scale(1.1);
  }
`;

export const MainContents = styled.div`
  margin-bottom: 50px;
`;

export const Title = styled.h3``;

export const AllEventContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const EventContainer = styled.div`
  margin: 0 40px 20px 0;
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
`;

export const EventImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const EventImage = styled.img`
  width: 250px;
  height: 300px;

  &.end {
    filter: grayscale(100%);
  }
`;

export const EventName = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  margin: 10px 0;
`;

export const EventPeriod = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
`;

export const HandelEventButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

export const HandelEventButton = styled.button`
  border: none;
  cursor: pointer;
  width: 50px;
  height: 30px;
  border-radius: 10px;
  margin-right: 10px;

  &:last-child {
    margin-right: 0px;
  }

  &:hover {
    background-color: ${theme.colors.main};
    color: #fff;
  }
`;
