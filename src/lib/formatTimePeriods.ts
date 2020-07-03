import { TimePeriod } from 'types';

import formatTimePeriod from './formatTimePeriod';
import sortTimePeriods from './sortTimePeriods';

const formatTimePeriods = (timePeriods: TimePeriod[]): string => {
  const sortedTimePeriods = sortTimePeriods(timePeriods);
  return sortedTimePeriods.map(formatTimePeriod).join('\n');
};

export default formatTimePeriods;
