import { Low, JSONFile } from 'lowdb';

import { TrackingData } from 'types';

interface Data {
  track: TrackingData[];
}

const getTrackingDb = () => {
  const adapter = new JSONFile<Data>('tracking.json');
  const db = new Low(adapter);
  db.data ||= { track: [] };
  db.write();
  return db;
};

export default getTrackingDb;
