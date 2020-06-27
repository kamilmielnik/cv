import fs from 'fs';
import { CollectionChain } from 'lodash';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { ServerTrackingData, TrackingData } from 'types';

const adapter = new FileSync('tracking.json');
const db = lowdb(adapter);
db.defaults({ visits: [] }).write();
const visitsDb = db.get('visits') as CollectionChain<ServerTrackingData>;

const track = async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  try {
    const visit: ServerTrackingData = {
      ...(request.body as TrackingData),
      ip: request.connection.remoteAddress,
      serverTimestamp: Date.now()
    };
    visitsDb.push(visit).write();
    response.status(200).send('OK');
  } catch (error) {
    response.status(500).send(error.message);
  }
};

export default track;
