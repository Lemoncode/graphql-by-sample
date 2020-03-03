import { graphQLClient } from 'core/graphql.client';
import { HotelEntityApi } from './hotel-collection.api-model';

const query = `
  query {
    hotels {
      id
      name
      shortDescription
      hotelRating
      address1
      thumbNailUrl
    }
  }
`;

interface Response {
  hotels: HotelEntityApi[];
}

export const getHotelCollection = (): Promise<HotelEntityApi[]> =>
  graphQLClient.request<Response>(query).then(res => res.hotels);
