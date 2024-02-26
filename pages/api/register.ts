import { register } from '@/services/spot-prices';
import { NextApiRequest, NextApiResponse } from 'next';

async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName || !emailId || !password) {
    return res.send({
      error: 'firstName,lastName email, and password is required'
    });
  }

  const isSuccessRegistered = await register(
    firstName,
    lastName,
    emailId,
    password
  );

  if (!isSuccessRegistered) {
    return res.status(400).send({ message: 'Registration success' });
  }
  return res.send({ message: 'Registration success' });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return registerHandler(req, res);
    default:
      return res.status(405).send({ message: 'method not allowed' });
  }
}
