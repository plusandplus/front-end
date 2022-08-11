export interface CategoryType extends ThemeType {
  classification: string;
}

export interface GetCategoryDataType {
  data: CategoryType[];
  message: string;
  statusCode: number;
}

export interface ThemeType {
  id: number;
  name: string;
}

export interface GetThemeDataType {
  data: ThemeType[];
  message: string;
  statusCode: number;
}

export interface AddCategoryDataType {
  name: string;
  classification: string;
}

export interface DeleteCategoryErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}
