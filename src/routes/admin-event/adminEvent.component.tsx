import { useState, useCallback, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { modalAction } from '../../store/modules/modal/modal.slice';
import {
  getAllEvents,
  getOneEvent,
  deleteEvent,
} from '../../api/admin-event/admin-event';
import {
  GetOneEventSuccessResponse,
  GetAllEventsSuccessResponse,
} from '../../api/admin-event/admin-event.type';
import { selectIsAdminEventModalOpen } from '../../store/modules/modal/modal.select';
import EventModal from '../../components/admin-event-modal/eventModal.component';
import {
  Container,
  AddButton,
  MainContents,
  Title,
  AllEventContainer,
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

  const getTodayDate = useCallback(() => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    let todayDate = `${year}-${month < 10 ? `0${month}` : month}-${
      date < 10 ? `0${date}` : date
    }`;

    return todayDate;
  }, []);

  const isEndedEvent = (todayDate: string, eventEndDate: string) => {
    return todayDate > eventEndDate;
  };

  useQuery<GetAllEventsSuccessResponse>(['getAllEvents'], getAllEvents, {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      const today = getTodayDate();

      const eventsInProgress = data.data.filter(
        (el) => !isEndedEvent(today, el.end_date)
      );
      setEventsInProgress(eventsInProgress);

      const endedEvents = data.data.filter((el) =>
        isEndedEvent(today, el.end_date)
      );
      setEndedEvents(endedEvents);
    },
  });

  const eventDeleteMutate = useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getAllEvents']);
    },
  });

  const OpenModal = () => {
    dispatch(modalAction.radioAdminEventModal());
  };

  const clickDeleteEvent = (eventId: number) => {
    if (!window.confirm('해당 이벤트를 정말로 삭제하시겠습니까?')) return;
    eventDeleteMutate.mutate(eventId);
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
                  <HandelEventButton>수정</HandelEventButton>
                  <HandelEventButton onClick={() => clickDeleteEvent(el.id)}>
                    삭제
                  </HandelEventButton>
                </HandelEventButtonContainer>
                <EventImage src={el.image} alt="이벤트 이미지" />
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
                <div>
                  <EventImage
                    src={el.image}
                    alt="이벤트 이미지"
                    className="end"
                  />
                  <EventName className="end">{el.name}</EventName>
                  <EventPeriod className="end">{`${el.start_date} ~ ${el.end_date}`}</EventPeriod>
                </div>
              </EventContainer>
            );
          })}
        </AllEventContainer>
      </MainContents>
      {isAdminEventModalOpen && <EventModal />}
    </Container>
  );
};

export default AdminEvent;
