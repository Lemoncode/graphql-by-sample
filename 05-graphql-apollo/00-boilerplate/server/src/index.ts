import 'regenerator-runtime/runtime';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { hotelApi } from './api';

const PORT = 3000;
const app = express();
app.use(cors());

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));
app.use('/api', hotelApi());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
