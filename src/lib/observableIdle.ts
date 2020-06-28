import ObservableValue from './ObservableValue';
import wait from './wait';

const DEFAULT_UNTIL_IDLE = 500;
const SAFETY_IDLE = 100;

const observableIdle = new ObservableValue<boolean>(false);
const requestIdleCallback = (global as any).requestIdleCallback;

if (requestIdleCallback) {
  requestIdleCallback(() => {
    wait(SAFETY_IDLE).then(() => observableIdle.set(true));
  });
} else {
  wait(DEFAULT_UNTIL_IDLE).then(() => observableIdle.set(true));
}

export default observableIdle;
