import { TimePeriod } from 'types';

import formatTimePeriodYears from './formatTimePeriodYears';
import sortTimePeriods from './sortTimePeriods';

const formatTimePeriodsYears = (timePeriods: TimePeriod[]): string => {
  const sortedTimePeriods = sortTimePeriods(timePeriods);
  return sortedTimePeriods.map(formatTimePeriodYears).join(', ');
};

export default formatTimePeriodsYears;
