import fs from 'node:fs/promises';
import path from 'node:path';

const TRACKING_FILEPATH = path.resolve(import.meta.dirname, '..', 'tracking.jsonl');
const MAX_FIELD_LENGTH = 64;
const MAX_HEADER_LENGTH = 256;
const MAX_REFERRER_LENGTH = 512;

export function trackEvent(event) {
  return fs.appendFile(TRACKING_FILEPATH, `${JSON.stringify(event)}\n`);
}

export function getServerTrackingData(request) {
  return {
    timestamp: Date.now(),
    userAgent: truncate(request.headers['user-agent']),
    xRealIp: truncate(request.headers['x-real-ip']),
  };
}

function truncate(header) {
  return header?.slice(0, MAX_HEADER_LENGTH);
}

export function getClientTrackingData(requestBody) {
  if (!isClientTrackingData(requestBody)) {
    return null;
  }

  return {
    language: requestBody.language,
    platform: requestBody.platform,
    referrer: requestBody.referrer,
    timezone: requestBody.timezone,
    timezoneOffset: requestBody.timezoneOffset,
  };
}

function isClientTrackingData(payload) {
  return (
    isObject(payload) &&
    isString(payload.language, MAX_FIELD_LENGTH) &&
    isOptionalString(payload.platform, MAX_FIELD_LENGTH) &&
    isOptionalString(payload.referrer, MAX_REFERRER_LENGTH) &&
    isOptionalString(payload.timezone, MAX_FIELD_LENGTH) &&
    typeof payload.timezoneOffset === 'number'
  );
}

function isObject(value) {
  return typeof value === 'object' && value !== null;
}

function isString(value, maxLength) {
  return typeof value === 'string' && value.length <= maxLength;
}

function isOptionalString(value, maxLength) {
  return typeof value === 'undefined' || isString(value, maxLength);
}
