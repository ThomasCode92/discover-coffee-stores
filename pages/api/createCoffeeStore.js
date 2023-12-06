import { table, getMinifiedRecords } from '@/lib/airtable';

export default async function createCoffeeStore(req, res) {
  if (req.method === 'POST') {
    const { id, ...coffeeStoreData } = req.body;
    try {
      if (!id) {
        return res.status(400).json({ message: 'Coffee store id is required' });
      }

      const existingCoffeeStores = await table
        .select({ filterByFormula: `id="${id}"` })
        .firstPage();

      if (existingCoffeeStores && existingCoffeeStores.length > 0) {
        return res.status(200).json({
          message: 'Coffee store already exists',
          data: getMinifiedRecords(existingCoffeeStores),
        });
      }

      if (!coffeeStoreData.name) {
        return res
          .status(400)
          .json({ message: 'Coffee store name is required' });
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
}
