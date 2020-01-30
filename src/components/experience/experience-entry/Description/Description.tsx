import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Description.module.scss';

interface Props {
  children: ReactNode;
  className?: string;
  extra?: ReactNode;
}

const Description: FunctionComponent<Props> = ({ children, className, extra }) => (
  <div className={classNames(styles.description, className)}>
    {children}

    {extra && <div className={styles.extra}>{extra}</div>}
  </div>
);

export default Description;
