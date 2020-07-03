import { TimePeriod } from 'types';

import sortTimePeriods from './sortTimePeriods';

const DAY = 24 * 60 * 60 * 1000;

const joinContinuousTimePeriods = (timePeriods: TimePeriod[]): TimePeriod[] => {
  if (timePeriods.length === 0) {
    return [];
  }

  const sortedTimePeriods = sortTimePeriods(timePeriods);
  const [first, ...rest] = sortedTimePeriods;

  return rest.reduce(
    (result, next) => {
      const current = result[result.length - 1];
      const currentEnd = Number(current.end);
      const nextStart = Number(next.start);
      const difference = Math.abs(currentEnd - nextStart);

      if (difference <= DAY) {
        return [
          ...result.slice(0, -1),
          {
            ...current,
            end: next.end
          }
        ];
      }

      return [...result, next];
    },
    [first]
  );
};

export default joinContinuousTimePeriods;
