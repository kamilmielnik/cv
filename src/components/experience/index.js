import React from 'react';
import PropTypes from 'prop-types';
import ExperienceEntry from './experience-entry';
import styles from './styles.scss';

const Experience = ({ experience }) => (
  <div className={styles.experience}>
    {experience.map((experienceEntry, index) => (
      <ExperienceEntry
        key={index}
        className={styles.experienceEntry}
        {...experienceEntry} />
    ))}
  </div>
);

Experience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default Experience;
