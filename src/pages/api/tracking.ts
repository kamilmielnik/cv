import { NextApiRequest, NextApiResponse } from 'next';

import { getTrackingDb } from 'api';

const tracking = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  try {
    const entries = getTrackingDb().toArray();
    response.status(200).send(entries);
  } catch (error) {
    response.status(500).send('Server error');
  }
};

export default tracking;
