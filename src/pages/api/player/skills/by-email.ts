import { SERVER_URL } from '@/constants/constants';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {email} = req.query;
  try {
    const response = await fetch(`${SERVER_URL}/players/skills/by-email/${email}`);

    if (!response.ok) {
      throw new Error('Failed to get skills by email');
    }

    const result = await response.json();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Failed to get skills by email:', error);
    res.status(500).json({ error: 'Failed to get skills by email' });
  }
}