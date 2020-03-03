import { basePicturesUrl } from 'core';
import * as apiModel from './api';
import * as viewModel from './hotel-edit.vm';

export const mapHotelFromApiToModel = (
  hotel: apiModel.HotelEntityApi
): viewModel.HotelEntityVm => ({
  id: hotel.id,
  name: hotel.name,
  picture: `${basePicturesUrl}${hotel.thumbNailUrl}`,
  address: hotel.address1,
  city: hotel.city,
  description: hotel.shortDescription,
  rating: hotel.hotelRating,
});
