import classNames from 'classnames';
import { FunctionComponent, HTMLProps } from 'react';

import SvgIcon from '../SvgIcon';

import Link from './Link';
import styles from './Button.module.scss';

interface Props extends HTMLProps<HTMLButtonElement> {
  icon: BrowserSpriteSymbol;
  type: 'button' | 'submit' | 'reset' | undefined;
}

const Button: FunctionComponent<Props> = ({ className, children, icon, ...props }) => (
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
