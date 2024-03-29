import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { fetchStayType, fetchTheme, getSearchResult } from '../../api/search';
import { formatDateInSearch } from '../../utils/calendar';

import { modalAction } from '../../store/modules/modal/modal.slice';
import { searchAction } from '../../store/modules/search/search.slice';
import { selectIsFilterModalOpen } from '../../store/modules/modal/modal.select';
import {
  selectSearchRegion,
  selectStayType,
  selectTheme,
} from '../../store/modules/search/search.select';
import {
  selectCalendarReducerSetCheckIn,
  selectCalendarReducerCheckOut,
} from '../../store/modules/calendar/calendar.select';

import theme from '../../style/theme';
import MainModal from '../main-modal/mainModal.component';
import {
  FilterModalContainer,
  CostSliderContainer,
  CostContainer,
  CostTitle,
  CostInputContainer,
  CategoryContainer,
  CategoryTitle,
  Bottom,
  SearchButton,
  ResetButton,
  CheckboxContainer,
  CheckboxElement,
  CheckboxInput,
  CheckboxLabel,
} from './filterModal.style';

export default function FilterModal(): JSX.Element {
  const dispatch = useAppDispatch();

  const isFilterModalOpen = useAppSelector(selectIsFilterModalOpen);
  const region = useAppSelector(selectSearchRegion);
  const stayType = useAppSelector(selectStayType);
  const theme = useAppSelector(selectTheme);
  const checkInDate = useAppSelector(selectCalendarReducerSetCheckIn);
  const checkOutDate = useAppSelector(selectCalendarReducerCheckOut);

  const formattedCheckIn = checkInDate && formatDateInSearch(checkInDate);
  const formattedCheckOut = checkOutDate && formatDateInSearch(checkOutDate);

  const MIN_DISTANCE: number = 5;
  const [costValue, setCostValue] = useState([0, 100]);
  const [stayCheckedList, setStayCheckedList] = useState<number[]>([]);
  const [themeCheckedList, setThemeCheckedList] = useState<number[]>([]);

  const fetchSearchResult = async () => {
    const data = {
      localId: region.id,
      stayIds: stayCheckedList,
      themeIds: themeCheckedList,
      minprice: Number(`${costValue[0]}0000`),
      maxprice: Number(`${costValue[1]}0000`),
      checkIn: checkInDate ? formattedCheckIn : '',
      checkOut: checkOutDate ? formattedCheckOut : '',
    };
    await dispatch(getSearchResult(data));
  };

  const searchByFilter = () => {
    const filteredData = {
      cost: costValue,
      stayType: stayCheckedList,
      theme: themeCheckedList,
    };
    fetchSearchResult();
    dispatch(searchAction.filterCategory(filteredData));
    dispatch(modalAction.radioFilterModal());
  };

  const resetFilter = () => {
    setCostValue([0, 100]);
    setStayCheckedList([]);
    setThemeCheckedList([]);
    dispatch(searchAction.resetFilter());
  };

  const onCheckedStay = (checked: boolean, item: number) => {
    if (checked) setStayCheckedList((prev) => [...prev, item]);
    else setStayCheckedList(stayCheckedList.filter((el) => el !== item));
  };

  const onCheckedTheme = (checked: boolean, item: number) => {
    if (checked) setThemeCheckedList((prev) => [...prev, item]);
    else setThemeCheckedList(themeCheckedList.filter((el) => el !== item));
  };

  const handleCostRange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setCostValue([
        Math.min(newValue[0], costValue[1] - MIN_DISTANCE),
        costValue[1],
      ]);
    } else {
      setCostValue([
        costValue[0],
        Math.max(newValue[1], costValue[0] + MIN_DISTANCE),
      ]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchStayType());
      await dispatch(fetchTheme());
    };

    fetchData();
  }, [dispatch]);

  return (
    <MainModal
      isOpen={isFilterModalOpen}
      onClose={searchByFilter}
      title="필터"
      contentWidth={700}
    >
      <div>
        <FilterModalContainer>
          <CategoryContainer>
            <CategoryTitle>가격 범위</CategoryTitle>
            <CostSliderContainer>
              <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={costValue}
                onChange={handleCostRange}
                valueLabelDisplay="auto"
                disableSwap
              />
            </CostSliderContainer>
            <CostContainer>
              <div>
                <CostTitle>최저요금</CostTitle>
                <CostInputContainer>{costValue[0]}만원</CostInputContainer>
              </div>
              <span> ~ </span>
              <div>
                <CostTitle>최고요금</CostTitle>
                <CostInputContainer>{costValue[1]}만원</CostInputContainer>
              </div>
            </CostContainer>
          </CategoryContainer>
          <CategoryContainer>
            <CategoryTitle>스테이 유형</CategoryTitle>
            <CheckboxContainer>
              {stayType.map((item, key) => {
                return (
                  <CheckboxElement key={key}>
                    <CheckboxInput
                      type="checkbox"
                      id={String(item.id)}
                      value={item.id}
                      onChange={(e) =>
                        onCheckedStay(e.target.checked, Number(e.target.value))
                      }
                      checked={stayCheckedList.includes(item.id) ? true : false}
                    />
                    <CheckboxLabel htmlFor={String(item.id)}>
                      {item.name}
                    </CheckboxLabel>
                  </CheckboxElement>
                );
              })}
            </CheckboxContainer>
          </CategoryContainer>

          <CategoryContainer>
            <CategoryTitle>테마</CategoryTitle>
            <CheckboxContainer>
              {theme.map((item, key) => {
                return (
                  <CheckboxElement key={key}>
                    <CheckboxInput
                      type="checkbox"
                      id={String(item.id)}
                      value={item.id}
                      onChange={(e) =>
                        onCheckedTheme(e.target.checked, Number(e.target.value))
                      }
                      checked={
                        themeCheckedList.includes(item.id) ? true : false
                      }
                    />
                    <CheckboxLabel htmlFor={String(item.id)}>
                      {item.name}
                    </CheckboxLabel>
                  </CheckboxElement>
                );
              })}
            </CheckboxContainer>
          </CategoryContainer>
        </FilterModalContainer>
        <Bottom>
          <ResetButton onClick={resetFilter}>전체 해제</ResetButton>
          <SearchButton onClick={searchByFilter}>검색하기</SearchButton>
        </Bottom>
      </div>
    </MainModal>
  );
}
