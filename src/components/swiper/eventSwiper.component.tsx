import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { getAllEvents } from '../../api/admin-event/admin-event';
import { compareDates } from '../../utils/compareDates';
import { ROUTES } from '../../routes/routes';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import {
  SwiperContainer,
  SlideContainer,
  SlideImage,
  SlideTitle,
  NavigationButtonContainer,
  NavigationButton,
  LinkEvent,
  SlideDescriptionContainer,
  StayDescription,
} from './swiper.style';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export interface GetAllEventsSuccessResponse {
  message: string;
  statusCode: number;
  data: EventsData[];
}

interface EventsData {
  id: number;
  name: string;
  image: string;
  detailImage: string;
  start_date: string;
  end_date: string;
  rate: number;
}

const EventSwiper = (): JSX.Element => {
  SwiperCore.use([Navigation, Pagination]);

  const [mainIndex, setMainIndex] = useState(0);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const [eventsInProgress, setEventsInProgress] = useState<EventsData[]>([]);

  const swiperParams = {
    spaceBetween: 50,
    slidesPerView: 1,
    navigation: {
      prevEl: navigationPrevRef.current,
      nextEl: navigationNextRef.current,
    },
    onBeforeInit: (swiper: any) => {
      swiper.params.navigation.prevEl = navigationPrevRef.current;
      swiper.params.navigation.nextEl = navigationNextRef.current;
      swiper.activeIndex = mainIndex;
    },
    onSlideChange: (e: any) => setMainIndex(e.activeIndex),

    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
  };

  const { data } = useQuery<GetAllEventsSuccessResponse>(
    ['allEvents'],
    getAllEvents,
    {
      refetchOnWindowFocus: false,
      retry: 0,

      onSuccess: (data) => {
        const eventsInProgress = data.data.filter((el) =>
          compareDates(el.end_date)
        );
        setEventsInProgress(eventsInProgress);
      },
    }
  );

  return (
    <SwiperContainer {...swiperParams}>
      {data &&
        eventsInProgress.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <LinkEvent to={`${ROUTES.EVENT.link}/${item.id}`}>
                <SlideContainer>
                  <SlideImage src={item.image} />
                </SlideContainer>
                <SlideDescriptionContainer>
                  <SlideTitle>{item.name}</SlideTitle>
                  <StayDescription>{`${item?.start_date} ~ ${item?.end_date}`}</StayDescription>
                </SlideDescriptionContainer>
              </LinkEvent>
            </SwiperSlide>
          );
        })}

      <NavigationButtonContainer
        visible={data && eventsInProgress.length > 2 ? true : false}
      >
        <NavigationButton ref={navigationPrevRef}>
          <IoIosArrowBack />
        </NavigationButton>
        <NavigationButton ref={navigationNextRef}>
          <IoIosArrowForward />
        </NavigationButton>
      </NavigationButtonContainer>
    </SwiperContainer>
  );
};

export default EventSwiper;
