import { mockHotels } from './mock-data';
import { Hotel, HotelEdit } from './hotel.model';

let hotels = [...mockHotels];

export const getHotelList = async (): Promise<Hotel[]> => {
  return hotels;
};

export const getHotel = async (id: string): Promise<Hotel> => {
  return hotels.find(h => h.id === id);
};

export const saveHotel = async (hotelEdit: HotelEdit): Promise<boolean> => {
  hotels = hotels.map(h =>
    h.id === hotelEdit.id
      ? {
          ...h,
          ...hotelEdit,
        }
      : h
  );

  return true;
};
