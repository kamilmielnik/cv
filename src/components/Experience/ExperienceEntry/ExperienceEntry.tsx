import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { ExperienceData } from 'types';

import Description from './Description';
import Info from './Info';
import Positions from './Positions';

import styles from './ExperienceEntry.module.scss';

interface Props extends ExperienceData {
  className?: string;
}

const ExperienceEntry: FunctionComponent<Props> = ({
  className,
  description,
  extra,
  location,
  organization,
  positions,
  timePeriod,
  url
}) => (
  <div className={classNames(styles.experienceEntry, className)}>
    <Info
      className={styles.info}
      location={location}
      organization={organization}
      timePeriod={timePeriod}
      url={url}
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
