import { ClientTrackingData } from 'types';

const isClientTrackingData = (payload: any): payload is ClientTrackingData => {
  const validators = [
    () => isPayloadValid(payload),
    () => isFingerprintValid(payload.fingerprint),
    () => isLanguageValid(payload.language),
    () => isPlatformValid(payload.platform),
    () => isTimezoneValid(payload.timezone),
    () => isTimezoneOffsetValid(payload.timezoneOffset)
  ];

  return validators.every((validator) => validator());
};

const isPayloadValid = (payload: any): boolean => {
  if (payload === null) {
    return false;
  }

  return typeof payload === 'object';
};

const isFingerprintValid = (fingerprint: any): boolean =>
  typeof fingerprint === 'string' && fingerprint.length === 32;

const isLanguageValid = (language: any): boolean =>
  typeof language === 'string' && language.length < 64;

const isPlatformValid = (platform: any): boolean => {
  if (typeof platform === 'undefined') {
    return true;
  }

  return typeof platform === 'string' && platform.length < 64;
};

const isTimezoneValid = (timezone: any): boolean => {
  if (typeof timezone === 'undefined') {
    return true;
  }

  return typeof timezone === 'string' && timezone.length < 64;
};

const isTimezoneOffsetValid = (timezoneOffset: any): boolean => typeof timezoneOffset === 'number';

export default isClientTrackingData;
