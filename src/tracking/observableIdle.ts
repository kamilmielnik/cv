import { Observable, wait } from 'lib';

const DEFAULT_UNTIL_IDLE = 500;
const SAFETY_IDLE = 100;

const observableIdle = new Observable<boolean>(false);
const requestIdleCallback = globalThis.requestIdleCallback;

if (requestIdleCallback) {
  requestIdleCallback(() => {
    wait(SAFETY_IDLE).then(() => observableIdle.set(true));
  });
} else {
  wait(DEFAULT_UNTIL_IDLE).then(() => observableIdle.set(true));
}

export default observableIdle;
