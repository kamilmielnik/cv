import minifyHtml from '@minify-html/node';

const NUMBER_OF_MONTHS_IN_YEAR = 12;
const NUMBER_OF_MONTHS_IN_HALF_YEAR = 6;

export function formatNumberOfMonths(numberOfMonths) {
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
}

function pluralizeMonths(months) {
  return `mo${months === 1 ? '' : 's'}`;
}

function pluralizeYears(years) {
  return `yr${years === 1 ? '' : 's'}`;
}

export function sumTimePeriods(timePeriods) {
  return timePeriods.reduce((numberOfMonths, timePeriod) => numberOfMonths + monthDifference(timePeriod), 0);
}

function monthDifference(timePeriod) {
  const endDate = timePeriod.end || new Date();
  const endYear = endDate.getFullYear();
  const startYear = timePeriod.start.getFullYear();
  const fullYearsDifference = NUMBER_OF_MONTHS_IN_YEAR * (endYear - startYear);
  const monthsDifference = endDate.getMonth() - timePeriod.start.getMonth() + 1;
  const difference = fullYearsDifference + monthsDifference;
  return difference;
}

export function minify(htmlOrCss) {
  return String(minifyHtml.minify(Buffer.from(htmlOrCss), {}));
}
