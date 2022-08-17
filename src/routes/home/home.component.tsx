import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { fetchAllEvents } from '../../api/event';
import { fetchPopularStay } from '../../api/popular-stay';
import { selectAllEvents } from '../../store/modules/event/event.select';
import { selectPopularStay } from '../../store/modules/popular-stay/popularStay.select';

import Container from '../../components/container/container.component';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import SwiperComponent from '../../components/swiper/swiper.component';
import UserInfoModal from '../../components/user-info-modal/userInfoModal.component';
import BannerSwiper from '../../components/banner-swiper/bannerSwiper.component';

import {
  MainBanner,
  SliderContainer,
  SliderTitle,
  Wrapper,
} from './home.style';
import { navigatorAction } from '../../store/modules/navigator/navigator.slice';

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch();

  const events = useAppSelector(selectAllEvents);
  const popularStays = useAppSelector(selectPopularStay);

  useEffect(() => {
    dispatch(navigatorAction.setCurrnetPage('home'));
    const fetchData = async () => {
      await dispatch(fetchAllEvents());
      await dispatch(fetchPopularStay());
    };

    fetchData();
  }, [dispatch]);

  const BANNER_IMAGES = [
    'https://d2u1fvsvew9tft.cloudfront.net/plus/1658500098920이벤트배너.png',
    'https://d2u1fvsvew9tft.cloudfront.net/plus/1658498830946이벤트배너2.png',
  ];

  return (
    <Container>
      <Wrapper>
        <MainBanner>
          <BannerSwiper imgUrlArr={BANNER_IMAGES} />
        </MainBanner>

        <SliderContainer>
          <SliderTitle>현재 진행중인 이벤트</SliderTitle>
          <SwiperComponent swiperDataArr={events}></SwiperComponent>
        </SliderContainer>

        <SliderContainer>
          <SliderTitle>혼자와서 둘이가는 인기순</SliderTitle>
          <SwiperComponent swiperDataArr={popularStays}></SwiperComponent>
        </SliderContainer>

        <Header />
        <Footer />
        <UserInfoModal />
      </Wrapper>
    </Container>
  );
}
