import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { formatTimePeriods, joinContinuousTimePeriods } from 'lib';
import { ExperienceData, TimePeriod } from 'types';

import styles from './Info.module.scss';

interface Props {
  className?: string;
  experience: ExperienceData;
}

const getExperienceTimePeriods = (experience: ExperienceData): TimePeriod[] =>
  experience.positions.reduce(
    (timePeriods, position) => [...timePeriods, ...position.timePeriods],
    []
  );

const Info: FunctionComponent<Props> = ({ className, experience }) => (
  <div className={classNames(styles.info, className)}>
    <h3 className={styles.organization}>
      <a href={experience.url} rel="noopener noreferrer" target="_blank">
        {experience.organization}
      </a>
    </h3>

    <div className={styles.details}>
      <div className={styles.detailsRow}>{experience.location}</div>
      <div
        className={styles.detailsRow}
        title={formatTimePeriods(joinContinuousTimePeriods(getExperienceTimePeriods(experience)))}
      >
        {experience.timePeriod}
      </div>
    </div>
  </div>
);

export default Info;
