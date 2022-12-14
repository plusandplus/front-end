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
import {formatDate, formatDateInSearch, getDateDiff} from '../../utils/calendar';
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
  { value: 0, text: '???????????? ???????????????' },
  { value: 20, text: '20???' },
  { value: 30, text: '30???' },
  { value: 40, text: '40???' },
  { value: 50, text: '50???' },
  { value: 60, text: '60??? ??????' },
];

export const Payment = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const nameRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const accessToken = useAppSelector(selectAccessToken);

  // ?????? ?????? ???????????? ??????????????? ??????????????????.
  const state = location.state as paymentProps;

  const isPaymentCompleteModalOpen = useAppSelector(
    selectIsPaymentCompleteModalOpen
  );

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
  }, []);

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
    // ????????? ??????????????? ?????? ????????? ??????

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
      SpecialRequest: '???????????????.',
      stationId: state.station_id.id,
      userId: userInfo.id,
      roomId: state.id,
      eventId: 1,
    };
   const checkDate = new Date(state.checkOutDate[0],state.checkOutDate[1],state.checkOutDate[2]-1)
    const responseRoomIsPossible = getRoomDate(
      state.id,
      postData.startDate,
      formatDateInSearch([checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate()])
    );

    responseRoomIsPossible.then((res) => {
      const data = res.data.find((item: IRoomBooking) => item.isOrdered);
      if (data !== undefined) {
        dispatch(modalAction.radioErrorModal());
      } else {
        //????????? ?????? ????????? ??? ????????? ????????
        const res1 = postUser(updateUser, accessToken);
        res1.then((result) => console.log('??????????????? ?????????????????????.'));

        const res2 = postOrder(postData, accessToken);
        res2.then((res) => console.log('?????? ??????'));
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
                  <span>????????? ???????????? ???????????????72?????? 35 </span>
                </LocationBox>
                <MapIcon />
              </TitleBox>

              <CheckInOutBox>
                <CheckInBox>
                  <CheckInOutText>????????? ??????</CheckInOutText>
                  <DateText>{formatDate(state.checkInDate)}</DateText>
                  <CheckInTimeText>
                    {state.checkin_time ? state.checkin_time : '15:00'}
                  </CheckInTimeText>
                </CheckInBox>
                <CheckOutBox>
                  <CheckInOutText>???????????? ??????</CheckInOutText>{' '}
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
            <HeadText>????????? ??????*</HeadText>
            <UserInputBox>
              <span>????????? </span>
              <InputBox
                id="name"
                onChange={handleInputChange}
                value={userInfo.nickName}
                isErr={isNameError}
                maxLength={10}
                placeholder="????????? ??????????????????"
                type="text"
                ref={nameRef}
              />
              {isNameError && <ErrorText>????????? ??????????????????</ErrorText>}
            </UserInputBox>

            <UserInputBox>
              <span>???????????? </span>
              <InputBox
                id="phoneNumber"
                isErr={isTelError}
                maxLength={11}
                value={userInfo.phoneNumber}
                placeholder="-??? ?????? ???????????????"
                type="text"
                onChange={handleUserTel}
                ref={telRef}
              />
              {isTelError && (
                <ErrorText>???????????? 11????????? ??????????????????</ErrorText>
              )}
            </UserInputBox>
            <UserInputBox>
              <span>??????</span>
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
              <span>?????? </span>
              <RadioBox>
                <input
                  type="radio"
                  id="man"
                  name="man"
                  value={1}
                  checked={userInfo.sex === 'MALE'}
                  onChange={handleClickRadioButton}
                />
                <label>??????</label>
                <input
                  type="radio"
                  id="woman"
                  name="woman"
                  value={2}
                  checked={userInfo.sex === 'FEMALE'}
                  onChange={handleClickRadioButton}
                />
                <label>??????</label>
              </RadioBox>
            </UserInputBox>
          </UserInfoBox>
          <PaymentInfoBox>
            <HeadText>?????? ??? ?????? ??????*</HeadText>
            <PaymentPriceBox>
              <PaymentPriceText>??? ?????? ??????</PaymentPriceText>
              <SalePrice> {(state.price * getDateDiff(state.checkInDate, state.checkOutDate)).toLocaleString()}???</SalePrice>
            </PaymentPriceBox>
            <PaymentEventBox>
              <PaymentPriceText>???????????? ?????????</PaymentPriceText>
              <EventInfo>
                {state.station_id.event_id
                  ? state.station_id.event_id.name
                  : '??????'}
              </EventInfo>
            </PaymentEventBox>
            <PaymentEventBox>
              <PaymentPriceText>?????????</PaymentPriceText>
              <EventRate>
                {state.station_id.event_id
                  ? `${state.station_id.event_id.rate}%`
                  : ''}

              </EventRate>
            </PaymentEventBox>
            <Line />
            <PaymentPriceBox>
              <PaymentPriceText>?????? ??????</PaymentPriceText>
              <TotalPrice>
                {state.station_id.event_id
                    ? (
                        state.price *
                        (1 - state.station_id.event_id.rate / 100) *
                        getDateDiff(state.checkInDate,state.checkOutDate)
                    ).toLocaleString()
                    : (
                        state.price * getDateDiff(state.checkInDate,state.checkOutDate)
                    ).toLocaleString()}
                ???

              </TotalPrice>
            </PaymentPriceBox>
          </PaymentInfoBox>
          <PaymentButton onClick={handleCompleteModalOpen}>
            {state.station_id.event_id
              ? (
                  state.price *
                  (1 - state.station_id.event_id.rate / 100) * getDateDiff(state.checkInDate,state.checkOutDate)
                ).toLocaleString()
              : (
                    state.price * getDateDiff(state.checkInDate,state.checkOutDate)
                ).toLocaleString()}
            ??? ????????????
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
          title={'????????? ?????????????????????'}
          content={`?????? ?????????????????? ????????? ?????????????????????. 
          \n?????????????????? ???????????????.`}
        />
      )}
    </StyledContainer>
  );
};

export default Payment;
