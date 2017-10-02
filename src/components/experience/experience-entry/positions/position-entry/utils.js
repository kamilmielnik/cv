const NUMBER_OF_MONTHS_IN_YEAR = 12;
const NUMBER_OF_MONTHS_IN_HALF_YEAR = 6;

export const formatNumberOfMonths = (numberOfMonths) => {
  const years = Math.floor(numberOfMonths / NUMBER_OF_MONTHS_IN_YEAR);
  const months = numberOfMonths - years * NUMBER_OF_MONTHS_IN_YEAR;

  if(years === 0) {
    return `${months} mo`;
  }

  if(months === 0) {
    return `${years} yr`;
  }

  if(months === NUMBER_OF_MONTHS_IN_HALF_YEAR) {
    return `${years}.5 yr`;
  }

  return `${years} yr ${months} mo`;
};

export const sumTimePeriods = (timePeriods) => timePeriods.reduce(
  (numberOfMonths, timePeriod) => numberOfMonths + monthDifference(timePeriod),
  0
);

const monthDifference = (timePeriod) => {
  const toYear = timePeriod.to.getFullYear();
  const fromYear = timePeriod.from.getFullYear();
  const fullYearsDifference = NUMBER_OF_MONTHS_IN_YEAR * (toYear - fromYear);
  const monthsDifference = timePeriod.to.getMonth() - timePeriod.from.getMonth() + 1;
  const difference = fullYearsDifference + monthsDifference;
  return difference;
};
