import { useCallback } from 'react';

import { TrackingAction } from 'types';

import putTrack from './putTrack';
import useTrackingData from './useTrackingData';

type Track = (action: TrackingAction) => void;

const useTrack = (): Track => {
  const trackingData = useTrackingData();
  const track = useCallback(
    (action: TrackingAction) => {
      putTrack(action, trackingData);
    },
    [trackingData]
  );
  return track;
};

export default useTrack;
