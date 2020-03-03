import { getHotelList, getHotel } from '../data';

export const resolvers = {
  Query: {
    hotels: async () => {
      const hotels = await getHotelList();
      return hotels;
    },
    hotel: async (parent, args) => {
      const hotel = await getHotel(args.id);
      return hotel;
    },
  },
};
