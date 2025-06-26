import { SERVER_URL } from '@/constants/constants';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`${SERVER_URL}/players/skills/apply-skill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error('Failed to apply skill');
    }

    const result = await response.json();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Failed to apply skill:', error);
    res.status(500).json({ error: 'Failed to apply skill' });
  } 
}