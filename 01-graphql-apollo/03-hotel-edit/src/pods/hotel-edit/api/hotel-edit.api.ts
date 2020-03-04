import { graphQLClient } from 'core/graphql.client';
import { HotelEntityApi, HotelEditApi } from './hotel-edit.api-model';

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

interface SaveHotelResponse {
  saveHotel: boolean;
}

export const saveHotel = (hotel: HotelEditApi): Promise<boolean> => {
  const query = `
    mutation($hotelEdit: HotelEdit!) {
      saveHotel(hotelEdit: $hotelEdit)
    }
  `;

  return graphQLClient
    .request<SaveHotelResponse>(query, {
      hotelEdit: hotel,
    })
    .then(res => res.saveHotel);
};
