import React from 'react';
import PropTypes from 'prop-types';
import PositionEntry from './position-entry';
import styles from './positions.module.scss';

const Positions = ({ className, positions }) => (
  <div className={className}>
    {positions.map((positionEntry, index) => (
      <PositionEntry key={index} className={styles.positionEntry} {...positionEntry} />
    ))}
  </div>
);

Positions.propTypes = {
  className: PropTypes.string,
  positions: PropTypes.array.isRequired
};

export default Positions;
