import { rateADealer } from 'services/spot-prices';
import { NextApiRequest, NextApiResponse } from 'next';

async function rateDealerHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    dropdown,
    name,
    emailId,
    competitorId,
    rating,
    reviewHeader,
    reviewText
  } = req.body;

  if (!competitorId) {
    return res.send({ error: 'competitorId is required' });
  }
  if (!emailId) {
    return res.send({ error: 'emailId is required' });
  }
  if (!rating) {
    return res.send({ error: 'rating is required' });
  }
  if (!reviewHeader) {
    return res.send({ error: 'reviewHeader is required' });
  }
  if (!reviewText) {
    return res.send({ error: 'reviewText is required' });
  }
  if (!dropdown) {
    return res.send({ error: 'reviewText is required' });
  }

  const israteDealerSuccess = await rateADealer(
    name,
    emailId,
    competitorId,
    rating,
    reviewHeader,
    reviewText
  );

  if (!israteDealerSuccess) {
    return res.status(400).send({ error: 'Rate Dealer fail' });
  }
  return res.send({ message: 'Rated A Dealer successfully' });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return rateDealerHandler(req, res);
    default:
      return res.status(405).send({ message: 'Method not allowed' });
  }
}
