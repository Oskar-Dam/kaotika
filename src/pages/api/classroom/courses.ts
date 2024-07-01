import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });

  const classroom = google.classroom({ version: 'v1', auth });

  try {
    const { data } = await classroom.courses.list({ teacherId: session.user?.email as string });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses', error });
  }
}