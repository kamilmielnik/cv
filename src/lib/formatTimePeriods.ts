import { TimePeriod } from 'types';

import formatTimePeriod from './formatTimePeriod';

const formatTimePeriods = (timePeriods: TimePeriod[]): string =>
  timePeriods.map(formatTimePeriod).join(' and ');

export default formatTimePeriods;
