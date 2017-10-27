import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GitHubIcon from './git-hub-icon';
import LinkedInIcon from './linked-in-icon';
import styles from './styles.scss';

const Icons = ({ className }) => (
  <div className={classNames(styles.icons, className)}>
    <GitHubIcon className={styles.icon} />
    <LinkedInIcon className={styles.icon} />
  </div>
);

Icons.propTypes = {
  className: PropTypes.string
};

export default Icons;
