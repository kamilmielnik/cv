import { useEffect, useState } from 'react';

import { ClientTrackingData } from 'types';

import observableTrackingData from './observableTrackingData';

const useTrackingData = (): ClientTrackingData => {
  const [trackingData, setTrackingData] = useState<ClientTrackingData>(
    observableTrackingData.get()
  );

  useEffect(() => observableTrackingData.subscribe(setTrackingData), []);

  return trackingData;
};

export default useTrackingData;
