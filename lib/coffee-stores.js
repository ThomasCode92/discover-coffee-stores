import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

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

export const fetchCoffeeStores = async (
  latLong = '43.68212527466834%2C-79.39961655765684', // Toronto
  limit = 6
) => {
  const images = await getImagesForCoffeeStores();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const foursquarePlacesUrl = getUrlForCoffeeStores(latLong, 'coffee', limit);

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

    const imgUrl = images.length > 0 ? images[idx] : null;

    return { id: fsq_id, name, address, neighborhood, imgUrl };
  });
};
