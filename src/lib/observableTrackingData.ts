import { ClientTrackingData } from 'types';

import getTrackingData from './getTrackingData';
import observableIdle from './observableIdle';
import ObservableValue from './ObservableValue';

const observableTrackingData = new ObservableValue<ClientTrackingData | null>(null);

observableIdle.subscribe(async (idle) => {
  if (idle) {
    const trackingData = await getTrackingData();
    observableTrackingData.set(trackingData);
  }
});

export default observableTrackingData;
