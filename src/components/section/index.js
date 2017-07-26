import React, { PropTypes } from 'react';
import styles from './styles.scss';

const Section = ({ children, title }) => (
  <div className={styles.section}>
    <h2>{title}</h2>
    {children}
  </div>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default Section;
