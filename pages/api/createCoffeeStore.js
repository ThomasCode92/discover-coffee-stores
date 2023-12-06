import Airtable from 'airtable';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const table = base('coffee-stores');

export default async function createCoffeeStore(req, res) {
  try {
    if (req.method === 'POST') {
      const { id, ...coffeeStoreData } = req.body;

      const existingCoffeeStores = await table
        .select({ filterByFormula: `id="${id}"` })
        .firstPage();

      if (existingCoffeeStores && existingCoffeeStores.length > 0) {
        return res.status(200).json({
          message: 'Coffee store already exists',
          data: existingCoffeeStores[0].fields,
        });
      }

      const createdRecords = await table.create([
        { fields: { id, ...coffeeStoreData } },
      ]);

      return res.status(201).json({
        message: 'Created a coffee store successfully',
        data: createdRecords[0].fields,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error });
  }
}
