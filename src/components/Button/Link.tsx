import classNames from 'classnames';
import { FunctionComponent, HTMLProps } from 'react';

import SvgIcon from '../SvgIcon';

import styles from './Button.module.scss';

interface Props extends HTMLProps<HTMLAnchorElement> {
  icon: BrowserSpriteSymbol;
}

const Link: FunctionComponent<Props> = ({ className, children, icon, ...props }) => (
  <a className={classNames(styles.button, styles.content, className)} {...props}>
    <SvgIcon className={styles.icon} icon={icon} />
    {children}
  </a>
);

export default Link;
