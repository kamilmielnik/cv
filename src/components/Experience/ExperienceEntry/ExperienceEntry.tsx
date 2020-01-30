import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { WorkExperienceData } from 'types';

import Description from './Description';
import Info from './Info';
import Positions from './Positions';

import styles from './ExperienceEntry.module.scss';

interface Props extends WorkExperienceData {
  className?: string;
}

const ExperienceEntry: FunctionComponent<Props> = ({
  className,
  description,
  extra,
  location,
  organization,
  positions,
  timePeriod
}) => (
  <div className={classNames(styles.experienceEntry, className)}>
    <Info
      className={styles.info}
      location={location}
      organization={organization}
      timePeriod={timePeriod}
    />
    <div className={styles.details}>
      <Positions className={styles.positions} positions={positions} />
      <div className={styles.separator} />
      <Description className={styles.description} extra={extra}>
        {description}
      </Description>
    </div>
  </div>
);

export default ExperienceEntry;