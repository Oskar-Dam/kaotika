import { DBConnect } from '@/database/dbHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
const Shield = require("../../../database/models/shieldSchema");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await DBConnect();
    const response = await Shield.find();

    if (response) {
      return res.status(200).json(response);
    } else {
      return res.status(404).json(response);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};