import { FunctionComponent, ReactNode } from 'react';

import styles from './Section.module.scss';

interface Props {
  children: ReactNode;
  title: string;
}

const Section: FunctionComponent<Props> = ({ children, title }) => (
  <div className={styles.section}>
    <h2 className={styles.title}>{title}</h2>
    {children}
  </div>
);
export default Section;
