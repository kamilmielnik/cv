import { ExperienceData, TimePeriod } from 'types';

import formatTimePeriods from './formatTimePeriods';
import joinContinuousTimePeriods from './joinContinuousTimePeriods';

const formatExperienceTimePeriods = (experience): string => {
  const timePeriods = getExperienceTimePeriods(experience);
  const continuousTimePeriods = joinContinuousTimePeriods(timePeriods);
  return formatTimePeriods(continuousTimePeriods);
};

const getExperienceTimePeriods = (experience: ExperienceData): TimePeriod[] =>
  experience.positions.reduce(
    (timePeriods, position) => [...timePeriods, ...position.timePeriods],
    []
  );

export default formatExperienceTimePeriods;
