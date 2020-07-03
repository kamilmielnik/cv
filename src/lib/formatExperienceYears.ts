import { ExperienceData } from 'types';

import formatTimePeriodsYears from './formatTimePeriodsYears';
import getExperienceTimePeriods from './getExperienceTimePeriods';
import joinContinuousTimePeriods from './joinContinuousTimePeriods';

const formatExperienceYears = (experience: ExperienceData): string => {
  const timePeriods = getExperienceTimePeriods(experience);
  const continuousTimePeriods = joinContinuousTimePeriods(timePeriods);
  return formatTimePeriodsYears(continuousTimePeriods);
};

export default formatExperienceYears;
