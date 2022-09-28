import { useCallback, useEffect, useState } from 'react';

import { TrackingAction } from 'types';

import putTrack from './putTrack';
import useTrackingData from './useTrackingData';

type Track = (action: TrackingAction) => void;

const useTrack = (): Track => {
  const [queue, setQueue] = useState<TrackingAction[]>([]);
  const trackingData = useTrackingData();

  const track = useCallback((action: TrackingAction) => {
    setQueue((queue) => [...queue, action]);
  }, []);

  useEffect(() => {
    if (trackingData && queue.length > 0) {
      for (const action of queue) {
        putTrack(action, trackingData);
      }

      setQueue((currentQueue) => currentQueue.filter((action) => !queue.includes(action)));
    }
  }, [queue, trackingData]);

  return track;
};

export default useTrack;
