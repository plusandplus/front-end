import axios from 'axios';

interface EventPropType {
  name?: string;
  image?: string;
  detailImage?: string;
  start_date?: string;
  end_date?: string;
  rate?: number;
}

interface patchEventPropType {
  eventId: number;
  data: EventPropType;
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
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/events`,
    data
  );
  return response.data;
};

export const postEventImage = async (formData: FormData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/uploads`,
    formData
  );

  return response.data;
};

//* PATCH
export const patchEvent = async (prop: patchEventPropType) => {
  const { eventId, data } = prop;
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
