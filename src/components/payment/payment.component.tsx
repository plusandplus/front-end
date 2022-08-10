import { ContainerStyle } from '../container/container.component';
import Header from '../header/header.component';
import { MdOutlineLocationOn } from 'react-icons/md';
import { LocationBox } from '../wishlist-Item/wishlitsitem.style';
import { useEffect, useRef, useState } from 'react';
import {
  CheckInBox,
  CheckInOutBox,
  CheckInOutText,
  CheckInTimeText,
  CheckOutBox,
  CheckOutTimeText,
  DateText,
  ErrorText,
  EventInfo,
  EventRate,
  HeadText,
  ImgBox,
  InfoBox,
  InfoTitle,
  InputBox,
  Line,
  MapIcon,
  OrderInfoBox,
  PaymentButton,
  PaymentEventBox,
  PaymentInfoBox,
  PaymentPriceBox,
  PaymentPriceText,
  PaymentWrapper,
  RadioBox,
  SalePrice,
  SelectBox,
  TitleBox,
  TotalPrice,
  UserInfoBox,
  UserInputBox,
} from './payment.style';
import styled from 'styled-components';
import CompletePaymentModal from '../complete-payment-modal/CompletePaymentModal.component';
import { modalAction } from '../../store/modules/modal/modal.slice';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import {
  selectIsErrorModalOpen,
  selectIsPaymentCompleteModalOpen,
} from '../../store/modules/modal/modal.select';
import {
  formatDate,
  formatDateInSearch,
  getDateDiff,
} from '../../utils/calendar';
import { useLocation } from 'react-router-dom';
import { postOrder, postOrderProps } from '../../api/payment';
import {
  getUser,
  InitialData,
  postUser,
  userData,
  userDetail,
} from '../../api/mypage';
import { selectAccessToken } from '../../store/modules/user/user.select';
import { paymentProps } from '../../routes/room-description/roomDescription.component';
import { calendarAction } from '../../store/modules/calendar/calendar.slice';
import ErrorModal from '../error-modal/errorModal.component';
import { getRoomDate } from '../../api/calendar';
import { IRoomBooking } from '../calendar-modal/calendarModal.component';

export const StyledContainer = styled(ContainerStyle)`
  background-color: #fafafa;
  margin-bottom: 60px;
`;

const selectOptions = [
  { value: 0, text: '나이대를 선택하세요' },
  { value: 20, text: '20대' },
  { value: 30, text: '30대' },
  { value: 40, text: '40대' },
  { value: 50, text: '50대' },
  { value: 60, text: '60대 이상' },
];

