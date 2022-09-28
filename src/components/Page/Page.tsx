import classNames from 'classnames';
import { FunctionComponent, ReactNode } from 'react';

import styles from './Page.module.scss';

interface Props {
  children: ReactNode;
  className?: string;
}

const Page: FunctionComponent<Props> = ({ children, className }) => (
  <div className={classNames(styles.page, className)}>{children}</div>
);

export default Page;
