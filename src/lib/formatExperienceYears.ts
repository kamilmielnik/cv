import { ExperienceData } from 'types';

import formatTimePeriodYears from './formatTimePeriodYears';
import getExperienceTimePeriods from './getExperienceTimePeriods';
import joinContinuousTimePeriods from './joinContinuousTimePeriods';

const formatExperienceYears = (experience: ExperienceData): string => {
  const timePeriods = getExperienceTimePeriods(experience);
  const continuousTimePeriods = joinContinuousTimePeriods(timePeriods);
  return continuousTimePeriods.map(formatTimePeriodYears).join(', ');
};

export default formatExperienceYears;
