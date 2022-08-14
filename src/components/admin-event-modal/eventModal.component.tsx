import { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { ko } from 'date-fns/esm/locale';
import AWS from 'aws-sdk';
import { modalAction } from '../../store/modules/modal/modal.slice';
import { selectIsAdminEventModalOpen } from '../../store/modules/modal/modal.select';
import MainModal from '../main-modal/mainModal.component';
import {
  ModalContainer,
  InputContainer,
  EventInput,
  InputTitle,
  EventDatePicker,
  EventRateInput,
  ButtonContainer,
  Button,
} from './eventModal.style';

const EventModal = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const isAdminEventModalOpen = useAppSelector(selectIsAdminEventModalOpen);

  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [eventRate, setEventRate] = useState<number | string>(0);

  const closeModal = () => {
    dispatch(modalAction.radioAdminEventModal());
  };

  const onChangeRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rate = +e.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1');

    if (+rate > 100) {
      rate = 100;
    }
    setEventRate(+rate);
  };

  return (
    <MainModal
      isOpen={isAdminEventModalOpen}
      onClose={closeModal}
      title="이벤트 추가하기"
    >
      <ModalContainer>
        <InputContainer>
          <InputTitle>이벤트 이름</InputTitle>
          <EventInput type="text" maxLength={15} />
        </InputContainer>
        <div>
          <InputContainer>
            <InputTitle className="date">시작일</InputTitle>
            <EventDatePicker
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              selected={eventStartDate}
              onChange={(date: Date) => {
                setEventStartDate(date);
                setEventEndDate(date);
              }}
              selectsStart
              startDate={eventStartDate}
              endDate={eventEndDate}
            />
          </InputContainer>
          <InputContainer>
            <InputTitle className="date">종료일</InputTitle>
            <EventDatePicker
              locale={ko}
              minDate={eventStartDate}
              dateFormat="yyyy년 MM월 dd일"
              selected={eventEndDate}
              onChange={(date: Date) => setEventEndDate(date)}
              selectsEnd
              startDate={eventStartDate}
              endDate={eventEndDate}
            />
          </InputContainer>
        </div>
        <InputContainer>
          <InputTitle>할인율</InputTitle>
          <EventRateInput
            type="text"
            value={eventRate}
            onChange={onChangeRate}
            onFocus={() => setEventRate('')}
          />
          %
        </InputContainer>
        <InputContainer>
          <InputTitle>메인 이미지</InputTitle>
          <input type="file" />
        </InputContainer>
        <InputContainer>
          <InputTitle>상세 이미지</InputTitle>
          <input type="file" />
        </InputContainer>

        <ButtonContainer>
          <Button>취소</Button>
          <Button className="add">추가</Button>
        </ButtonContainer>
      </ModalContainer>
    </MainModal>
  );
};

export default EventModal;
