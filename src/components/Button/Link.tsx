import React, { FunctionComponent, HTMLProps } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface Props extends HTMLProps<HTMLAnchorElement> {}

const Link: FunctionComponent<Props> = ({ className, children, ...props }) => (
  <a className={classNames(styles.button, className)} {...props}>
    {children}
  </a>
);

export default Link;
