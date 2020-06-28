type EventListener<T> = (value: T) => void;

class ValueMonitor<T> {
  private eventListeners: EventListener<T>[];
  private value: T;

  constructor(value: T) {
    this.eventListeners = [];
    this.value = value;
  }

  addEventListener = (eventListener: EventListener<T>): void => {
    this.eventListeners.push(eventListener);
  };

  removeEventListener = (eventListener: EventListener<T>): void => {
    const index = this.eventListeners.indexOf(eventListener);
    if (index >= 0) {
      this.eventListeners.splice(index, 1);
    }
  };

  get = (): T => this.value;

  set = (value: T): void => {
    this.value = value;
    const eventListeners = [...this.eventListeners];
    for (const eventListener of eventListeners) {
      eventListener(value);
    }
  };
}

export default ValueMonitor;
