import { ClientTrackingData } from 'types';

export const apiRoutes = {
  pdf: '/api/pdf',
  track: '/api/track'
};

export const track = (trackingData: ClientTrackingData) =>
  fetch(apiRoutes.track, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trackingData)
  });
