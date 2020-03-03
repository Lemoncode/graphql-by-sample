import { Router } from 'express';
import { HotelEdit, getHotelList, getHotel, saveHotel } from '../data';

export const hotelApi = () => {
  const router = Router();
  router.route('/hotels').get(async (req, res) => {
    const hotels = await getHotelList();
    res.send(hotels);
  });

  router
    .route('/hotels/:id')
    .get(async (req, res) => {
      const id = req.params.id;
      const hotel = await getHotel(id);
      res.send(hotel);
    })
    .patch(async (req, res) => {
      const hotelEdit: HotelEdit = req.body;
      await saveHotel(hotelEdit);
      res.sendStatus(200);
    });

  return router;
};
