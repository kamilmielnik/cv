import { Observable } from 'lib';
import { ClientTrackingData } from 'types';

import getTrackingData from './getTrackingData';
import observableIdle from './observableIdle';

const observableTrackingData = new Observable<ClientTrackingData | null>(null);

observableIdle.subscribe(async (idle) => {
  if (idle) {
    const trackingData = await getTrackingData();
    observableTrackingData.set(trackingData);
  }
});

export default observableTrackingData;
