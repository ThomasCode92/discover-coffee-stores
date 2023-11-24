import { useState } from 'react';

export default function useTrackLocation() {
  const [latLong, setLatLong] = useState('');
  const [locationError, setLocationError] = useState('');

  const onSuccess = position => {
    const { latitude, longitude } = position.coords;
    setLatLong(`${latitude},${longitude}`);
    setLocationError('');
  };

  const onError = () => {
    setLocationError('Unable to retrieve your location');
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      return setLocationError('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return { latLong, locationError, handleTrackLocation };
}
