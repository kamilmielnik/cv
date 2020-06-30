import { NextApiRequest } from 'next';
import { ServerTrackingData } from 'types';

const getServerTrackingData = (request: NextApiRequest): ServerTrackingData => ({
  origin: request.headers.origin,
  referer: request.headers.referer,
  timestamp: Date.now(),
  userAgent: request.headers['user-agent'],
  xForwardedFor: request.headers['x-forwarded-for'],
  xRealIp: request.headers['x-real-ip']
});

export default getServerTrackingData;
