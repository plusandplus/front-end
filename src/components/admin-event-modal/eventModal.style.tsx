import styled from 'styled-components';
import theme from '../../style/theme';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const ModalContainer = styled.div`
  padding: 20px 30px 0;
  max-height: calc(100vh - 270px);
  overflow-y: auto;
  position: relative;
  margin-bottom: 70px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const EventInput = styled.input`
  width: 250px;
  height: 42px;
  box-sizing: border-box;
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.border};
  font-size: 16px;

  &:focus {
    border: 1px solid ${theme.colors.main};
    outline: none;
  }

  &.warning {
    border: 1px solid red;
  }
`;

export const InputTitle = styled.span`
  display: inline-block;
  white-space: nowrap;
  font-size: 18px;
  font-weight: bold;
  width: 120px;

  &.date {
    width: 146px;
  }
`;

export const InputFile = styled.input`
  margin: 10px 0;
`;

export const EventDatePicker = styled(DatePicker)`
  width: 250px;
  height: 42px;
  box-sizing: border-box;
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.border};
  font-size: 16px;

  &:focus {
    border: 1px solid ${theme.colors.main};
    outline: none;
  }
`;

export const EventRateInput = styled(EventInput)`
  width: 70px;
  margin-right: 5px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid ${theme.colors.border};
  align-items: center;
`;

export const Button = styled.button`
  border: none;
  cursor: pointer;
  width: 70px;
  height: 45px;
  border-radius: 10px;
  font-size: 16px;
  margin-right: 20px;

  &:hover {
    transform: scale(1.1);
  }

  &.add {
    background-color: ${theme.colors.main};
    color: #fff;
    // margin-left: 20px;
  }
`;

export const ImagesContainer = styled.div`
  display: flex;
`;

export const WarningMessageContainer = styled.div`
  margin-bottom: 25px;
  display: flex;
`;

export const WarningMessage = styled.div`
  font-size: 12px;
  color: red;
  padding-top: 5px;
`;