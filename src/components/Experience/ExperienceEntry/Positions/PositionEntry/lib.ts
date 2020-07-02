import { TimePeriod } from 'types';

const NUMBER_OF_MONTHS_IN_YEAR = 12;
const NUMBER_OF_MONTHS_IN_HALF_YEAR = 6;

const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

export const formatTimePeriods = (timePeriods: TimePeriod[]): string =>
  timePeriods.map(formatTimePeriod).join(' and ');

const formatTimePeriod = (timePeriod: TimePeriod): string =>
  `${dateTimeFormat.format(timePeriod.from)} - ${dateTimeFormat.format(timePeriod.to)}`;

export const formatNumberOfMonths = (numberOfMonths: number): string => {
  const years = Math.floor(numberOfMonths / NUMBER_OF_MONTHS_IN_YEAR);
  const months = numberOfMonths - years * NUMBER_OF_MONTHS_IN_YEAR;

  if (years === 0 && months === NUMBER_OF_MONTHS_IN_HALF_YEAR) {
    return '0.5 yr';
  }

  if (years === 0) {
    return `${months} ${pluralizeMonths(months)}`;
  }

  if (months === 0) {
    return `${years} ${pluralizeYears(years)}`;
  }

  if (months === NUMBER_OF_MONTHS_IN_HALF_YEAR) {
    return `${years}.5 ${pluralizeYears(years)}`;
  }

  return `${years} ${pluralizeYears(years)} ${months} ${pluralizeMonths(months)}`;
};

const pluralizeMonths = (months: number): string => `mo${months === 1 ? '' : 's'}`;

const pluralizeYears = (years: number): string => `yr${years === 1 ? '' : 's'}`;

export const sumTimePeriods = (timePeriods: TimePeriod[]): number =>
  timePeriods.reduce(
    (numberOfMonths, timePeriod) => numberOfMonths + monthDifference(timePeriod),
    0
  );

const monthDifference = (timePeriod: TimePeriod): number => {
  const toYear = timePeriod.to.getFullYear();
  const fromYear = timePeriod.from.getFullYear();
  const fullYearsDifference = NUMBER_OF_MONTHS_IN_YEAR * (toYear - fromYear);
  const monthsDifference = timePeriod.to.getMonth() - timePeriod.from.getMonth() + 1;
  const difference = fullYearsDifference + monthsDifference;
  return difference;
};
