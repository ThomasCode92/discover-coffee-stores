import { table, getMinifiedRecords, findRecordsById } from '@/lib/airtable';

export default async function createCoffeeStore(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });

  const { id, ...coffeeStoreData } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Coffee store id is required' });
  }

  if (!coffeeStoreData.name) {
    return res.status(400).json({ message: 'Coffee store name is required' });
  }

  try {
    const existingCoffeeStores = await findRecordsById(id);

    if (existingCoffeeStores.length > 0) {
      return res.status(200).json({
        message: 'Coffee store already exists',
        data: existingCoffeeStores,
      });
    }

    const createdRecords = await table.create([
      { fields: { id, ...coffeeStoreData } },
    ]);

    return res.status(201).json({
      message: 'Created a coffee store successfully',
      data: getMinifiedRecords(createdRecords),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error });
  }
}
