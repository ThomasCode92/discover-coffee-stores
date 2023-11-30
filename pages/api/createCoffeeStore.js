import Airtable from 'airtable';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const table = base('coffee-stores');

export default function createCoffeeStore(req, res) {
  if (req.method === 'POST') {
    return res.json({ message: 'Creating a coffee store' });
  }

  return res.json({ message: 'Hello World' });
}
