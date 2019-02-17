import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { formatNumberOfMonths, sumTimePeriods } from './utils';
import styles from './position-entry.module.scss';

const PositionEntry = ({ className, timePeriod, timePeriods, title }) => (
  <div className={classNames(styles.positionEntry, className)}>
    <div className={styles.timePeriod}>
      {timePeriod || formatNumberOfMonths(sumTimePeriods(timePeriods))}
    </div>

    <h4 className={styles.title}>
      {title}
    </h4>
  </div>
);

PositionEntry.propTypes = {
  className: PropTypes.string,
  timePeriod: PropTypes.string,
  timePeriods: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired
  })),
  title: PropTypes.string.isRequired
};

PositionEntry.defaultProps = {
  timePeriods: []
};

export default PositionEntry;
