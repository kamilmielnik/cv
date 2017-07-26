import React, { PropTypes } from 'react';
import Description from './description';
import Info from './info';
import Positions from './positions';
import styles from './styles.scss';

const ExperienceEntry = ({ description, location, organization, positions, timePeriod }) => (
  <div className={styles.experienceEntry}>
    <Info
      className={styles.info}
      location={location}
      organization={organization}
      timePeriod={timePeriod} />

    <div className={styles.details}>
      <Positions className={styles.positions} positions={positions} />
      <div className={styles.separator} />
      <Description className={styles.description} description={description} />
    </div>
  </div>
);

ExperienceEntry.propTypes = {
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  positions: PropTypes.array.isRequired,
  timePeriod: PropTypes.string.isRequired
};

export default ExperienceEntry;
