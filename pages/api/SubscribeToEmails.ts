import { subscribeUser } from 'services/spot-prices';
import { NextApiRequest, NextApiResponse } from 'next';

async function subscribeHandler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email } = req.body;

  if (!name) {
    return res.send({ error: 'Name is required' });
  }
  if (!email) {
    return res.send({ error: 'Email is required' });
  }

  const isSubscribeSuccess = await subscribeUser(name, email);

  if (!isSubscribeSuccess) {
    return res.status(400).send({ error: 'Subscribe fail' });
  }
  return res.send({ message: 'Subscribed to newsletter successfully' });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return subscribeHandler(req, res);
    default:
      return res.status(405).send({ message: 'Method not allowed' });
  }
}
