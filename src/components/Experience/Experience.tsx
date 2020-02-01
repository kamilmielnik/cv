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
      <ExperienceEntry key={index} className={styles.experienceEntry} {...experienceEntry} />
    ))}
  </div>
);

export default Experience;
