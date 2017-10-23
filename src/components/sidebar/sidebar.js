import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GitHub from './github';
import styles from './sidebar.scss';

const Sidebar = ({ className, onClick }) => (
  <div className={classNames(styles.sidebar, className)} onClick={onClick}>
    <div className={styles.header}>
      sidebar
    </div>

    <div className={styles.footer}>
      <GitHub />
    </div>
  </div>
);

Sidebar.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Sidebar;
