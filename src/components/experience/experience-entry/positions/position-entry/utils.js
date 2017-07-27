const NUMBER_OF_MONTHS_IN_YEAR = 12;
const NUMBER_OF_MONTHS_IN_HALF_YEAR = 6;

export const formatNumberOfMonths = (numberOfMonths) => {
  const years = Math.floor(numberOfMonths / NUMBER_OF_MONTHS_IN_YEAR);
  const months = numberOfMonths - years * NUMBER_OF_MONTHS_IN_YEAR;

  if (years === 0) {
    return `${months} mo`;
  }

  if (months === 0) {
    return `${years} yr`;
  }

  if (months === NUMBER_OF_MONTHS_IN_HALF_YEAR) {
    return `${years}.5 yr`;
  }

  return `${years} yr ${months} mo`;
};

export const sumTimePeriods = (timePeriods) => timePeriods.reduce(
  (numberOfMonths, { from, to }) => numberOfMonths + monthDifference(from, to),
  0
);

const monthDifference = (from, to) => Math.ceil(to.diff(from, 'months', true));
