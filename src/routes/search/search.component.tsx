import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { formatDateInSearch } from '../../utils/calendar';
import { getSearchResult } from '../../api/search';
import { modalAction } from '../../store/modules/modal/modal.slice';
import { calendarAction } from '../../store/modules/calendar/calendar.slice';
import { searchAction } from '../../store/modules/search/search.slice';
import { navigatorAction } from '../../store/modules/navigator/navigator.slice';
import {
  selectSearchRegion,
  selectSearchCostRange,
  selectSearchStayType,
  selectSearchTheme,
  selectSearchResult,
} from '../../store/modules/search/search.select';
import {
  selectCalendarReducerSetCheckIn,
  selectCalendarReducerCheckOut,
} from '../../store/modules/calendar/calendar.select';

import Container from '../../components/container/container.component';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import DestinationModal from '../../components/destination-modal/destinationModal.component';
import FilterModal from '../../components/filter-modal/filterModal.component';
import CalendarModal from '../../components/calendar-modal/calendarModal.component';
import LoginModal from '../../components/login-modal/loginModal.component';
import ProductListItem from '../../components/product-list-item/productListItem.component';

import { IoIosArrowDown } from 'react-icons/io';
import { GrPowerReset, GrFilter } from 'react-icons/gr';
import {
  Wrapper,
  FilterWrap,
  FilterTop,
  SearchButtonContainer,
  SearchButton,
  RowContainer,
  CategoryContainer,
  CategoryTitle,
  CagtegoryButton,
  IconButtonContainer,
  IconButton,
  ProductListContainer,
  EmptySearchResult,
} from './search.style';
import { selectIsCalendarModalOpen } from '../../store/modules/modal/modal.select';

export default function Search(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isCalendarModalOpen = useAppSelector(selectIsCalendarModalOpen);
  const searchRegionName = useAppSelector(selectSearchRegion);
  const checkInDate = useAppSelector(selectCalendarReducerSetCheckIn);
  const checkOutDate = useAppSelector(selectCalendarReducerCheckOut);
  const searchStayType = useAppSelector(selectSearchStayType);
  const searchTheme = useAppSelector(selectSearchTheme);
  const [minprice, maxprice] = useAppSelector(selectSearchCostRange);
  const searchResult = useAppSelector(selectSearchResult);

  const formattedCheckIn = checkInDate && formatDateInSearch(checkInDate);
  const formattedCheckOut = checkOutDate && formatDateInSearch(checkOutDate);

  const handleDestinationModal = () => {
    dispatch(modalAction.radioDestinationModal());
  };

  const handleFilterModal = () => {
    dispatch(modalAction.radioFilterModal());
  };

  const handleCalendarModal = () => {
    dispatch(modalAction.setCalendarModal());
  };

  const resetFilter = () => {
    dispatch(searchAction.setSearchRegionName({ id: 0, name: '' }));
    dispatch(calendarAction.setCheckInDate(''));
    dispatch(calendarAction.setCheckOutDate(''));
  };

  const searchProps = {
    localId: searchRegionName.id ? searchRegionName.id : 0,
    stayIds: searchStayType,
    themeIds: searchTheme,
    minprice: Number(`${minprice}0000`),
    maxprice: Number(`${maxprice}0000`),
    checkIn: checkInDate ? formattedCheckIn : '',
    checkOut: checkOutDate ? formattedCheckOut : '',
  };

  const fetchSearchResult = async () => {
    await dispatch(getSearchResult(searchProps));
  };

  useEffect(() => {
    dispatch(navigatorAction.setCurrnetPage(location.pathname.slice(1)));
    const defaultProps = {
      localId: searchRegionName.id ? searchRegionName.id : 0,
      stayIds: [],
      themeIds: [],
      minprice: 0,
      maxprice: 1000000,
      checkIn: checkInDate ? formattedCheckIn : '',
      checkOut: checkOutDate ? formattedCheckOut : '',
    };

    const fetchSearchResult = async () => {
      await dispatch(getSearchResult(defaultProps));
    };
    fetchSearchResult();
  }, [dispatch, location]);

  return (
    <Container>
      <Wrapper
        className={
          searchResult.stations.length === 2
            ? 'two'
            : searchResult.stations.length === 1
            ? 'one'
            : ''
        }
      >
        <Header />
        <FilterWrap>
          <FilterTop>
            <RowContainer>
              <CategoryContainer>
                <CategoryTitle>여행지</CategoryTitle>
                <CagtegoryButton
                  className="regionName"
                  onClick={handleDestinationModal}
                >
                  <span>
                    {searchRegionName.name ? searchRegionName.name : '여행지'}
                  </span>
                  <IoIosArrowDown />
                </CagtegoryButton>
              </CategoryContainer>

              <IconButtonContainer className="mobile">
                <IconButton onClick={resetFilter}>
                  <GrPowerReset />
                </IconButton>
                <IconButton onClick={handleFilterModal}>
                  <GrFilter />
                </IconButton>
              </IconButtonContainer>
            </RowContainer>

            <RowContainer>
              <CategoryContainer>
                <CategoryTitle>체크인</CategoryTitle>
                <CagtegoryButton onClick={handleCalendarModal}>
                  <span>{checkInDate ? formattedCheckIn : '체크인'}</span>
                  <IoIosArrowDown />
                </CagtegoryButton>
              </CategoryContainer>
              <CategoryContainer className="checkout">
                <CategoryTitle>체크아웃</CategoryTitle>
                <CagtegoryButton onClick={handleCalendarModal}>
                  <span>{checkOutDate ? formattedCheckOut : '체크아웃'}</span>
                  <IoIosArrowDown />
                </CagtegoryButton>
              </CategoryContainer>
            </RowContainer>

            <IconButtonContainer className="desktop">
              <IconButton onClick={resetFilter}>
                <GrPowerReset />
              </IconButton>
              <IconButton onClick={handleFilterModal}>
                <GrFilter />
              </IconButton>
            </IconButtonContainer>
          </FilterTop>
          <SearchButtonContainer>
            <SearchButton onClick={fetchSearchResult}>검색하기</SearchButton>
          </SearchButtonContainer>
        </FilterWrap>

        <ProductListContainer>
          {searchResult.count === 0 ? (
            <EmptySearchResult> 검색 결과가 없습니다.</EmptySearchResult>
          ) : (
            searchResult.stations.map((item, key) => [
              <ProductListItem
                key={key}
                stayId={item.id}
                stayImageSrc={item.image}
                stayTitle={item.name}
                minPrice={item.minprice}
                maxPrice={item.maxprice}
                stayRegion={item.local_id.name}
                StayType={item.stay_id.name}
                event={item.event_id}
                likes={item.likes}
              />,
            ])
          )}
        </ProductListContainer>
        <Footer />

        <DestinationModal />
        <FilterModal />
        <LoginModal />
        {isCalendarModalOpen && <CalendarModal />}
      </Wrapper>
    </Container>
  );
}
