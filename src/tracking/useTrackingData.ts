import { useEffect, useState } from 'react';

import { ClientTrackingData } from 'types';

import observableTrackingData from './observableTrackingData';

const useTrackingData = (): ClientTrackingData | null => {
  const [trackingData, setTrackingData] = useState<ClientTrackingData | null>(
    observableTrackingData.get()
  );

  useEffect(() => observableTrackingData.subscribe(setTrackingData), []);

  return trackingData;
};

export default useTrackingData;
