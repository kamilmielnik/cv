import fs from 'fs';
import { CollectionChain } from 'lodash';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { ClientTrackingData, ServerTrackingData, TrackingAction, TrackingData } from 'types';

const adapter = new FileSync('tracking.json');
const db = lowdb(adapter);
db.defaults({ track: [] }).write();
const trackingDb = db.get('track') as CollectionChain<TrackingData>;

const getTrackingData = (request: NextApiRequest): TrackingData => {
  const action: TrackingAction = request.query.action;
  const client: ClientTrackingData = request.body;
  const server: ServerTrackingData = {
    origin: request.headers.origin,
    referer: request.headers.referer,
    timestamp: Date.now(),
    userAgent: request.headers['user-agent'],
    xForwardedFor: request.headers['x-forwarded-for'],
    xRealIp: request.headers['x-real-ip']
  };
  const trackingData: TrackingData = { action, client, server };
  return trackingData;
};

const track = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  try {
    const trackingData = getTrackingData(request);
    trackingDb.push(trackingData).write();
    response.status(200).send('OK');
  } catch (error) {
    response.status(500).send(error.message);
  }
};

export default track;
