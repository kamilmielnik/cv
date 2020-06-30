import Fingerprint2 from 'fingerprintjs2';

import { ClientTrackingData } from 'types';

const getTrackingData = async (): Promise<ClientTrackingData> => {
  const components = await Fingerprint2.getPromise();
  const trackingData: ClientTrackingData = {
    fingerprint: getFingerprint(components),
    language: global.navigator?.language,
    platform: components.find(({ key }) => key === 'platform')?.value,
    timezone: components.find(({ key }) => key === 'timezone')?.value,
    timezoneOffset: new Date().getTimezoneOffset()
  };
  return trackingData;
};

const getFingerprint = (components: Fingerprint2.Component[]): string => {
  const values = components.map(({ value }) => value);
  const fingerprint = Fingerprint2.x64hash128(values.join('--'), 31);
  return fingerprint;
};

export default getTrackingData;
