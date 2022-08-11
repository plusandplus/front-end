import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../../hooks/index.hook';
import { modalAction } from '../../store/modules/modal/modal.slice';
import AddCategoryModal from '../../components/admin-add-category-modal/addCategoryModal.component';
import EditCategoryModal from '../../components/admin-edit-category-modal/editCategoryModal.component';
import {
  getLocal,
  getStayType,
  getTheme,
  deleteCategory,
  deleteTheme,
} from '../../api/admin-category/admin-category';
import {
  GetCategoryDataType,
  CategoryType,
  GetThemeDataType,
  ThemeType,
  DeleteCategoryErrorResponse,
} from '../../api/admin-category/admin-category.type';
import {
  Container,
  Wrap,
  CategoryButtonContainer,
  CategoryButton,
  FormContainer,
  CategoryElement,
  SmallButton,
  AddButton,
  AddButtonContainer,
} from './adminCategory.style';
import { AxiosError, AxiosResponse } from 'axios';

interface EditCategoryModalProp {
  id: number;
  name: string;
}

export default function AdminCateogry(): JSX.Element {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const BUTTON_NAMES = {
    LOCAL: 'LOCAL',
    STAY_TYPE: 'STAY',
    THEME: 'THEME',
  };

  const [clickedButtonName, setClickedButtonName] = useState(
    BUTTON_NAMES.LOCAL
  );
  const [clickedCategoryInfo, setClickedCategoryInfo] =
    useState<EditCategoryModalProp>({ id: 0, name: '' });

  const [localData, setLocaldata] = useState<CategoryType[]>([]);
  const [stayData, setStayData] = useState<CategoryType[]>([]);
  const [themeData, setThemeData] = useState<ThemeType[]>([]);

  const stayTypeRefetch = useQuery<GetCategoryDataType>(
    ['getStayType'],
    getStayType,
    {
      refetchOnWindowFocus: false,
      retry: 0,
      // enabled:false면 queryClient.invalidateQueries 못 씀
      // enabled: false,
      onSuccess: (data) => {
        setStayData(data.data);
      },
    }
  );

  const themeRefetch = useQuery<GetThemeDataType>(['getTheme'], getTheme, {
    refetchOnWindowFocus: false,
    retry: 0,
    // enabled: false,
    onSuccess: (data) => {
      setThemeData(data.data);
    },
  });

  const localRefetch = useQuery<GetCategoryDataType>(['getLocal'], getLocal, {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      setLocaldata(data.data);
    },
  });

  const categoryDeleteMutate = useMutation<AxiosResponse, AxiosError, number>(
    deleteCategory,
    {
      onSuccess: (data) => {
        if (clickedButtonName === BUTTON_NAMES.LOCAL) {
          queryClient.invalidateQueries(['getLocal']);
        } else if (clickedButtonName === BUTTON_NAMES.STAY_TYPE) {
          queryClient.invalidateQueries(['getStayType']);
        }
      },
      onError: (error) => {
        const responseData = error.response
          ?.data as DeleteCategoryErrorResponse;

        if (responseData.statusCode === 404)
          alert(`삭제에러: ${responseData.message}`);
        else if (responseData.statusCode === 406)
          alert(`삭제에러: ${responseData.message}\n\n해당 카테고리로 숙소가 등록되어 있으면 삭제할 수 없습니다.
        `);
      },
    }
  );

  const themeDeleteMutate = useMutation(deleteTheme, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getTheme']);
    },
  });

  const clickDeleteCategory = (id: number) => {
    if (!window.confirm('해당 카테고리를 정말로 삭제하시겠습니까?')) return;
    if (clickedButtonName === BUTTON_NAMES.THEME) {
      themeDeleteMutate.mutate(id);
    } else {
      categoryDeleteMutate.mutate(id);
    }
  };

  const clickLocalButton = () => {
    setClickedButtonName(BUTTON_NAMES.LOCAL);
    localRefetch.refetch();
  };

  const clickStayTypeButton = () => {
    setClickedButtonName(BUTTON_NAMES.STAY_TYPE);
    stayTypeRefetch.refetch();
  };

  const clickThemeButton = () => {
    setClickedButtonName(BUTTON_NAMES.THEME);
    themeRefetch.refetch();
  };

  const clickAddButton = () => {
    dispatch(modalAction.radioAdminAddCategoryModal());
  };

  const clickEditButton = ({ id, name }: EditCategoryModalProp) => {
    dispatch(modalAction.radioAdminEditCategoryModal());
    setClickedCategoryInfo({ id, name });
  };

  const categoryList = (data: CategoryType[] | ThemeType[]) => {
    return data.map((el) => {
      return (
        <CategoryElement key={el.id}>
          {el.name}
          <div>
            <SmallButton
              className="left"
              onClick={() => clickEditButton({ id: el.id, name: el.name })}
            >
              수정
            </SmallButton>
            <SmallButton onClick={() => clickDeleteCategory(el.id)}>
              삭제
            </SmallButton>
          </div>
        </CategoryElement>
      );
    });
  };

  const renderData = () => {
    switch (clickedButtonName) {
      case BUTTON_NAMES.LOCAL:
        return categoryList(localData);
      case BUTTON_NAMES.STAY_TYPE:
        return categoryList(stayData);
      case BUTTON_NAMES.THEME:
        return categoryList(themeData);
    }
  };

  const CATEGORY_BUTTONS = [
    {
      name: BUTTON_NAMES.LOCAL,
      clickFunction: clickLocalButton,
    },
    {
      name: BUTTON_NAMES.STAY_TYPE,
      clickFunction: clickStayTypeButton,
    },
    {
      name: BUTTON_NAMES.THEME,
      clickFunction: clickThemeButton,
    },
  ];

  return (
    <Container>
      <Wrap className="left">
        <CategoryButtonContainer>
          {CATEGORY_BUTTONS.map((el) => {
            return (
              <CategoryButton
                key={el.name}
                className={clickedButtonName === el.name ? 'focused' : ''}
                onClick={el.clickFunction}
              >
                <span>{el.name}</span>
              </CategoryButton>
            );
          })}
          <AddButtonContainer>
            <AddButton onClick={clickAddButton}>추가하기</AddButton>
          </AddButtonContainer>
        </CategoryButtonContainer>
      </Wrap>

      <Wrap className="right">
        <FormContainer>{renderData()}</FormContainer>
      </Wrap>
      <AddCategoryModal />
      <EditCategoryModal
        categoryTitle={clickedButtonName}
        categoryId={clickedCategoryInfo.id}
        categoryName={clickedCategoryInfo.name}
      />
    </Container>
  );
}
