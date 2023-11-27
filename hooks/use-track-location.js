import { useContext, useState } from 'react';
import { ACTION_TYPES, CoffeeStoreContext } from '@/context/coffee-stores';

export default function useTrackLocation() {
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  const { dispatch } = useContext(CoffeeStoreContext);

  const onSuccess = position => {
    const { latitude, longitude } = position.coords;
    const latLong = `${latitude},${longitude}`;

    dispatch({ type: ACTION_TYPES.SET_LAT_LONG, payload: { latLong } });

    setIsFindingLocation(false);
    setLocationError('');
  };

  const onError = () => {
    setIsFindingLocation(false);
    setLocationError('Unable to retrieve your location');
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);

    if (!navigator.geolocation) {
      setIsFindingLocation(false);
      return setLocationError('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return { isFindingLocation, locationError, handleTrackLocation };
}
