import { useState } from 'react';

export default function useTrackLocation() {
  const [latLong, setLatLong] = useState('');
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  const onSuccess = position => {
    const { latitude, longitude } = position.coords;
    setLatLong(`${latitude},${longitude}`);
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

  return { latLong, isFindingLocation, locationError, handleTrackLocation };
}
