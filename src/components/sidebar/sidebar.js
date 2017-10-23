import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './sidebar.scss';

const Sidebar = ({ className, onClick }) => (
  <div className={classNames(styles.sidebar, className)} onClick={onClick}>
    sidebar
  </div>
);

Sidebar.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Sidebar;
