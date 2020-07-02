import { TimePeriod } from 'types';

const NUMBER_OF_MONTHS_IN_YEAR = 12;

const sumTimePeriods = (timePeriods: TimePeriod[]): number =>
  timePeriods.reduce(
    (numberOfMonths, timePeriod) => numberOfMonths + monthDifference(timePeriod),
    0
  );

const monthDifference = (timePeriod: TimePeriod): number => {
  const endDate = timePeriod.end || new Date();
  const endYear = endDate.getFullYear();
  const startYear = timePeriod.start.getFullYear();
  const fullYearsDifference = NUMBER_OF_MONTHS_IN_YEAR * (endYear - startYear);
  const monthsDifference = endDate.getMonth() - timePeriod.start.getMonth() + 1;
  const difference = fullYearsDifference + monthsDifference;
  return difference;
};

export default sumTimePeriods;
