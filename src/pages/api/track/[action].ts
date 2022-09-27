import { Low, JSONFile } from 'lowdb';
import { NextApiRequest, NextApiResponse } from 'next';

import { getServerTrackingData, isClientTrackingData, isTrackingAction } from 'api';
import { ClientTrackingData, TrackingAction, TrackingData } from 'types';

interface Data {
  track: TrackingData[];
}

const adapter = new JSONFile<Data>('tracking.json');
const db = new Low(adapter);
db.data ||= { track: [] };
db.write();

const track = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  try {
    const trackingData = getTrackingData(request);
    db.data.track.push(trackingData);
    await db.write();
    response.status(200).send('OK');
  } catch (error) {
    response.status(500).send('Server error');
  }
};

const getTrackingData = (request: NextApiRequest): TrackingData => ({
  action: getTrackingAction(request),
  client: getClientTrackingData(request),
  server: getServerTrackingData(request)
});

const getTrackingAction = (request: NextApiRequest): TrackingAction => {
  if (!isTrackingAction(request.query.action)) {
    throw new Error('Invalid request query');
  }

  return request.query.action;
};

const getClientTrackingData = (request: NextApiRequest): ClientTrackingData => {
  if (!isClientTrackingData(request.body)) {
    throw new Error('Invalid request body');
  }

  return request.body;
};

export default track;
