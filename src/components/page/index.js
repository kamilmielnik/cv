import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const Page = ({ children, className }) => (
  <div className={classNames(styles.page, className)}>
    <div className={styles.pageContent}>
      {children}
    </div>
  </div>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Page;
