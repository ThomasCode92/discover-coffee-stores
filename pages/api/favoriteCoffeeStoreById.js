import { findRecordsById } from '@/lib/airtable';

export default async function favoriteCoffeeStore(req, res) {
  if (req.method !== 'PUT')
    return res.status(405).json({ message: 'Method not allowed' });

  const { id } = req.body;

  if (!id)
    return res.status(400).json({ message: 'Coffee store id is required' });

  try {
    const existingCoffeeStores = await findRecordsById(id);

    if (existingCoffeeStores.length === 0) {
      return res.status(404).json({ message: 'Coffee store not found' });
    }

    return res.status(200).json({
      message: 'Favorite coffee store successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error });
  }
}
