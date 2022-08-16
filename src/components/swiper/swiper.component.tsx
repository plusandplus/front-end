import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { StayBaseType } from '../../store/modules/popular-stay/popularStay.type';

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

interface SwiperDataType {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  rate: number;
  image: string;
  minprice?: number;
  maxprice?: number;
  local?: {
    id?: number;
    name?: string;
    classification?: string;
  };
}

interface StayType extends StayBaseType {
  start_date?: string;
  end_date?: string;
}

interface swiperDataArrType {
  swiperDataArr: SwiperDataType[] | StayType[];
}

export default function SwiperComponent({
  swiperDataArr,
}: swiperDataArrType): JSX.Element {
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

  return (
    <SwiperContainer {...swiperParams}>
      {swiperDataArr.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <LinkEvent
              to={
                item.name.includes('이벤트')
                  ? `${ROUTES.EVENT.link}/${item.id}`
                  : `${ROUTES.STAY.link}/${item.id}`
              }
            >
              <SlideContainer>
                <SlideImage
                  className={item.name.includes('이벤트') ? 'event' : 'stay'}
                  src={item.image}
                />
              </SlideContainer>
              {item.name.includes('이벤트') ? (
                <SlideDescriptionContainer>
                  <SlideTitle>{item.name}</SlideTitle>
                  <StayDescription>{`${item?.start_date} ~ ${item?.end_date}`}</StayDescription>
                </SlideDescriptionContainer>
              ) : (
                <SlideDescriptionContainer>
                  <SlideTitle>{item.name}</SlideTitle>
                  <StayDescription>
                    <span>{item.local?.name}</span>
                    <span>{`₩${item.minprice?.toLocaleString()} ~ ₩${item.maxprice?.toLocaleString()}`}</span>
                  </StayDescription>
                </SlideDescriptionContainer>
              )}
            </LinkEvent>
          </SwiperSlide>
        );
      })}

      <NavigationButtonContainer
        visible={swiperDataArr.length > 2 ? true : false}
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
}
