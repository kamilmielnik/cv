import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PositionEntry from './position-entry';
import styles from './positions.module.scss';

const Positions = ({ className, positions }) => (
  <div className={classNames(styles.positions, className)}>
    {positions.map((positionEntry, index) => (
      <PositionEntry
        key={index}
        className={styles.positionEntry}
        {...positionEntry} />
    ))}
  </div>
);

Positions.propTypes = {
  className: PropTypes.string,
  positions: PropTypes.array.isRequired
};

export default Positions;
