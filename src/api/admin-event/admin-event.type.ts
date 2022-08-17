export interface GetOneEventSuccessResponse {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  rate: number;
  image: string;
  detailImage: string;
}

export interface GetAllEventsSuccessResponse {
  data: GetOneEventSuccessResponse[];
  message: string;
  statusCode: number;
}
