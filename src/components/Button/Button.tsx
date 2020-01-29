import React, { FunctionComponent, HTMLProps } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface Props extends HTMLProps<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset' | undefined;
}

const Button: FunctionComponent<Props> = ({ className, children, ...props }) => (
  <button className={classNames(styles.button, className)} {...props}>
    {children}
  </button>
);

export default Button;
