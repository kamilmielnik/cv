import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Description.module.scss';

interface Props {
  children: ReactNode;
  className?: string;
}

const Description: FunctionComponent<Props> = ({ children, className }) => (
  <div className={classNames(styles.description, className)}>{children}</div>
);

export default Description;
