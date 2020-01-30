import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { TimePeriod } from 'types';

import { formatNumberOfMonths, sumTimePeriods } from './lib';

import styles from './PositionEntry.module.scss';

interface Props {
  className?: string;
  timePeriod?: string;
  timePeriods: TimePeriod[];
  title: string;
}

const PositionEntry: FunctionComponent<Props> = ({ className, timePeriod, timePeriods, title }) => (
  <div className={classNames(styles.positionEntry, className)}>
    <div className={styles.timePeriod}>
      {timePeriod || formatNumberOfMonths(sumTimePeriods(timePeriods))}
    </div>
    <h4 className={styles.title}>{title}</h4>
  </div>
);

export default PositionEntry;
