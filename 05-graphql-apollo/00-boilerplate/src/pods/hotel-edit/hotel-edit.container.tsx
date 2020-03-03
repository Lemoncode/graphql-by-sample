import * as React from 'react';
import { useParams } from 'react-router-dom';
import { getHotel } from './api';
import { HotelEntityVm, createDefaultHotel } from './hotel-edit.vm';
import { HotelEditComponent } from './hotel-edit.component';
import { mapHotelFromApiToModel } from './hotel-edit.mapper';

export const HotelEditContainer: React.FunctionComponent = props => {
  const { id } = useParams();
  const [hotel, setHotel] = React.useState(createDefaultHotel());

  React.useEffect(() => {
    getHotel(id).then(apiHotel => {
      const newHotel = mapHotelFromApiToModel(apiHotel);
      setHotel(newHotel);
    });
  }, [id]);

  const handleSave = (hotel: HotelEntityVm) => {
    console.log({ hotel });
  };
  return <HotelEditComponent hotel={hotel} onSave={handleSave} />;
};
