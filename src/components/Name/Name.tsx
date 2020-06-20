import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Name.module.scss';

interface Props {
  children: ReactNode;
  className?: string;
}

const Name: FunctionComponent<Props> = ({ children, className }) => (
  <h1 className={classNames(styles.name, className)}>{children}</h1>
);

export default Name;
