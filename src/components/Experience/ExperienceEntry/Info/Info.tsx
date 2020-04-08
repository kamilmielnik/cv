import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import styles from './Info.module.scss';

interface Props {
  className?: string;
  location: string;
  organization: string;
  timePeriod: string;
  url: string;
}

const Info: FunctionComponent<Props> = ({ className, location, organization, timePeriod, url }) => (
  <div className={classNames(styles.info, className)}>
    <h3 className={styles.organization}>
      <a href={url} rel="noopener noreferrer">
        {organization}
      </a>
    </h3>

    <div className={styles.details}>
      <div className={styles.detailsRow}>{location}</div>
      <div className={styles.detailsRow}>{timePeriod}</div>
    </div>
  </div>
);

export default Info;
