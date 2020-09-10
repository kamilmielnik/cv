import { CollectionChain } from 'lodash';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import { TrackingData } from 'types';

const getTrackingDb = (): CollectionChain<TrackingData> => {
  const adapter = new FileSync('tracking.json');
  const db = lowdb(adapter);
  db.defaults({ track: [] }).write();
  const trackingDb = db.get('track') as CollectionChain<TrackingData>;
  return trackingDb;
};

export default getTrackingDb;
