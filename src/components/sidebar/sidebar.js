import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import projects from 'data/projects';
import Copyright from './copyright';
import Icons from './icons';
import Project from './project';
import styles from './sidebar.scss';

const Sidebar = ({ className, onClick }) => (
  <div className={classNames(styles.sidebar, className)} onClick={onClick}>
    <div className={styles.header}>
      My projects
    </div>

    <div className={styles.projects}>
      {projects.map((project, index) => (
        <Project key={index} {...project} />
      ))}
    </div>

    <div className={styles.footer}>
      <Icons />
      <Copyright className={styles.copyright} />
    </div>
  </div>
);

Sidebar.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Sidebar;
