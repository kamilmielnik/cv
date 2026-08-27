import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';

const TRACKING_FILEPATH = path.resolve(import.meta.dirname, '..', 'tracking.jsonl');
const VALID_ACTIONS = new Set(['github', 'pdf', 'print', 'visit']);
const MAX_BODY_BYTES = 1024;
const MAX_FIELD_LENGTH = 64;
const MAX_HEADER_LENGTH = 256;
const MAX_REFERRER_LENGTH = 512;
const MAX_TIMEZONE_OFFSET_MINUTES = 14 * 60;

export async function trackAction(request, response) {
  try {
    const { action } = request.params;

    if (!VALID_ACTIONS.has(action)) {
      sendStatus(response, 404);
      return;
    }

    if (!isSameOrigin(request)) {
      sendStatus(response, 403);
      return;
    }

    if (!isJsonRequest(request)) {
      sendStatus(response, 415);
      return;
    }

    const body = await readBody(request, MAX_BODY_BYTES);

    if (body === null) {
      response.setHeader('Connection', 'close');
      sendStatus(response, 413);
      return;
    }

    const client = getClientTrackingData(parseJson(body));

    if (client === null) {
      sendStatus(response, 400);
      return;
    }

    await trackEvent({ action, client, server: getServerTrackingData(request) });
    response.statusCode = 204;
    response.end();
  } catch (error) {
    sendServerError(response, error);
  }
}

function isSameOrigin(request) {
  const { origin, host } = request.headers;
  return typeof origin === 'string' && URL.canParse(origin) && new URL(origin).host === host;
}

function isJsonRequest(request) {
  return Boolean(request.headers['content-type']?.startsWith('application/json'));
}

function readBody(request, maxBytes) {
  if (Number(request.headers['content-length']) > maxBytes) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const chunks = [];
    let bytes = 0;

    request.on('data', (chunk) => {
      bytes += chunk.length;

      if (bytes > maxBytes) {
        request.pause();
        resolve(null);
        return;
      }

      chunks.push(chunk);
    });
    request.on('end', () => resolve(Buffer.concat(chunks).toString()));
    request.on('error', reject);
  });
}

function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function getClientTrackingData(requestBody) {
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
    isTimezoneOffset(payload.timezoneOffset)
  );
}

function isObject(value) {
  return typeof value === 'object' && value !== null;
}

function isOptionalString(value, maxLength) {
  return typeof value === 'undefined' || isString(value, maxLength);
}

function isString(value, maxLength) {
  return typeof value === 'string' && value.length <= maxLength;
}

function isTimezoneOffset(value) {
  return Number.isInteger(value) && Math.abs(value) <= MAX_TIMEZONE_OFFSET_MINUTES;
}

function trackEvent(event) {
  return fs.appendFile(TRACKING_FILEPATH, `${JSON.stringify(event)}\n`);
}

function getServerTrackingData(request) {
  return {
    timestamp: Date.now(),
    userAgent: truncate(request.headers['user-agent']),
    xRealIp: truncate(request.headers['x-real-ip']),
  };
}

function truncate(header) {
  return header?.slice(0, MAX_HEADER_LENGTH);
}

function sendServerError(response, error) {
  if (isClientDisconnect(error)) {
    return;
  }

  console.error(error);

  if (response.headersSent) {
    response.destroy();
    return;
  }

  sendStatus(response, 500);
}

function isClientDisconnect(error) {
  return error.code === 'ECONNRESET';
}

function sendStatus(response, statusCode) {
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.statusCode = statusCode;
  response.end(http.STATUS_CODES[statusCode]);
}
