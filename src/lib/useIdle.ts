import { useEffect, useState } from 'react';

import ValueMonitor from './ValueMonitor';

const globalIdleMonitor = new ValueMonitor<boolean>(false);

const watchGlobalIdle = () => {
  const requestIdleCallback = (global as any).requestIdleCallback;

  if (requestIdleCallback) {
    requestIdleCallback(() => {
      wait(100).then(() => globalIdleMonitor.set(true));
    });
  } else {
    wait(500).then(() => globalIdleMonitor.set(true));
  }
};

const wait = (time: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, time));

watchGlobalIdle();

const useIdle = (): boolean => {
  const [idle, setIdle] = useState<boolean>(globalIdleMonitor.get());

  useEffect(() => {
    globalIdleMonitor.addEventListener(setIdle);

    return () => {
      globalIdleMonitor.removeEventListener(setIdle);
    };
  }, []);

  return idle;
};

export default useIdle;
