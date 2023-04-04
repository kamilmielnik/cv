import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { ExperienceData } from 'types';

import Description from './Description';
import styles from './ExperienceEntry.module.scss';
import Info from './Info';
import PositionEntry from './PositionEntry';

interface Props {
  className?: string;
  experience: ExperienceData;
}

const ExperienceEntry: FunctionComponent<Props> = ({ className, experience }) => (
  <div className={classNames(styles.experienceEntry, className)}>
    <Info className={styles.info} experience={experience} />

    <div className={styles.details}>
      {experience.positions.map((positionEntry, index) => (
        <PositionEntry className={styles.positionEntry} key={index} position={positionEntry} />
      ))}
      <hr />
      <Description extra={experience.extra}>{experience.description}</Description>
    </div>
  </div>
);

export default ExperienceEntry;
