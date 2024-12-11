import type { NextApiRequest, NextApiResponse } from 'next';
const Artifact = require("../../../database/models/artifactSchema");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await Artifact.find();
        
        if (response) {
            return res.status(200).json(response);
        } else {
            return res.status(404).json(response);
        }    
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};