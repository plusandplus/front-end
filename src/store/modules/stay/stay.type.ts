export interface StayType {
  stayData: {
    id: number;
    name: string;
    image: string;
    content: string;
    address: string;
    minprice: number;
    maxprice: number;
    x: string;
    y: string;
    local_id: {
      id: number;
      name: string;
      classification: string;
    };
    stay_id: {
      id: number;
      name: string;
      classification: string;
    };
    themes: [
      {
        id: number;
        name: string;
      }
    ];
    event_id: {
      id: number;
      name: string;
      start_date: string;
      end_date: string;
      rate: number;
    };
    likes: [
      {
        id: number;
        station_id: number;
        user_id: number;
      }
    ];
    rooms: [
      {
        id: number;
        name: string;
        image: string;
        content: string;
        price: number;
        max_cnt: number;
        created_at: string;
        updated_at: string;
      }
    ];
  };

  roomData: {
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

    station: {
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
    };
  };
}
