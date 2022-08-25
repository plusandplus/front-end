import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { modalAction } from '../../store/modules/modal/modal.slice';
import {
  getOneEvent,
  getAllEvents,
  deleteEvent,
} from '../../api/admin-event/admin-event';
import {
  GetOneEventSuccessResponse,
  GetAllEventsSuccessResponse,
} from '../../api/admin-event/admin-event.type';
import { selectIsAdminEventModalOpen } from '../../store/modules/modal/modal.select';
import { compareDates } from '../../utils/compareDates';
import EventModal from '../../components/admin-event-modal/eventModal.component';
import {
  Container,
  AddButton,
  MainContents,
  Title,
  AllEventContainer,
  EventImageContainer,
  EventImage,
  EventContainer,
  EventName,
  EventPeriod,
  HandelEventButtonContainer,
  HandelEventButton,
} from './adminEvent.style';

const AdminEvent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const [eventsInProgress, setEventsInProgress] = useState<
    GetOneEventSuccessResponse[]
  >([]);
  const [endedEvents, setEndedEvents] = useState<GetOneEventSuccessResponse[]>(
    []
  );
  const isAdminEventModalOpen = useAppSelector(selectIsAdminEventModalOpen);
  const [modalState, setModalState] = useState('add');

  const [oldData, setOldData] = useState({
    name: '',
    rate: 0,
    id: 0,
    start_date: new Date(),
    end_date: new Date(),
    image: '',
    detailImage: '',
  });

  useQuery<GetAllEventsSuccessResponse>(['getAllEvents'], getAllEvents, {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      const eventsInProgress = data.data.filter((el) =>
        compareDates(el.end_date)
      );
      setEventsInProgress(eventsInProgress);

      const endedEvents = data.data.filter((el) => !compareDates(el.end_date));
      setEndedEvents(endedEvents);
    },
  });

  const eventDeleteMutate = useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAllEvents']);
      queryClient.invalidateQueries(['allEvents']);
      alert('이벤트를 삭제했습니다.');
    },
  });

  const OpenModal = () => {
    setModalState(() => {
      return 'add';
    });
    dispatch(modalAction.radioAdminEventModal());
  };

  const clickDeleteEvent = (eventId: number) => {
    if (!window.confirm('해당 이벤트를 정말로 삭제하시겠습니까?')) return;
    eventDeleteMutate.mutate(eventId);
  };

  const clickEditEvent = async (eventId: number) => {
    const data = await getOneEvent(eventId);
    setOldData((prev) => {
      return {
        ...prev,
        ...data.data,
      };
    });
    setModalState(() => {
      return 'edit';
    });
    setTimeout(() => {
      dispatch(modalAction.radioAdminEventModal());
    }, 50);
  };

  return (
    <Container>
      <AddButton onClick={OpenModal}>이벤트 추가하기</AddButton>

      <MainContents>
        <Title>현재 진행중인 이벤트</Title>
        <AllEventContainer>
          {eventsInProgress.map((el) => {
            return (
              <EventContainer key={el.id}>
                <HandelEventButtonContainer>
                  <HandelEventButton onClick={() => clickEditEvent(el.id)}>
                    수정
                  </HandelEventButton>
                  <HandelEventButton onClick={() => clickDeleteEvent(el.id)}>
                    삭제
                  </HandelEventButton>
                </HandelEventButtonContainer>
                <EventImageContainer>
                  <EventImage src={el.image} alt="이벤트 이미지" />
                </EventImageContainer>
                <EventName>{el.name}</EventName>
                <EventPeriod>{`${el.start_date} ~ ${el.end_date}`}</EventPeriod>
              </EventContainer>
            );
          })}
        </AllEventContainer>
      </MainContents>

      <MainContents>
        <Title>종료된 이벤트</Title>
        <AllEventContainer>
          {endedEvents.map((el) => {
            return (
              <EventContainer key={el.id}>
                <HandelEventButtonContainer>
                  <HandelEventButton onClick={() => clickDeleteEvent(el.id)}>
                    삭제
                  </HandelEventButton>
                </HandelEventButtonContainer>
                <EventImageContainer>
                  <EventImage
                    src={el.image}
                    alt="이벤트 이미지"
                    className="end"
                  />
                </EventImageContainer>

                <EventName className="end">{el.name}</EventName>
                <EventPeriod className="end">{`${el.start_date} ~ ${el.end_date}`}</EventPeriod>
              </EventContainer>
            );
          })}
        </AllEventContainer>
      </MainContents>
      {isAdminEventModalOpen && (
        <EventModal oldData={oldData} modalState={modalState} />
      )}
    </Container>
  );
};

export default AdminEvent;
