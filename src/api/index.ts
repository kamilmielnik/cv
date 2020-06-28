import { ClientTrackingData, TrackingAction } from 'types';

export const apiRoutes = {
  pdf: '/api/pdf',
  track: '/api/track/:action'
};

export const track = (action: TrackingAction, trackingData: ClientTrackingData) =>
  fetch(apiRoutes.track.replace(':action', action), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trackingData)
  });
