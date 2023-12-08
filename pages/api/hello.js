
export default function handler(req, res) {
    console.log(req.body)
    const { lat, long, category } = req.body;
    console.log(lat)
    res.status(200).json({ text: 'Hello' });
  }

