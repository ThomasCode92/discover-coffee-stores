import Airtable from 'airtable';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const table = base('coffee-stores');

const getMinifiedRecord = record => {
  return { ...record.fields };
};

const getMinifiedRecords = records => {
  return records.map(record => getMinifiedRecord(record));
};

const findRecordsById = async id => {
  const existingCoffeeStores = await table
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();

  if (!existingCoffeeStores || existingCoffeeStores.length === 0) {
    return [];
  }

  return getMinifiedRecords(existingCoffeeStores);
};

export { table, getMinifiedRecords, findRecordsById };
