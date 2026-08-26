import fs from 'node:fs/promises';
import path from 'node:path';

const TRACKING_FILEPATH = path.resolve(import.meta.dirname, '..', 'tracking.jsonl');
const MAX_FIELD_LENGTH = 64;
const MAX_HEADER_LENGTH = 256;

export function trackEvent(event) {
  return fs.appendFile(TRACKING_FILEPATH, `${JSON.stringify(event)}\n`);
}

export function getServerTrackingData(request) {
  return {
    referer: truncate(request.headers.referer),
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
    timezone: requestBody.timezone,
    timezoneOffset: requestBody.timezoneOffset,
  };
}

function isClientTrackingData(payload) {
  return (
    isObject(payload) &&
    isShortString(payload.language) &&
    isOptionalShortString(payload.platform) &&
    isOptionalShortString(payload.timezone) &&
    typeof payload.timezoneOffset === 'number'
  );
}

function isObject(value) {
  return typeof value === 'object' && value !== null;
}

function isShortString(value) {
  return typeof value === 'string' && value.length <= MAX_FIELD_LENGTH;
}

function isOptionalShortString(value) {
  return typeof value === 'undefined' || isShortString(value);
}
