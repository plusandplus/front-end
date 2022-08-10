import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { formatDate } from '../../utils/calendar';
import { getRoom } from '../../api/stay';

import { modalAction } from '../../store/modules/modal/modal.slice';
import { selectIsCalendarModalOpen } from '../../store/modules/modal/modal.select';
import { selectRoomData } from '../../store/modules/stay/stay.select';
import {
  selectCalendarReducerCheckOut,
  selectCalendarReducerSetCheckIn,
} from '../../store/modules/calendar/calendar.select';

import CalendarModal from '../../components/calendar-modal/calendarModal.component';
import Header from '../../components/header/header.component';
import { StyledContainer } from '../../components/payment/payment.component';

import {
  DescriptionRoomContainer,
  CalendarBox,
  DescriptionName,
  SelectCalendarText,
  RoomHeadBox,
  RoomInFormationText,
  RoomName,
  PriceBox,
  CheckInDate,
  CheckOutDate,
  RoomImg,
  PaymentButton,
  ContentBox,
  AminitiesUl,
  AminitiesLi,
} from './roomDescription.style';
import { roomData } from '../../api/payment';

import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { GiCoffeePot, GiWashingMachine, GiWineBottle } from 'react-icons/gi';
import { BsSpeakerFill } from 'react-icons/bs';
import { FaPumpSoap } from 'react-icons/fa';
import { calendarAction } from '../../store/modules/calendar/calendar.slice';

export interface paymentProps extends roomData {
  checkInDate: number[];
  checkOutDate: number[];
}

const RoomDescription = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const dateRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const isCalendarModalOpen = useAppSelector(selectIsCalendarModalOpen);
  const checkInDate = useAppSelector(selectCalendarReducerSetCheckIn);
  const checkOutDate = useAppSelector(selectCalendarReducerCheckOut);

  const roomData = useAppSelector(selectRoomData);

  const handleOnClickCalender = () => {
    dispatch(modalAction.setCalendarModal());
  };

  const handleOnClickPayment = () => {
    if (
      (checkInDate === undefined || checkOutDate === undefined) &&
      dateRef.current
    ) {
    } else {
      if (checkInDate !== undefined && checkOutDate !== undefined) {
        const newData = {
          ...roomData,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
        };
        navigate('/payment', { state: newData });
      }
    }
  };

  const ROOM_ID = Number(location.pathname.split('/')[3]);

  useEffect(() => {
    dispatch(calendarAction.setCheckOutDate(undefined));
    dispatch(calendarAction.setCheckInDate(undefined));
    const fetchData = async () => {
      await dispatch(getRoom(ROOM_ID));
    };

    fetchData();
  }, [dispatch, ROOM_ID]);

  const amenities_list = [
    {
      icon: <CgSmartHomeRefrigerator />,
      name: '냉장고',
    },
    {
      icon: <GiCoffeePot />,
      name: '커피포트',
    },
    {
      icon: <GiWashingMachine />,
      name: '세탁기',
    },
    { icon: <BsSpeakerFill />, name: '스피커' },
    { icon: <FaPumpSoap />, name: '샴푸' },
    { icon: <GiWineBottle />, name: '와인잔' },
  ];

  return (
    <StyledContainer>
      <DescriptionRoomContainer>
        <Header></Header>
        <CalendarBox>
          <RoomInFormationText>예약 정보</RoomInFormationText>
          <DescriptionName>{roomData.station_id.name}</DescriptionName>
          <SelectCalendarText ref={dateRef} onClick={handleOnClickCalender}>
            <span>
              {checkInDate !== undefined
                ? checkOutDate === undefined
                  ? '체크아웃 날짜를 입력해주세요'
                  : `체크인 ${formatDate(checkInDate)} | 체크아웃 ${formatDate(
                      checkOutDate
                    )}`
                : '날짜를 선택해주세요.'}
            </span>
          </SelectCalendarText>
          <CheckInDate ref={dateRef}>
            체크인: <span>{roomData.checkin_time}</span>
          </CheckInDate>
          <CheckOutDate>
            체크아웃: <span>{roomData.checkout_time}</span>
          </CheckOutDate>
        </CalendarBox>
        <RoomHeadBox>
          <RoomInFormationText>룸 정보</RoomInFormationText>
          <RoomName>{roomData.name}</RoomName>
          <PriceBox>
            <span>₩ {roomData.price.toLocaleString()} / 1박</span>
          </PriceBox>
          <RoomImg src={roomData.image} />
          <ContentBox>{roomData.content}</ContentBox>

          <RoomInFormationText className="amenities">
            AMENITIES
          </RoomInFormationText>
          <AminitiesUl>
            {amenities_list.map((el, index) => {
              return (
                <AminitiesLi key={index}>
                  {el.icon}
                  <span>{el.name}</span>
                </AminitiesLi>
              );
            })}
          </AminitiesUl>
        </RoomHeadBox>

        <PaymentButton onClick={handleOnClickPayment}>결제하기</PaymentButton>
      </DescriptionRoomContainer>
      {isCalendarModalOpen && <CalendarModal roomId={ROOM_ID} />}
    </StyledContainer>
  );
};

export default RoomDescription;
