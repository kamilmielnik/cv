import { useEffect, useState } from 'react';

import observableTrackingData from './observableTrackingData';

const useTrackingData = (): boolean => {
  const [trackingData, setTrackingData] = useState<boolean>(observableTrackingData.get());

  useEffect(() => observableTrackingData.subscribe(setTrackingData), []);

  return trackingData;
};

export default useTrackingData;
