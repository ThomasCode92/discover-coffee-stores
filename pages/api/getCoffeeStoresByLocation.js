import { fetchCoffeeStores } from '@/lib/coffee-stores';

export default async function getCoffeeStoresByLocation(req, res) {
  const { latLong, limit } = req.query;

  try {
    const fetchedCoffeeStores = await fetchCoffeeStores(latLong, limit);
    return res.status(200).json({ coffeeStores: fetchedCoffeeStores });
  } catch (error) {
    console.error('An unexpected error has occurred');
    console.error(error);

    return res.status(500).json({ message: 'Oh no! Something went wrong.' });
  }
}
