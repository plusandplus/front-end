import { useQuery } from '@tanstack/react-query';
import { compareDates } from '../../utils/compareDates';
import { GetAllEventsSuccessResponse } from '../../components/swiper/eventSwiper.component';

import Container from '../../components/container/container.component';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import UserInfoModal from '../../components/user-info-modal/userInfoModal.component';
import BannerSwiper from '../../components/swiper/bannerSwiper.component';
import EventSwiper from '../../components/swiper/eventSwiper.component';
import StaySwiper from '../../components/swiper/staySwiper.component';

import {
  MainBanner,
  SliderContainer,
  SliderTitle,
  Wrapper,
} from './home.style';

export default function Home(): JSX.Element {
  const { data } = useQuery<GetAllEventsSuccessResponse>(['allEvents'], {});

  return (
    <Container>
      <Wrapper>
        <MainBanner>
          <BannerSwiper />
        </MainBanner>

        {data &&
          data.data.filter((el) => compareDates(el.end_date)).length !== 0 && (
            <SliderContainer>
              <SliderTitle>현재 진행중인 이벤트</SliderTitle>
              <EventSwiper />
            </SliderContainer>
          )}

        <SliderContainer>
          <SliderTitle>현재 진행중인 이벤트</SliderTitle>
          <EventSwiper />
        </SliderContainer>

        <SliderContainer>
          <SliderTitle>혼자와서 둘이가는 인기순</SliderTitle>
          <StaySwiper />
        </SliderContainer>

        <Header />
        <Footer />
        <UserInfoModal />
      </Wrapper>
    </Container>
  );
}
