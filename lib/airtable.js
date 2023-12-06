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

export { table, getMinifiedRecords };
