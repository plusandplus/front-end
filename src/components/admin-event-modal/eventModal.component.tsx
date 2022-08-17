import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import {
  postEvent,
  postEventImage,
  patchEvent,
} from '../../api/admin-event/admin-event';
import { dateFormatting } from '../../utils/dateFormatting';
import { ko } from 'date-fns/esm/locale';
import { modalAction } from '../../store/modules/modal/modal.slice';
import { selectIsAdminEventModalOpen } from '../../store/modules/modal/modal.select';
import MainModal from '../main-modal/mainModal.component';
import {
  ModalContainer,
  InputContainer,
  EventInput,
  InputTitle,
  InputFile,
  EventDatePicker,
  EventRateInput,
  ButtonContainer,
  Button,
  ImagesContainer,
  WarningMessage,
} from './eventModal.style';

interface PropType {
  oldData: {
    name: string;
    rate: number | string;
    id: number;
    start_date: Date;
    end_date: Date;
    image: string;
    detailImage: string;
  };
  modalState: string;
}

const EventModal = (prop: PropType): JSX.Element => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { name, rate, id, start_date, end_date, image, detailImage } =
    prop.oldData;
  const modalState = prop.modalState;

  const isAdminEventModalOpen = useAppSelector(selectIsAdminEventModalOpen);

  const [eventName, setEventName] = useState(modalState === 'add' ? '' : name);
  const [eventStartDate, setEventStartDate] = useState(
    modalState === 'add' ? new Date() : new Date(start_date)
  );
  const [eventEndDate, setEventEndDate] = useState(
    modalState === 'add' ? new Date() : new Date(end_date)
  );
  const [eventRate, setEventRate] = useState<number | string>(
    modalState === 'add' ? '' : rate
  );

  const [mainImageValue, setMainImageValue] = useState();
  const [detailImageValue, setDetailImageValue] = useState();
  const [mainImageSrc, setMainImageSrc] = useState(
    modalState === 'add' ? '' : image
  );
  const [detailImageSrc, setDetailImageSrc] = useState(
    modalState === 'add' ? '' : detailImage
  );

  // 폼 유효성 검사를 위한 state
  const [isNameValidate, setIsNameValidate] = useState(true);
  const [isRateValidate, setIsRateValidate] = useState(true);
  const [isMainImageValidate, setIsMainImageValidate] = useState(true);
  const [isDetailImageValidate, setIsDetailImageValidate] = useState(true);

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

  // 이미지 미리보기
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

  // 이미지 선택시 실행되는 onChange 함수
  const onChangeImage = (e: any, imageDivision: string) => {
    const file = e.target.files[0];
    setMainImageValue(file);
    encodeFileToBase64(file, imageDivision);

    if (imageDivision === 'main') {
      setMainImageValue(file);
      setIsMainImageValidate(true);
    } else if (imageDivision === 'detail') {
      setDetailImageValue(file);
      setIsDetailImageValidate(true);
    }
  };

  // 서버로 이미지 전송하고 s3 이미지 주소 받음
  const uploadImage = async () => {
    const formData = new FormData();
    if (mainImageValue) formData.append('files', mainImageValue);
    if (detailImageValue) formData.append('files', detailImageValue);

    const data = await postEventImage(formData);
    return data.data;
  };

  const eventAddMutate = useMutation(postEvent, {
    onSuccess: (data) => {
      console.log(data);
      alert('이벤트를 추가했습니다.');
      closeModal();
      queryClient.invalidateQueries(['getAllEvents']);
    },
  });

  const eventEditMutate = useMutation(patchEvent, {
    onSuccess: (data) => {
      alert('이벤트를 수정했습니다.');
      closeModal();
      queryClient.invalidateQueries(['getAllEvents']);
    },
    onError: (error) => {
      console.log('error: ', error);
    },
  });

  // 이벤트 추가 or 수정
  const clickAddEvent = async () => {
    // 폼 유효성 검사
    if (!eventName) {
      setIsNameValidate(false);
      return;
    }
    if (!eventRate) {
      setIsRateValidate(false);
      return;
    }
    if (!mainImageSrc) {
      setIsMainImageValidate(false);
      return;
    }
    if (!detailImageSrc) {
      setIsDetailImageValidate(false);
      return;
    }

    const imageS3Address = await uploadImage();

    const postEventData = {
      name: eventName,
      start_date: dateFormatting(eventStartDate),
      end_date: dateFormatting(eventEndDate),
      rate: eventRate as number,
      image: imageS3Address[0] as string,
      detailImage: imageS3Address[1] as string,
    };

    const editEventData = {
      data: {
        name: eventName,
        start_date: dateFormatting(eventStartDate),
        end_date: dateFormatting(eventEndDate),
        rate: eventRate as number,
        image: imageS3Address[0] as string,
        detailImage: imageS3Address[1] as string,
      },
      eventId: id,
    };

    if (modalState === 'add') eventAddMutate.mutate(postEventData);
    else if (modalState === 'edit') eventEditMutate.mutate(editEventData);
  };

  return (
    <MainModal
      isOpen={isAdminEventModalOpen}
      onClose={closeModal}
      title={modalState === 'add' ? '이벤트 추가하기' : '이벤트 수정하기'}
      contentWidth={750}
    >
      <div>
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
                value={eventName}
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
              <InputTitle>메인 이미지</InputTitle>
              <InputFile
                type="file"
                onChange={(e) => onChangeImage(e, 'main')}
              />
              <div className="preview">
                {mainImageSrc && (
                  <img
                    src={mainImageSrc}
                    alt="preview-img"
                    style={{ width: 200 }}
                  />
                )}
              </div>
              {!isMainImageValidate && (
                <WarningMessage>
                  이벤트 메인 이미지를 선택해주세요.
                </WarningMessage>
              )}
            </div>
            <div>
              <InputTitle>상세 이미지</InputTitle>
              <InputFile
                type="file"
                onChange={(e) => onChangeImage(e, 'detail')}
              />
              <div className="preview">
                {detailImageSrc && (
                  <img
                    src={detailImageSrc}
                    alt="preview-img"
                    style={{ width: 200 }}
                  />
                )}
              </div>
              {!isDetailImageValidate && (
                <WarningMessage>
                  이벤트 상세 이미지를 선택해주세요.
                </WarningMessage>
              )}
            </div>
          </ImagesContainer>
        </ModalContainer>
        <ButtonContainer>
          <Button onClick={closeModal}>취소</Button>
          <Button className="add" onClick={clickAddEvent}>
            {modalState === 'add' ? '추가' : '수정'}
          </Button>
        </ButtonContainer>
      </div>
    </MainModal>
  );
};

export default EventModal;
