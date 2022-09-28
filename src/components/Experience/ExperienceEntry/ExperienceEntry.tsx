import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { ExperienceData } from 'types';

import Description from './Description';
import Info from './Info';
import Positions from './Positions';

import styles from './ExperienceEntry.module.scss';

interface Props {
  className?: string;
  experience: ExperienceData;
}

const ExperienceEntry: FunctionComponent<Props> = ({ className, experience }) => (
  <div className={classNames(styles.experienceEntry, className)}>
    <Info className={styles.info} experience={experience} />

    <div className={styles.details}>
      <Positions className={styles.positions} positions={experience.positions} />

      <div className={styles.separator} />

      <Description className={styles.description} extra={experience.extra}>
        {experience.description}
      </Description>
    </div>
  </div>
);

export default ExperienceEntry;
