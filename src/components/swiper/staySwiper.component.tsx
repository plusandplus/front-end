import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { getPopularStay } from '../../api/popular-stay';
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

interface GetPopularStaySuccessResponse {
  message: string;
  statusCode: number;
  data: StayData[];
}

interface StayData {
  id: number;
  name: string;
  image: string;
  minprice: number;
  maxprice: number;
  local: {
    id: number;
    name: string;
    classification: string;
  };
}

const StaySwiper = (): JSX.Element => {
  SwiperCore.use([Navigation, Pagination]);

  const [mainIndex, setMainIndex] = useState(0);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

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

  const { data } = useQuery<GetPopularStaySuccessResponse>(
    ['getPopularStay'],
    getPopularStay,
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  return (
    <SwiperContainer {...swiperParams}>
      {data &&
        data.data.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <LinkEvent to={`${ROUTES.STAY.link}/${item.id}`}>
                <SlideContainer>
                  <SlideImage className="stay" src={item.image} />
                </SlideContainer>
                <SlideDescriptionContainer>
                  <SlideTitle>{item.name}</SlideTitle>
                  <StayDescription>
                    <span>{item.local.name}</span>
                    <span>{`₩${item.minprice.toLocaleString()} ~ ₩${item.maxprice.toLocaleString()}`}</span>
                  </StayDescription>
                </SlideDescriptionContainer>
              </LinkEvent>
            </SwiperSlide>
          );
        })}

      <NavigationButtonContainer
        visible={data && data.data.length > 2 ? true : false}
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

export default StaySwiper;
