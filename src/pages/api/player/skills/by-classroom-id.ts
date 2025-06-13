import { SERVER_URL } from '@/constants/constants';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {classroomId} = req.query;
  try {
    const response = await fetch(`${SERVER_URL}/players/skills/by-classroom-id/${classroomId}`);

    if (!response.ok) {
      throw new Error('Failed to get skills by classroom Id');
    }

    const result = await response.json();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Failed to get skills by classroom Id:', error);
    res.status(500).json({ error: 'Failed to get skills by classroom Id' });
  }
}