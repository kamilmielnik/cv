import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { ExperienceData } from 'types';

import styles from './Info.module.scss';

interface Props {
  className?: string;
  experience: ExperienceData;
}

const Info: FunctionComponent<Props> = ({ className, experience }) => (
  <div className={classNames(styles.info, className)}>
    <h3 className={styles.organization}>
      <a href={experience.url} rel="noopener noreferrer" target="_blank">
        {experience.organization}
      </a>
    </h3>

    <div className={styles.details}>
      <div className={styles.detailsRow}>{experience.location}</div>
      <div className={styles.detailsRow}>{experience.timePeriod}</div>
    </div>
  </div>
);

export default Info;
