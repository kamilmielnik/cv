import React, { FunctionComponent } from 'react';

import { TimePeriod } from 'types';

import PositionEntry from './PositionEntry';
import styles from './Positions.module.scss';

interface Props {
  className?: string;
  positions: {
    timePeriod?: string;
    timePeriods: TimePeriod[];
    title: string;
  }[];
}

const Positions: FunctionComponent<Props> = ({ className, positions }) => (
  <div className={className}>
    {positions.map((positionEntry, index) => (
      <PositionEntry key={index} className={styles.positionEntry} {...positionEntry} />
    ))}
  </div>
);

export default Positions;
