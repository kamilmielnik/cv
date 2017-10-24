import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import projects from 'data/projects';
import GitHubIcon from './git-hub-icon';
import LinkedInIcon from './linked-in-icon';
import Project from './project';
import styles from './sidebar.scss';

const Sidebar = ({ className, onClick }) => (
  <div className={classNames(styles.sidebar, className)} onClick={onClick}>
    <div className={styles.header}>
      My projects
    </div>

    <div className={styles.items}>
      {projects.map((project, index) => (
        <Project key={index} {...project} />
      ))}
    </div>

    <div className={styles.footer}>
      <GitHubIcon className={styles.icon} />
      <LinkedInIcon className={styles.icon} />
    </div>
  </div>
);

Sidebar.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Sidebar;
