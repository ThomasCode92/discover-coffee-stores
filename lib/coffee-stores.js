const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY;

  const options = {
    method: 'GET',
    headers: { accept: 'application/json', Authorization: FOURSQUARE_API_KEY },
  };

  const latLong = '43.68212527466834%2C-79.39961655765684';
  const foursquarePlacesUrl = getUrlForCoffeeStores(latLong, 'coffee', 6);

  const response = await fetch(foursquarePlacesUrl, options);
  const data = await response.json();

  return data.results;
};
