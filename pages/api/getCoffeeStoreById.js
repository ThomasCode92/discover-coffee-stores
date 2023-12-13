export default async function getCoffeeStoreById(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Missing coffee store id' });
  }

  try {
    res.status(200).json({ message: 'Found coffee store' });
  } catch (error) {
    console.error('An unexpected error has occurred');
    console.error(error);

    return res.status(500).json({ message: 'Oh no! Something went wrong.' });
  }
}
