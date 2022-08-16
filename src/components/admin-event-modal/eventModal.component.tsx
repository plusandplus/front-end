import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { ko } from 'date-fns/esm/locale';
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
  ImagesContainer,
  WarningMessageContainer,
  WarningMessage,
} from './eventModal.style';

const EventModal = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const isAdminEventModalOpen = useAppSelector(selectIsAdminEventModalOpen);

  const [eventName, setEventName] = useState('');
  const [isNameValidate, setIsNameValidate] = useState(true);

  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventEndDate, setEventEndDate] = useState(new Date());

  const [eventRate, setEventRate] = useState<number | string>(0);
  const [isRateValidate, setIsRateValidate] = useState(true);

  const [mainImageValue, setMainImageValue] = useState();
  const [detailImageValue, setDetailImageValue] = useState();
  const [mainImageSrc, setMainImageSrc] = useState('');
  const [detailImageSrc, setDetailImageSrc] = useState('');

  const [imagesS3Address, setImagesS3Address] = useState({
    main: '',
    detail: '',
  });

  const closeModal = () => {
    dispatch(modalAction.radioAdminEventModal());
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
    if (e.target.value) setIsNameValidate(true);
  };

  const onChangeRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rate = +e.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1');

    if (+rate > 100) {
      rate = 100;
    }
    setEventRate(+rate);

    if (e.target.value) setIsRateValidate(true);
  };

  const encodeFileToBase64 = (fileBlob: any, imageDivision: string) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        if (typeof reader.result === 'string')
          if (imageDivision === 'main') setMainImageSrc(reader.result);
          else if (imageDivision === 'detail') setDetailImageSrc(reader.result);
        resolve();
      };
    });
  };

  const onChangeImage = (e: any, imageDivision: string) => {
    const file = e.target.files[0];
    setMainImageValue(file);
    encodeFileToBase64(file, imageDivision);

    if (imageDivision === 'main') setMainImageValue(file);
    else if (imageDivision === 'detail') setDetailImageValue(file);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    if (mainImageValue) formData.append('files', mainImageValue);
    if (detailImageValue) formData.append('files', detailImageValue);

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/uploads`,
      formData
    );

    console.log('이미지..', response.data);
  };

  const clickAddEvent = () => {
    if (!eventName) {
      setIsNameValidate(false);
      return;
    }
    if (!eventRate) {
      setIsRateValidate(false);
      return;
    }
  };

  return (
    <MainModal
      isOpen={isAdminEventModalOpen}
      onClose={closeModal}
      title="이벤트 추가하기"
      contentWidth={750}
    >
      <ModalContainer>
        <InputContainer>
          <InputTitle>이벤트 이름</InputTitle>
          <div>
            <EventInput
              type="text"
              maxLength={15}
              onChange={onChangeName}
              placeholder="이벤트 이름을 입력하세요"
              className={!isNameValidate ? 'warning' : ''}
            />
            {!isNameValidate && (
              <WarningMessage>이벤트 이름을 입력해주세요.</WarningMessage>
            )}
          </div>
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
          <div>
            <EventRateInput
              type="text"
              value={eventRate}
              onChange={onChangeRate}
              onFocus={() => setEventRate('')}
              className={!isRateValidate ? 'warning' : ''}
            />
            %
            {!isRateValidate && (
              <WarningMessage>할인율을 입력해주세요.</WarningMessage>
            )}
          </div>
        </InputContainer>
        <ImagesContainer>
          <div>
            <InputContainer>
              <InputTitle>메인 이미지</InputTitle>
              <input type="file" onChange={(e) => onChangeImage(e, 'main')} />
            </InputContainer>
            <div className="preview">
              {mainImageSrc && (
                <img
                  src={mainImageSrc}
                  alt="preview-img"
                  style={{ width: 200 }}
                />
              )}
            </div>
          </div>
          <div>
            <InputContainer>
              <InputTitle>상세 이미지</InputTitle>
              <input type="file" onChange={(e) => onChangeImage(e, 'detail')} />
            </InputContainer>
            <div className="preview">
              {detailImageSrc && (
                <img
                  src={detailImageSrc}
                  alt="preview-img"
                  style={{ width: 200 }}
                />
              )}
            </div>
          </div>
        </ImagesContainer>

        <button onClick={uploadImage}>이미지 추가하기</button>
        <ButtonContainer>
          <Button onClick={closeModal}>취소</Button>
          <Button className="add" onClick={clickAddEvent}>
            추가
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </MainModal>
  );
};

export default EventModal;
