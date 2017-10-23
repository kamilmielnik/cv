import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GitHub from './git-hub';
import styles from './sidebar.scss';

const Sidebar = ({ className, gitHubUrl, onClick }) => (
  <div className={classNames(styles.sidebar, className)} onClick={onClick}>
    <div className={styles.header}>
      sidebar
    </div>

    <div className={styles.footer}>
      <GitHub url={gitHubUrl} />
    </div>
  </div>
);

Sidebar.propTypes = {
  className: PropTypes.string,
  gitHubUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Sidebar;
