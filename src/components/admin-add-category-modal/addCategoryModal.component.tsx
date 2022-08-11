import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { modalAction } from '../../store/modules/modal/modal.slice';
import { selectIsAdminAddCategoryModalOpen } from '../../store/modules/modal/modal.select';
import {
  GetCategoryDataType,
  GetThemeDataType,
} from '../../api/admin-category/admin-category.type';
import MainModal from '../main-modal/mainModal.component';
import { addCategory, addTheme } from '../../api/admin-category/admin-category';
import {
  CategoryButtonsContainer,
  CategoryButton,
  InputContainer,
  CategoryInput,
  WarningMessageContainer,
  WarningMessage,
  Bottom,
  BottomButton,
} from './addCategoryModal.style';

export default function AddCategoryModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const isAdminAddCategoryModalOpen = useAppSelector(
    selectIsAdminAddCategoryModalOpen
  );

  const [clickedButtonName, setClickedButtonName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isCategorySelected, setIsCategorySelected] = useState(true);
  const [inputValidate, setInputValidate] = useState(true);
  const [isNameAvailable, setIsNameAvailable] = useState(true);

  const BUTTON_NAMES = {
    LOCAL: 'LOCAL',
    STAY_TYPE: 'STAY',
    THEME: 'THEME',
  };

  const localData = queryClient.getQueryData([
    'getLocal',
  ]) as GetCategoryDataType;
  const stayData = queryClient.getQueryData([
    'getStayType',
  ]) as GetCategoryDataType;
  const themeData = queryClient.getQueryData(['getTheme']) as GetThemeDataType;

  const categoryAddMutate = useMutation(addCategory, {
    onSuccess: () => {
      if (clickedButtonName === BUTTON_NAMES.LOCAL) {
        queryClient.invalidateQueries(['getLocal']);
      } else if (clickedButtonName === BUTTON_NAMES.STAY_TYPE) {
        queryClient.invalidateQueries(['getStayType']);
      }
    },
  });

  const themeAddMutate = useMutation(addTheme, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getTheme']);
    },
  });

  const closeModal = () => {
    dispatch(modalAction.radioAdminAddCategoryModal());
    setInputValue('');
    setClickedButtonName('');
    setIsCategorySelected(true);
    setInputValidate(true);
    setIsNameAvailable(true);
  };

  const clickCategoryButton = (buttonName: string) => {
    setClickedButtonName(buttonName);
    setIsCategorySelected(true);
  };

  const clickAddButton = () => {
    if (!clickedButtonName) {
      setIsCategorySelected(false);
      return;
    } else if (!inputValue) {
      setInputValidate(false);
      inputRef.current && inputRef.current.focus();
      return;
    } else {
      switch (clickedButtonName) {
        case BUTTON_NAMES.LOCAL:
          if (
            localData.data.map((row) => row.name).indexOf(inputValue) !== -1
          ) {
            setIsNameAvailable(false);
            return;
          } else {
            setIsNameAvailable(true);
            categoryAddMutate.mutate({
              name: inputValue,
              classification: 'LOCAL',
            });
            break;
          }
        case BUTTON_NAMES.STAY_TYPE:
          if (stayData.data.map((row) => row.name).indexOf(inputValue) !== -1) {
            setIsNameAvailable(false);
            return;
          } else {
            setIsNameAvailable(true);
            categoryAddMutate.mutate({
              name: inputValue,
              classification: 'STAY',
            });
            break;
          }
        case BUTTON_NAMES.THEME:
          if (
            themeData.data.map((row) => row.name).indexOf(inputValue) !== -1
          ) {
            setIsNameAvailable(false);
            return;
          } else {
            setIsNameAvailable(true);
            themeAddMutate.mutate(inputValue);
            break;
          }
      }
    }
    setInputValue('');
    closeModal();
  };

  const onBlurInput = () => {
    if (!inputValue) setInputValidate(false);
    else setInputValidate(true);
  };

  return (
    <MainModal
      isOpen={isAdminAddCategoryModalOpen}
      onClose={closeModal}
      title="카테고리 추가하기"
    >
      <div>
        <CategoryButtonsContainer>
          {Object.values(BUTTON_NAMES).map((el) => {
            return (
              <CategoryButton
                key={el}
                className={clickedButtonName === el ? 'focused' : ''}
                onClick={() => clickCategoryButton(el)}
              >
                {el}
              </CategoryButton>
            );
          })}
        </CategoryButtonsContainer>
        <InputContainer>
          <CategoryInput
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            maxLength={10}
            placeholder="카테고리 이름을 입력하세요"
            className={inputValidate ? '' : 'warning'}
            onBlur={onBlurInput}
            ref={inputRef}
          />
        </InputContainer>

        <WarningMessageContainer>
          <WarningMessage>
            {!isCategorySelected
              ? '카테고리를 선택해 주세요.'
              : !inputValidate
              ? '카테고리 이름을 입력해주세요.'
              : !isNameAvailable
              ? '이미 존재하는 카테고리입니다.'
              : ''}
          </WarningMessage>
        </WarningMessageContainer>

        <Bottom>
          <BottomButton onClick={closeModal}>취소</BottomButton>
          <BottomButton className="add" onClick={clickAddButton}>
            추가
          </BottomButton>
        </Bottom>
      </div>
    </MainModal>
  );
}
