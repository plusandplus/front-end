import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function BannerSwiper(): JSX.Element {
  SwiperCore.use([Navigation, Pagination, Autoplay]);

  const BANNER_IMAGES = [
    'https://d2u1fvsvew9tft.cloudfront.net/plus/1658500098920이벤트배너.png',
    'https://d2u1fvsvew9tft.cloudfront.net/plus/1658498830946이벤트배너2.png',
  ];

  const [mainIndex, setMainIndex] = useState(0);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const swiperParams = {
    spaceBetween: 50,
    slidesPerView: 1,
    autoplay: { delay: 2500 },
    loop: true,
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
  };

  return (
    <Swiper {...swiperParams}>
      {BANNER_IMAGES.map((el) => {
        return (
          <SwiperSlide key={el}>
            <img src={el} alt="이미지 배너" style={{ width: '100%' }} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
