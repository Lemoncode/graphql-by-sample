import { Router } from 'express';
import { mockHotels } from '../data';

export const hotelApi = () => {
  const router = Router();
  router.route('/hotels').get((req, res) => {
    res.send(mockHotels);
  });

  router.route('/hotels/:id').get((req, res) => {
    const id = req.params.id;
    res.send(mockHotels.find(h => h.id === id));
  });

  return router;
};
