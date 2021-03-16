import { ClientTrackingData, TrackingAction } from 'types';

const putTrack = (action: TrackingAction, trackingData: ClientTrackingData): Promise<Response> =>
  fetch(`/api/track/${action}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trackingData)
  });

export default putTrack;
