import { NextApiRequest, NextApiResponse } from 'next';

import { trackingDb } from 'api';

const tracking = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  try {
    await trackingDb.read();
    const entries = trackingDb.data.track;
    response.status(200).send(entries);
  } catch (error) {
    response.status(500).send('Server error');
  }
};

export default tracking;
