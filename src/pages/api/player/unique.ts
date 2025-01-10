import { NextApiRequest, NextApiResponse } from 'next';
import { SERVER_URL } from '@/constants/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	
	const { classroom_Id } = req.query;

  if (!classroom_Id) {
    return res.status(400).json({ error: 'classroom_Id is required' });
  }

	try {
		const response = await fetch(`${SERVER_URL}/players/equipment/unique/${classroom_Id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});
		const data = await response.json();
		if (response.status === 200) {
		return res.status(200).json(data);
		}
		if (response.status === 404) {
		return res.status(404).json(data);
		}
	} catch (error) {
		console.error('Server error on assigning unique item to player: ', error);
		res.status(500).json({ error: 'Server error on assigning unique item to player: ' });
	}
}