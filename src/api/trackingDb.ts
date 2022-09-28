import { Low, JSONFile } from 'lowdb';

import { TrackingData } from 'types';

interface Data {
  track: TrackingData[];
}

const adapter = new JSONFile<Data>('tracking.json');
const trackingDb = new Low(adapter);

trackingDb.read().then(() => {
  if (!trackingDb.data || !trackingDb.data.track) {
    trackingDb.data = { track: [] };
    trackingDb.write();
  }
});

export default trackingDb;
