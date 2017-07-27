import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Page = ({ children }) => (
  <div className={styles.page}>
    <div className={styles.pageContent}>
      {children}
    </div>
  </div>
);

Page.propTypes = {
  children: PropTypes.node.isRequired
};

export default Page;
