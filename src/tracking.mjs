import fs from 'node:fs/promises';
import path from 'node:path';

const TRACKING_FILEPATH = path.resolve(import.meta.dirname, '..', 'tracking.jsonl');

export function trackEvent(event) {
  return fs.appendFile(TRACKING_FILEPATH, `${JSON.stringify(event)}\n`);
}

export function getServerTrackingData(request) {
  return {
    origin: request.headers.origin,
    referer: request.headers.referer,
    timestamp: Date.now(),
    userAgent: request.headers['user-agent'],
    xRealIp: request.headers['x-real-ip'],
  };
}

export function getClientTrackingData(requestBody) {
  if (!isClientTrackingData(requestBody)) {
    return null;
  }

  return {
    language: requestBody.language,
    platform: requestBody.platform,
    timezone: requestBody.timezone,
    timezoneOffset: requestBody.timezoneOffset,
  };
}

function isClientTrackingData(payload) {
  const validators = [
    () => isPayloadValid(payload),
    () => isLanguageValid(payload.language),
    () => isPlatformValid(payload.platform),
    () => isTimezoneValid(payload.timezone),
    () => isTimezoneOffsetValid(payload.timezoneOffset),
  ];

  return validators.every((validator) => validator());
}

function isPayloadValid(payload) {
  if (payload === null) {
    return false;
  }

  return typeof payload === 'object';
}

function isLanguageValid(language) {
  return typeof language === 'string' && language.length < 64;
}

function isPlatformValid(platform) {
  if (typeof platform === 'undefined') {
    return true;
  }

  return typeof platform === 'string' && platform.length < 64;
}

function isTimezoneValid(timezone) {
  if (typeof timezone === 'undefined') {
    return true;
  }

  return typeof timezone === 'string' && timezone.length < 64;
}

function isTimezoneOffsetValid(timezoneOffset) {
  return typeof timezoneOffset === 'number';
}