export const Payment = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const nameRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const accessToken = useAppSelector(selectAccessToken);

  // 룸에 대한 데이터를 명시적으로 표현해주었다.
  const state = location.state as paymentProps;

  const isPaymentCompleteModalOpen = useAppSelector(
    selectIsPaymentCompleteModalOpen
  );

  const VALIDTIME = 10;
  const time = useRef<number>(VALIDTIME);

  let intervalRef: { current: NodeJS.Timeout | null } = useRef(null);

  const [min, setMin] = useState(10);
  const [sec, setSec] = useState(0);

  const isErrorModalOpen = useAppSelector(selectIsErrorModalOpen);
  const [userInfo, setUserInfo] = useState<userData>(InitialData);

  useEffect(() => {
    if (!state || !accessToken) {
      dispatch(modalAction.radioErrorModal());
    }

    const user = getUser(accessToken);
    user.then((res) => {
      setUserInfo(res.data.user);
      setIsNameError(res.data.user.nickName.length < 1);
      setIsTelError(res.data.user.phoneNumber.length < 1);
    });

    intervalRef.current = setInterval(decreaseNum, 1000);
    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      console.log('unmount api 요청');
    };
  }, []);

  useEffect(() => {
    console.log(min, sec);
    if (time.current <= 0) {
      console.log('api호출');
      // 시간이 초과되면 clearInterval 해줌
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
  }, [sec]);

  const timerReset = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
    time.current = VALIDTIME;
    setMin(Math.floor(VALIDTIME / 60));
    setSec(VALIDTIME % 60);
  };

  const decreaseNum = () => {
    time.current -= 1; // 1초씩 감소

    setMin(Math.floor(time.current / 60)); //useState로 분, 시를 계속 업데이트 쳐준다
    setSec(time.current % 60);
  };

  const [isNameError, setIsNameError] = useState<boolean>(false);
  const [isTelError, setIsTelError] = useState<boolean>(false);

  const handleClickRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      sex: Number(e.target.value) === 1 ? 'MALE' : 'FEMALE',
    });
  };

  const handleUserTel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9]{0,13}$/;
    if (e.target.value.length < 10) {
      setIsTelError(true);
    } else setIsTelError(false);

    if (regex.test(e.target.value)) {
      setUserInfo({
        ...userInfo,
        phoneNumber: e.target.value,
      });
    }
  };

  const handleChangeSelectBox = (e: any) => {
    setUserInfo({
      ...userInfo,
      age: Number(e.target.value),
    });
  };

  const handleInputChange = (e: any) => {
    if (e.target.value.length < 1) {
      setIsNameError(true);
    } else setIsNameError(false);

    setUserInfo({
      ...userInfo,
      nickName: e.target.value,
    });
  };

  const handleCompleteModalOpen = () => {
    if (isNameError && nameRef.current) {
      nameRef.current.focus();
      return;
    } else if (isTelError && telRef.current) {
      telRef.current.focus();
      return;
    } else if (userInfo.age === 0 && selectRef.current) {
      selectRef.current.focus();
      return;
    }
    // 처음에 개인정보를 입력 안했을 경우

    const updateUser: userDetail = {
      firstSign: true,
      nickName: userInfo.nickName,
      sex: userInfo.sex,
      phoneNumber: userInfo.phoneNumber,
      age: userInfo.age,
    };

    const postData: postOrderProps = {
      startDate: formatDateInSearch(state.checkInDate),
      endDate: formatDateInSearch(state.checkOutDate),
      price: state.station_id.event_id
        ? state.price * (1 - state.station_id.event_id.rate / 100)
        : state.price,
      SpecialRequest: '감사합니다.',
      stationId: state.station_id.id,
      userId: userInfo.id,
      roomId: state.id,
      eventId: 1,
    };
    const checkDate = new Date(
      state.checkOutDate[0],
      state.checkOutDate[1],
      state.checkOutDate[2] - 1
    );
    const responseRoomIsPossible = getRoomDate(
      state.id,
      postData.startDate,
      formatDateInSearch([
        checkDate.getFullYear(),
        checkDate.getMonth(),
        checkDate.getDate(),
      ])
    );

    responseRoomIsPossible.then((res) => {
      const data = res.data.find((item: IRoomBooking) => item.isOrdered);
      if (data !== undefined) {
        dispatch(modalAction.radioErrorModal());
      } else {
        //정보를 매번 수정해 줄 필요가 있나??
        const res1 = postUser(updateUser, accessToken);
        res1.then((result) => console.log('업데이트가 완료되었습니다.'));

        const res2 = postOrder(postData, accessToken);
        res2.then((res) => console.log('주문 완료'));
        dispatch(calendarAction.setCheckInDate(undefined));
        dispatch(calendarAction.setCheckOutDate(undefined));
        dispatch(modalAction.radioPaymentCompleteModal());
      }
    });
  };

  return (
    <StyledContainer>
      {userInfo && state && (
        <PaymentWrapper>
          <Header />
          <OrderInfoBox>
            <ImgBox>
              <img src={state.image} />
            </ImgBox>
            <InfoBox>
              <TitleBox>
                <InfoTitle>
                  {state.station_id.name}({state.name})
                </InfoTitle>
                <LocationBox>
                  <MdOutlineLocationOn />
                  <span>제주도 서귀포시 중문관광로72번길 35 </span>
                </LocationBox>
                <MapIcon />
              </TitleBox>

              <CheckInOutBox>
                <CheckInBox>
                  <CheckInOutText>체크인 날짜</CheckInOutText>
                  <DateText>{formatDate(state.checkInDate)}</DateText>
                  <CheckInTimeText>
                    {state.checkin_time ? state.checkin_time : '15:00'}
                  </CheckInTimeText>
                </CheckInBox>
                <CheckOutBox>
                  <CheckInOutText>체크아웃 날짜</CheckInOutText>{' '}
                  <DateText>{formatDate(state.checkOutDate)}</DateText>
                  <CheckOutTimeText>
                    {state.checkout_time ? state.checkout_time : '11:00'}
                  </CheckOutTimeText>
                </CheckOutBox>
                <Line />
              </CheckInOutBox>
            </InfoBox>
          </OrderInfoBox>
          <UserInfoBox>
            <HeadText>예약자 정보*</HeadText>
            <UserInputBox>
              <span>예약자 </span>
              <InputBox
                id="name"
                onChange={handleInputChange}
                value={userInfo.nickName}
                isErr={isNameError}
                maxLength={10}
                placeholder="성명을 입력해주세요"
                type="text"
                ref={nameRef}
              />
              {isNameError && <ErrorText>성명을 입력해주세요</ErrorText>}
            </UserInputBox>

            <UserInputBox>
              <span>전화번호 </span>
              <InputBox
                id="phoneNumber"
                isErr={isTelError}
                maxLength={11}
                value={userInfo.phoneNumber}
                placeholder="-를 뺴고 입력하세요"
                type="text"
                onChange={handleUserTel}
                ref={telRef}
              />
              {isTelError && (
                <ErrorText>전화번호 11자리를 입력해주세요</ErrorText>
              )}
            </UserInputBox>
            <UserInputBox>
              <span>나이</span>
              <SelectBox
                value={userInfo.age}
                onChange={handleChangeSelectBox}
                ref={selectRef}
              >
                {selectOptions.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </SelectBox>
            </UserInputBox>
            <UserInputBox>
              <span>성별 </span>
              <RadioBox>
                <input
                  type="radio"
                  id="man"
                  name="man"
                  value={1}
                  checked={userInfo.sex === 'MALE'}
                  onChange={handleClickRadioButton}
                />
                <label>남성</label>
                <input
                  type="radio"
                  id="woman"
                  name="woman"
                  value={2}
                  checked={userInfo.sex === 'FEMALE'}
                  onChange={handleClickRadioButton}
                />
                <label>여성</label>
              </RadioBox>
            </UserInputBox>
          </UserInfoBox>
          <PaymentInfoBox>
            <HeadText>금액 및 할인 정보*</HeadText>
            <PaymentPriceBox>
              <PaymentPriceText>총 예약 금액</PaymentPriceText>
              <SalePrice>
                {' '}
                {(
                  state.price *
                  getDateDiff(state.checkInDate, state.checkOutDate)
                ).toLocaleString()}
                원
              </SalePrice>
            </PaymentPriceBox>
            <PaymentEventBox>
              <PaymentPriceText>적용가능 이벤트</PaymentPriceText>
              <EventInfo>
                {state.station_id.event_id
                  ? state.station_id.event_id.name
                  : '없음'}
              </EventInfo>
            </PaymentEventBox>
            <PaymentEventBox>
              <PaymentPriceText>할인률</PaymentPriceText>
              <EventRate>
                {state.station_id.event_id
                  ? `${state.station_id.event_id.rate}%`
                  : ''}
              </EventRate>
            </PaymentEventBox>
            <Line />
            <PaymentPriceBox>
              <PaymentPriceText>결제 금액</PaymentPriceText>
              <TotalPrice>
                {state.station_id.event_id
                  ? (
                      state.price *
                      (1 - state.station_id.event_id.rate / 100) *
                      getDateDiff(state.checkInDate, state.checkOutDate)
                    ).toLocaleString()
                  : (
                      state.price *
                      getDateDiff(state.checkInDate, state.checkOutDate)
                    ).toLocaleString()}
                원
              </TotalPrice>
            </PaymentPriceBox>
          </PaymentInfoBox>
          <PaymentButton onClick={handleCompleteModalOpen}>
            {state.station_id.event_id
              ? (
                  state.price *
                  (1 - state.station_id.event_id.rate / 100) *
                  getDateDiff(state.checkInDate, state.checkOutDate)
                ).toLocaleString()
              : (
                  state.price *
                  getDateDiff(state.checkInDate, state.checkOutDate)
                ).toLocaleString()}
            원 결제하기
          </PaymentButton>
        </PaymentWrapper>
      )}
      {isPaymentCompleteModalOpen && (
        <CompletePaymentModal
          checkInDate={formatDate(state.checkInDate)}
          checkOutDate={formatDate(state.checkOutDate)}
          nickName={userInfo.nickName}
          x={state.station_id.x}
          y={state.station_id.y}
          phoneNumber={userInfo.phoneNumber}
          stationName={state.station_id.name}
          roomName={state.name}
        />
      )}
      {isErrorModalOpen && (
        <ErrorModal
          title={'잘못된 접근방식입니다'}
          content={`방이 예약되었거나 잘못된 접근방식입니다. 
          \n메인페이지로 돌아갑니다.`}
        />
      )}
    </StyledContainer>
  );
};

export default Payment;
