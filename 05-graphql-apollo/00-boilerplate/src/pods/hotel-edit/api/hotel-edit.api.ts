import Axios from 'axios';
import { baseApiUrl } from 'core';
import { HotelEntityApi, HotelEditApi } from './hotel-edit.api-model';

const url = `${baseApiUrl}/api/hotels`;

export const getHotel = (id): Promise<HotelEntityApi> =>
  Axios.get(`${url}/${id}`).then(({ data }) => data);

export const saveHotel = (hotel: HotelEditApi): Promise<boolean> =>
  Axios.patch(`${url}/${hotel.id}`, hotel);
