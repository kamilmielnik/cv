import { NextApiRequest, NextApiResponse } from 'next';

import { trackingDb } from 'api';

const tracking = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  try {
    const password = request.body.password;

    if (password !== process.env.TRACKING_PASSWORD) {
      response.status(401).send('Unauthorized');
      return;
    }

    await trackingDb.read();
    const entries = trackingDb.data.track;
    response.status(200).send(entries);
  } catch (error) {
    response.status(500).send('Server error');
  }
};

export default tracking;
