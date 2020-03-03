import { getHotelList, getHotel, saveHotel } from '../data';

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
  Mutation: {
    saveHotel: async (parent, args) => {
      await saveHotel(args.hotelEdit);
      return true;
    },
  },
};
