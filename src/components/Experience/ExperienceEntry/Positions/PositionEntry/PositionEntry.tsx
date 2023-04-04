import classNames from 'classnames';
import { FunctionComponent } from 'react';

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

    <h4 className={styles.title}>
      {position.url && (
        <a href={position.url} rel="noopener noreferrer" target="_blank" title={position.title}>
          {position.title}
        </a>
      )}

      {!position.url && position.title}
    </h4>
  </div>
);

export default PositionEntry;
