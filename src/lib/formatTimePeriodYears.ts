import { TimePeriod } from 'types';

const formatTimePeriodYears = (timePeriod: TimePeriod): string => {
  const startYear = timePeriod.start.getFullYear();

  if (timePeriod.end === null) {
    return `${startYear} - present`;
  }

  const endYear = timePeriod.end.getFullYear();

  if (startYear === endYear) {
    return `${startYear}`;
  }

  return `${startYear} - ${endYear}`;
};

export default formatTimePeriodYears;
