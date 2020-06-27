import React, { FunctionComponent, HTMLProps } from 'react';
import classNames from 'classnames';

import Link from './Link';
import styles from './Button.module.scss';

interface Props extends HTMLProps<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset' | undefined;
}

const Button: FunctionComponent<Props> = ({ className, children, ...props }) => (
  <button className={classNames(styles.button, className)} {...props}>
    <span className={styles.buttonContent}>{children}</span>
  </button>
);

export default Object.assign(Button, {
  Link
});
