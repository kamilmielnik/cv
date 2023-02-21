import classNames from 'classnames';
import { FunctionComponent, HTMLProps } from 'react';

import SvgIcon from '../SvgIcon';

import styles from './Button.module.scss';
import Link from './Link';

interface Props extends HTMLProps<HTMLButtonElement> {
  icon: BrowserSpriteSymbol;
  type: 'button' | 'submit' | 'reset' | undefined;
}

const Button: FunctionComponent<Props> = ({ children, className, icon, ...props }) => (
  <button className={classNames(styles.button, className)} {...props}>
    <span className={styles.content}>
      <SvgIcon className={styles.icon} icon={icon} />
      {children}
    </span>
  </button>
);

export default Object.assign(Button, {
  Link
});
