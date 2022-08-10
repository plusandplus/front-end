import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../hooks/index.hook';
import { modalAction } from '../../store/modules/modal/modal.slice';
import { selectIsAdminEditCategoryModalOpen } from '../../store/modules/modal/modal.select';
import {
  patchCategory,
  patchTheme,
} from '../../api/admin-category/admin-category';
import {
  GetCategoryDataType,
  GetThemeDataType,
} from '../../api/admin-category/admin-category.type';
import MainModal from '../main-modal/mainModal.component';
import {
  ContentsContainer,
  ContentsText,
  CategoryInput,
  WarningMessageContainer,
  WarningMessage,
  Bottom,
  BottomButton,
} from './editCategoryModal.style';

interface PropType {
  categoryTitle: string;
  categoryId: number;
  categoryName: string;
}

export default function EditCategoryModal(props: PropType): JSX.Element {
  const BUTTON_NAMES = {
    LOCAL: 'LOCAL',
    STAY_TYPE: 'STAY',
    THEME: 'THEME',
  };

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  const { categoryTitle, categoryId, categoryName } = props;

  const isAdminEditCategoryModalOpen = useAppSelector(
    selectIsAdminEditCategoryModalOpen
  );

  const [inputValue, setInputValue] = useState('');
  const [inputValidate, setInputValidate] = useState(true);
  const [isNameAvailable, setIsNameAvailable] = useState(true);

  const localData = queryClient.getQueryData([
    'getLocal',
  ]) as GetCategoryDataType;
  const stayData = queryClient.getQueryData([
    'getStayType',
  ]) as GetCategoryDataType;
  const themeData = queryClient.getQueryData(['getTheme']) as GetThemeDataType;

  const closeModal = () => {
    dispatch(modalAction.radioAdminEditCategoryModal());
  };

  const categoryPatchMutate = useMutation(patchCategory, {
    onSuccess: (data, variables) => {
      if (categoryTitle === BUTTON_NAMES.LOCAL) {
        queryClient.invalidateQueries(['getLocal']);
      } else if (categoryTitle === BUTTON_NAMES.STAY_TYPE) {
        queryClient.invalidateQueries(['getStayType']);
      }
    },
  });

  const themePatchMutate = useMutation(patchTheme, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['getTheme']);
    },
  });

  const clickEditCategory = () => {
    if (!inputValue) {
      setInputValidate(false);
      inputRef.current && inputRef.current.focus();
      return;
    }

    switch (categoryTitle) {
      case BUTTON_NAMES.LOCAL:
        if (localData.data.map((row) => row.name).indexOf(inputValue) !== -1) {
          setIsNameAvailable(false);
          return;
        }
        setIsNameAvailable(true);
        categoryPatchMutate.mutate({
          id: categoryId,
          name: inputValue,
          classification: categoryTitle,
        });
        break;
      case BUTTON_NAMES.STAY_TYPE:
        if (stayData.data.map((row) => row.name).indexOf(inputValue) !== -1) {
          setIsNameAvailable(false);
          return;
        }
        setIsNameAvailable(true);
        categoryPatchMutate.mutate({
          id: categoryId,
          name: inputValue,
          classification: categoryTitle,
        });
        break;
      case BUTTON_NAMES.THEME:
        if (themeData.data.map((row) => row.name).indexOf(inputValue) !== -1) {
          setIsNameAvailable(false);
          return;
        }
        setIsNameAvailable(true);
        themePatchMutate.mutate({ id: categoryId, name: inputValue });
        break;
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
      isOpen={isAdminEditCategoryModalOpen}
      onClose={closeModal}
      title={`${categoryTitle} 수정`}
    >
      <div>
        <ContentsContainer>
          <ContentsText>
            현재이름: <span>{categoryName}</span>
          </ContentsText>
          <ContentsText>
            수정할 이름:
            <CategoryInput
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              maxLength={6}
              placeholder="새로운 카테고리 이름을 입력하세요."
              onBlur={onBlurInput}
              ref={inputRef}
            />
          </ContentsText>
        </ContentsContainer>

        <WarningMessageContainer>
          <WarningMessage>
            {!inputValidate
              ? '카테고리 이름을 입력해주세요.'
              : !isNameAvailable
              ? '이미 존재하는 카테고리입니다.'
              : ''}
          </WarningMessage>
        </WarningMessageContainer>

        <Bottom>
          <BottomButton onClick={closeModal}>취소</BottomButton>
          <BottomButton className="edit" onClick={clickEditCategory}>
            수정
          </BottomButton>
        </Bottom>
      </div>
    </MainModal>
  );
}
