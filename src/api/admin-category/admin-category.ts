import axios from 'axios';

interface AddCateogryType {
  name: string;
  classification: string;
}

interface PatchCategoryType extends AddCateogryType {
  id: number;
}

interface PatchThemeType {
  id: number;
  name: string;
}

//* GET
// 지역, 스테이유형, 테마 조회
export const getLocal = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/categories/local`
  );
  return response.data;
};

export const getStayType = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/categories/stay`
  );
  return response.data;
};

export const getTheme = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/themes`);
  return response.data;
};

//* POST
// 지역, 스테이유형 추가
export const addCategory = async ({
  name,
  classification,
}: AddCateogryType) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/categories`,
    {
      name: name,
      classification: classification,
    }
  );
  return response.data;
};

// 테마 추가
export const addTheme = (name: string) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/themes`, {
    name: name,
  });
};

//* PATCH
// 지역, 스테이유형 수정
export const patchCategory = ({
  id,
  name,
  classification,
}: PatchCategoryType) => {
  return axios.patch(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
    name: name,
    classification: classification,
  });
};

// 테마 수정
export const patchTheme = ({ id, name }: PatchThemeType) => {
  return axios.patch(`${process.env.REACT_APP_API_URL}/themes/${id}`, {
    name: name,
  });
};

//* DELETE
// 지역, 스테이유형 삭제
export const deleteCategory = async (id: number) => {
  // const response = await axios.delete(
  //   `${process.env.REACT_APP_API_URL}/categories/${id}`
  // );
  // return response.data;

  return axios.delete(`${process.env.REACT_APP_API_URL}/categories/${id}`);
};

// 테마
export const deleteTheme = (id: number) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/themes/${id}`);
};
