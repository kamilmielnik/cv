import classNames from 'classnames';
import { FunctionComponent, ReactNode } from 'react';

import styles from './Description.module.scss';

interface Props {
  children: ReactNode;
  className?: string;
}

const Description: FunctionComponent<Props> = ({ children, className }) => (
  <h2 className={classNames(styles.description, className)}>{children}</h2>
);

export default Description;
