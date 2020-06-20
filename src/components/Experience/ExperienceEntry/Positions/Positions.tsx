import React, { FunctionComponent } from 'react';

import { PositionData } from 'types';

import PositionEntry from './PositionEntry';
import styles from './Positions.module.scss';

interface Props {
  className?: string;
  positions: PositionData[];
}

const Positions: FunctionComponent<Props> = ({ className, positions }) => (
  <div className={className}>
    {positions.map((positionEntry, index) => (
      <PositionEntry className={styles.positionEntry} key={index} position={positionEntry} />
    ))}
  </div>
);

export default Positions;
