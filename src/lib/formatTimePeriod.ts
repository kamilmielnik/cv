import { TimePeriod } from 'types';

import formatDate from './formatDate';

const formatTimePeriod = (timePeriod: TimePeriod): string => {
  const start = formatDate(timePeriod.start);

  if (timePeriod.end === null) {
    return `${start} - present`;
  }

  const end = formatDate(timePeriod.end);
  return `${start} - ${end}`;
};

export default formatTimePeriod;
