import { ExperienceData } from 'types';

import formatTimePeriods from './formatTimePeriods';
import getExperienceTimePeriods from './getExperienceTimePeriods';
import joinContinuousTimePeriods from './joinContinuousTimePeriods';

const formatExperienceTimePeriods = (experience: ExperienceData): string => {
  const timePeriods = getExperienceTimePeriods(experience);
  const continuousTimePeriods = joinContinuousTimePeriods(timePeriods);
  return formatTimePeriods(continuousTimePeriods);
};

export default formatExperienceTimePeriods;
