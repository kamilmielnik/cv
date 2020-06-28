import fs from 'fs';
import { CollectionChain } from 'lodash';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { ClientTrackingData, ServerTrackingData, TrackingData } from 'types';

const adapter = new FileSync('tracking.json');
const db = lowdb(adapter);
db.defaults({ visits: [] }).write();
const visitsDb = db.get('visits') as CollectionChain<TrackingData>;

const track = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  try {
    const clientTrackingData: ClientTrackingData = request.body;
    const serverTrackingData: ServerTrackingData = {
      origin: request.headers.origin,
      referer: request.headers.referer,
      timestamp: Date.now(),
      userAgent: request.headers['user-agent'],
      xForwardedFor: request.headers['x-forwarded-for'],
      xRealIp: request.headers['x-real-ip']
    };
    const trackingData: TrackingData = {
      client: clientTrackingData,
      server: serverTrackingData
    };
    visitsDb.push(trackingData).write();
    response.status(200).send('OK');
  } catch (error) {
    response.status(500).send(error.message);
  }
};

export default track;
