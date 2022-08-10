import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { modalAction } from '../../store/modules/modal/modal.slice';
import { selectStayData } from '../../store/modules/stay/stay.select';
import {
  selectIsLoggedIn,
  selectUserId,
  selectAccessToken,
} from '../../store/modules/user/user.select';

import { getStay } from '../../api/stay';
import { fetchLike } from '../../api/user';
import { deleteWishItem } from '../../api/wishlist';

import { ROUTES } from '../routes';
import Container from '../../components/container/container.component';
import Header from '../../components/header/header.component';
import LoginModal from '../../components/login-modal/loginModal.component';

import { AiOutlineHeart } from 'react-icons/ai';

import {
  TitleContainer,
  Title,
  DescriptionContainer,
  SubTitle,
  Address,
  DescriptionText,
  ContentsContainer,
  Room,
  RoomDescription,
  RoomTitle,
  RoomCost,
  RoomLink,
  LikeIconContainer,
  FilledHeart,
} from './stayDescription.style';
import Map from '../../components/map/map.component';

export default function StayDescription(): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const stayData = useAppSelector(selectStayData);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userId = useAppSelector(selectUserId);
  const userToken = useAppSelector(selectAccessToken);

  const STAY_ID = Number(location.pathname.split('/')[2]);

  const [isLiked, setIsLiked] = useState(false);
  const [isMapLoad, SetIsMapLoad] = useState(false);

  const loadMap = () => {
    SetIsMapLoad(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getStay(STAY_ID));
      loadMap();
    };

    fetchData();
  }, [STAY_ID, dispatch]);

  useEffect(() => {
    const checkIsLiked = () => {
      const userIdArr = stayData.likes.map((el) => el.user_id);
      const result = userIdArr.some((el) => el === userId);
      setIsLiked(result);
    };

    checkIsLiked();
  }, [stayData.likes, userId]);

  const handleLike = () => {
    if (!isLoggedIn) dispatch(modalAction.radioLoginModal());
    else {
      if (isLiked) deleteWishItem(userToken, stayData.id);
      else fetchLike({ token: userToken, stationId: stayData.id });

      setIsLiked((v) => !v);
    }
  };

  return (
    <Container>
      <div>
        <Header></Header>
        <TitleContainer>
          <Title>{stayData.name}</Title>
          <LikeIconContainer onClick={handleLike}>
            {isLiked ? <FilledHeart /> : <AiOutlineHeart />}
          </LikeIconContainer>
        </TitleContainer>
        <DescriptionContainer>
          <img src={stayData.image} alt="숙소 이미지" />
          <SubTitle className="mainTitle">{stayData.name}</SubTitle>
          <Address>{stayData.address}</Address>
          <DescriptionText>{stayData.content}</DescriptionText>
        </DescriptionContainer>

        <ContentsContainer>
          <SubTitle>Rooms</SubTitle>
          {stayData.rooms.map((el, index) => {
            return (
              <RoomLink
                to={`${ROUTES.ROOM.link}/${STAY_ID}/${el.id}`}
                key={index}
              >
                <Room>
                  <img src={el.image} alt="방 이미지" />
                  <RoomDescription>
                    <RoomTitle>{el.name}</RoomTitle>
                    <RoomCost>₩{el.price.toLocaleString()}</RoomCost>
                  </RoomDescription>
                </Room>
              </RoomLink>
            );
          })}
        </ContentsContainer>

        <ContentsContainer>
          <SubTitle>Map</SubTitle>
          {isMapLoad && (
            <Map
              y={parseFloat(stayData.y)}
              x={parseFloat(stayData.x)}
              name={stayData.name}
              height={450}
            />
          )}
        </ContentsContainer>

        <LoginModal />
      </div>
    </Container>
  );
}
