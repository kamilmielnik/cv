import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import styles from './Info.module.scss';

interface Props {
  className?: string;
  location: string;
  organization: string;
  timePeriod: string;
}

const Info: FunctionComponent<Props> = ({ className, location, organization, timePeriod }) => (
  <div className={classNames(styles.info, className)}>
    <h3 className={styles.organization}>{organization}</h3>

    <div className={styles.details}>
      <div className={styles.detailsRow}>{location}</div>
      <div className={styles.detailsRow}>{timePeriod}</div>
    </div>
  </div>
);

export default Info;
