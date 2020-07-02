const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

const formatDate = (date: Date): string => dateTimeFormat.format(date);

export default formatDate;
