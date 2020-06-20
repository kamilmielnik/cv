import React, { FunctionComponent } from 'react';

import { ExperienceData } from 'types';

import ExperienceEntry from './ExperienceEntry';
import styles from './Experience.module.scss';

interface Props {
  experience: ExperienceData[];
}

const Experience: FunctionComponent<Props> = ({ experience }) => (
  <div>
    {experience.map((experienceEntry, index) => (
      <ExperienceEntry
        className={styles.experienceEntry}
        experience={experienceEntry}
        key={index}
      />
    ))}
  </div>
);

export default Experience;
