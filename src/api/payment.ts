import axios from 'axios';
import { IEvent } from './bookinglist';

export interface roomData {
  id: number;
  name: string;
  image: string;
  content: string;
  price: number;
  max_cnt: number;
  checkin_time: string;
  checkout_time: string;
  created_at: string;
  updated_at: string;

  station_id: {
    id: number;
    name: string;
    image: string;
    content: string;
    minprice: number;
    maxprice: number;
    address: string;
    x: string;
    y: string;
    status: string;
    created_at: string;
    updated_at: string;
    event_id: IEvent;
  };
}

export interface postOrderProps {
  startDate: string;
  endDate: string;
  price: number;
  SpecialRequest: string;
  stationId: number;
  userId: number;
  roomId: number;
  eventId: number;
}

export const postOrder = async (postOrder: postOrderProps, token: string) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/orders`,
      {
        start_date: postOrder.startDate,
        end_date: postOrder.endDate,
        price: postOrder.price,
        SpecialRequest: postOrder.SpecialRequest,
        station_id: postOrder.stationId,
        user_id: postOrder.userId,
        room_id: postOrder.roomId,
        event_id: postOrder.eventId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {}
};

/**
 * 룸정보와, 날짜를 입력하여 방이 유효한지 상태를 얻는다.
 * accessable, progress 두가지 상태
 *
 * * @param roomId
 */
export const getRoomState = async (roomId: number) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/rooms/${roomId}/status`
  );

  return response.data;
};

export const patchRoomState = async (roomId: number) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/rooms/${roomId}/status`
  );

  return response.data;
};
