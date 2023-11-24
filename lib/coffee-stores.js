import { createApi } from 'unsplash-js';

const unsplash = createApi({ accessKey: process.env.UNSPLASH_ACCESS_KEY });

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getImagesForCoffeeStores = async () => {
  const images = await unsplash.search.getPhotos({
    query: 'coffee shop',
    perPage: 30,
  });

  return images.response.results.map(image => image.urls['small']);
};

export const fetchCoffeeStores = async () => {
  const images = await getImagesForCoffeeStores();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const latLong = '43.68212527466834%2C-79.39961655765684';
  const foursquarePlacesUrl = getUrlForCoffeeStores(latLong, 'coffee', 6);

  const response = await fetch(foursquarePlacesUrl, options);
  const data = await response.json();

  return data.results.map((result, idx) => {
    const { fsq_id, name, location } = result;
    const { address, locality } = location;

    const neighborhood = location.neighborhood
      ? location.neighborhood.length > 0
        ? location.neighborhood[0]
        : ''
      : locality;

    const imgUrl =
      images.length > 0
        ? images[idx]
        : 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';

    return { id: fsq_id, name, address, neighborhood, imgUrl };
  });
};
