import { ExperienceData, TimePeriod } from 'types';

const getExperienceTimePeriods = (experience: ExperienceData): TimePeriod[] =>
  experience.positions.reduce(
    (timePeriods, position) => [...timePeriods, ...position.timePeriods],
    []
  );

export default getExperienceTimePeriods;
