type Subscription<T> = (value: T) => void;
type Unsubscribe = () => void;

class ObservableValue<T> {
  private subscriptions: Subscription<T>[];
  private value: T;

  constructor(value: T) {
    this.subscriptions = [];
    this.value = value;
  }

  get = (): T => this.value;

  set = (value: T): void => {
    if (this.value === value) {
      return;
    }

    this.value = value;

    for (const subscription of [...this.subscriptions]) {
      subscription(value);
    }
  };

  subscribe = (subscription: Subscription<T>): Unsubscribe => {
    this.subscriptions.push(subscription);

    return () => {
      const index = this.subscriptions.indexOf(subscription);

      if (index >= 0) {
        this.subscriptions.splice(index, 1);
      }
    };
  };
}

export default ObservableValue;
