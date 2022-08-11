import axios from 'axios';

interface EventPropType {
  name?: string;
  image?: string;
  detailImage?: string;
  start_date?: string;
  end_date?: string;
  rate?: number;
}

//* GET
// 모든 이벤트 조회
export const getAllEvents = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
  return response.data;
};

// 이벤트 상세 조회
export const getOneEvent = async (eventId: number) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/events/${eventId}`
  );
  return response.data;
};

//* POST
export const postEvent = async (data: EventPropType) => {
  // const { name, image, detailImage, start_date, end_date, rate } = data;
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/events`,
    data
  );
  return response.data;
};

//* PATCH
export const patchEvent = async (eventId: number, data: EventPropType) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_API_URL}/events/${eventId}`,
    data
  );
  return response.data;
};

//* DELETE
export const deleteEvent = async (eventId: number) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/events/${eventId}`);
};
