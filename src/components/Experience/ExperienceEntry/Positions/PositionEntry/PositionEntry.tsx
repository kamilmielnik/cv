import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { formatNumberOfMonths, formatTimePeriods, sumTimePeriods } from 'lib';
import { PositionData } from 'types';

import styles from './PositionEntry.module.scss';

interface Props {
  className?: string;
  position: PositionData;
}

const PositionEntry: FunctionComponent<Props> = ({ className, position }) => (
  <div className={classNames(styles.positionEntry, className)}>
    <div className={styles.timePeriod} title={formatTimePeriods(position.timePeriods)}>
      {position.timePeriod || formatNumberOfMonths(sumTimePeriods(position.timePeriods))}
    </div>

    <h4 className={styles.title}>{position.title}</h4>
  </div>
);

export default PositionEntry;
