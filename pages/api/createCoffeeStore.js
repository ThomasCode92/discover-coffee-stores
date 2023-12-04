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
      const existingCoffeeStore = await table
        .select({ filterByFormula: `id="0"` })
        .firstPage();

      if (existingCoffeeStore && existingCoffeeStore.length > 0) {
        return res.status(200).json({
          message: 'Coffee store already exists',
          data: existingCoffeeStore[0].fields,
        });
      }

      return res.json({ message: 'Creating a coffee store' });
    }

    return res.json({ message: 'Hello World' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error });
  }
}
