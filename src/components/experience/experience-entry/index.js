import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Description from './Description';
import Info from './Info';
import Positions from './Positions';

import styles from './experience-entry.module.scss';

const ExperienceEntry = ({
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

ExperienceEntry.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string.isRequired,
  extra: PropTypes.string,
  location: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  positions: PropTypes.array.isRequired,
  timePeriod: PropTypes.string.isRequired
};

export default ExperienceEntry;
