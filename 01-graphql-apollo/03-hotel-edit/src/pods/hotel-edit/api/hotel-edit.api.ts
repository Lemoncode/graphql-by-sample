import Axios from 'axios';
import { baseApiUrl } from 'core';
import { graphQLClient } from 'core/graphql.client';
import { HotelEntityApi, HotelEditApi } from './hotel-edit.api-model';

const url = `${baseApiUrl}/api/hotels`;

interface GetHotelResponse {
  hotel: HotelEntityApi;
}

export const getHotel = (id): Promise<HotelEntityApi> => {
  const query = `
    query {
      hotel(id: "${id}") {
        id
        name
        shortDescription
        hotelRating
        address1
        thumbNailUrl
        city
      }
    }
  `;

  return graphQLClient.request<GetHotelResponse>(query).then(res => res.hotel);
};

export const saveHotel = (hotel: HotelEditApi): Promise<boolean> =>
  Axios.patch(`${url}/${hotel.id}`, hotel);
