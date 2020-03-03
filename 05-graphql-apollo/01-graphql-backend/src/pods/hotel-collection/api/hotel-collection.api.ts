import Axios from 'axios';
import { baseApiUrl } from 'core';
import { HotelEntityApi } from './hotel-collection.api-model';

const url = `${baseApiUrl}/api/hotels`;

export const getHotelCollection = (): Promise<HotelEntityApi[]> =>
  Axios.get(url).then(({ data }) => data);
