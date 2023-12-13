import { table, getMinifiedRecords } from '@/lib/airtable';

export default async function getCoffeeStoreById(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Missing coffee store id' });
  }

  try {
    const existingCoffeeStores = await table
      .select({ filterByFormula: `id="${id}"` })
      .firstPage();

    if (!existingCoffeeStores || existingCoffeeStores.length === 0) {
      return res.status(404).json({ message: 'Coffee Store not found' });
    }

    return res.status(200).json({
      message: 'Found coffee store',
      data: getMinifiedRecords(existingCoffeeStores),
    });
  } catch (error) {
    console.error('An unexpected error has occurred');
    console.error(error);

    return res.status(500).json({ message: 'Oh no! Something went wrong.' });
  }
}
