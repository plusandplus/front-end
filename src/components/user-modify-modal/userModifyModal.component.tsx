import MainModal from '../main-modal/mainModal.component';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { selectIsUserModifyModalOpen } from '../../store/modules/modal/modal.select';
import { modalAction } from '../../store/modules/modal/modal.slice';
import {
  ErrorText,
  HeadText,
  InputBox,
  RadioBox,
  SelectBox,
  UserInputBox,
} from '../payment/payment.style';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { postUser, userData, userDetail } from '../../api/mypage';
import { selectAccessToken } from '../../store/modules/user/user.select';

export const UserModifyModalContainer = styled.div`
  padding: 20px;
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 10px;
`;

export const CancelButton = styled.div`
  height: 40px;
  background-color: transparent;
  line-height: 40px;
  color: #ff6969;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 14px;
`;

export const ConfirmButton = styled.div`
  height: 40px;
  background-color: transparent;
  color: #2196f3;
  line-height: 40px;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 14px;
`;

interface UserModifyModalProps {
  info: userData;
}

const UserModifyModal = ({ info }: UserModifyModalProps) => {
  const dispatch = useAppDispatch();
  const isUserModifyModalOpen = useAppSelector(selectIsUserModifyModalOpen);
  const accessToken = useAppSelector(selectAccessToken);

  const onCloseModal = () => {
    dispatch(modalAction.radioUserModifyModal());
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const radioRef = useRef<HTMLDivElement>(null);

  const [userInfo, setUserInfo] = useState<userData>(info);

  const [isNameError, setIsNameError] = useState<boolean>(
    userInfo.nickName.length < 1
  );
  const [isTelError, setIsTelError] = useState<boolean>(
    userInfo.phoneNumber.length < 1
  );

  const selectOptions = [
    { value: 0, text: '???????????? ???????????????' },
    { value: 20, text: '20???' },
    { value: 30, text: '30???' },
    { value: 40, text: '40???' },
    { value: 50, text: '50???' },
    { value: 60, text: '60??? ??????' },
  ];

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

    const postData: userDetail = {
      firstSign: true,
      nickName: userInfo.nickName,
      sex: userInfo.sex,
      phoneNumber: userInfo.phoneNumber,
      age: userInfo.age,
    };

    const res = postUser(postData, accessToken);
    dispatch(modalAction.radioUserModifyModal());
    window.location.href = '/mypage';
  };

  return (
    <MainModal isOpen={true} onClose={onCloseModal} title={'??????????????????'}>
      <UserModifyModalContainer>
        <HeadText>????????????*</HeadText>
        <UserInputBox>
          <span>????????? </span>
          <InputBox
            id="name"
            onChange={handleInputChange}
            value={userInfo.nickName}
            isErr={isNameError}
            placeholder="????????? ??????????????????"
            maxLength={10}
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
          {isTelError && <ErrorText>???????????? 11????????? ??????????????????</ErrorText>}
        </UserInputBox>
        <UserInputBox>
          <span>?????? </span>
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
          <RadioBox ref={radioRef}>
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
        <ButtonWrap>
          <CancelButton onClick={onCloseModal}>??????</CancelButton>
          <ConfirmButton onClick={handleCompleteModalOpen}>??????</ConfirmButton>
        </ButtonWrap>
      </UserModifyModalContainer>
    </MainModal>
  );
};

export default UserModifyModal;
