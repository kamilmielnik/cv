import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const Info = ({ className, location, organization, timePeriod }) => (
  <div className={classNames(styles.info, className)}>
    <h3 className={styles.organization}>
      {organization}
    </h3>

    <div className={styles.details}>
      <div>
        {location}
      </div>

      <div>
        {timePeriod}
      </div>
    </div>
  </div>
);

Info.propTypes = {
  className: PropTypes.string,
  location: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  timePeriod: PropTypes.string.isRequired
};

export default Info;
