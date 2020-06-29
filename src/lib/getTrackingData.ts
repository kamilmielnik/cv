import Fingerprint2 from 'fingerprintjs2';

import { ClientTrackingData } from 'types';

const getTrackingData = async (): Promise<ClientTrackingData> => {
  const navigator = getNavigator();
  const components = await Fingerprint2.getPromise();
  const trackingData: ClientTrackingData = {
    fingerprint: getFingerprint(components),
    language: navigator.language,
    languages: [...navigator.languages],
    platform: components.find(({ key }) => key === 'platform')?.value,
    timezone: components.find(({ key }) => key === 'timezone')?.value,
    timezoneOffset: new Date().getTimezoneOffset(),
    userAgent: navigator.userAgent
  };
  return trackingData;
};

const getNavigator = () =>
  global.navigator || {
    language: undefined,
    languages: [],
    userAgent: undefined
  };

const getFingerprint = (components: Fingerprint2.Component[]): string => {
  const values = components.map(({ value }) => value);
  const fingerprint = Fingerprint2.x64hash128(values.join('--'), 31);
  return fingerprint;
};

export default getTrackingData;
