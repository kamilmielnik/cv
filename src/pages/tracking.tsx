import React, { useEffect, useState } from 'react';

import { TrackingData } from 'types';

import styles from './tracking.module.scss';

const getTrackingData = (password: string): Promise<TrackingData[]> =>
  fetch('/api/tracking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Unauthorized');
  });

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toUTCString();
};

const formatLanguage = (language?: string): string => (language || '--').toUpperCase();

const Tracking = () => {
  const [trackingData, setTrackingData] = useState<TrackingData[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    // eslint-disable-next-line no-alert
    const password = window.prompt('Password');

    getTrackingData(password)
      .then(setTrackingData)
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Action</td>
          <td>Fingerprint</td>
          <td>Language</td>
          <td>Platform</td>
          <td>Timezone</td>
          <td>Timezone offset</td>
          <td>Origin</td>
          <td>Referer</td>
          <td>Timestamp</td>
          <td>User Agent</td>
          <td>X-Forwarded-For</td>
          <td>X-Real-IP</td>
        </tr>
      </thead>

      <tbody>
        {trackingData.map((value, index) => (
          <tr key={index}>
            <td>{value.action}</td>
            <td>{value.client.fingerprint}</td>
            <td>{formatLanguage(value.client.language)}</td>
            <td>{value.client.platform}</td>
            <td>{value.client.timezone}</td>
            <td>{value.client.timezoneOffset}</td>
            <td>{value.server.origin}</td>
            <td>{value.server.referer}</td>
            <td>{formatTimestamp(value.server.timestamp)}</td>
            <td>{value.server.userAgent}</td>
            <td>{value.server.xForwardedFor}</td>
            <td>{value.server.xRealIp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tracking;
