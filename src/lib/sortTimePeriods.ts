import { TimePeriod } from 'types';

const sortTimePeriods = (timePeriods: TimePeriod[]): TimePeriod[] =>
  [...timePeriods].sort((a, b) => {
    const aStart = Number(a.start);
    const bStart = Number(b.start);

    if (aStart === bStart) {
      return 0;
    }

    return aStart > bStart ? 1 : -1;
  });

export default sortTimePeriods;
