import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GitHub from './git-hub';
import Item from './item';
import cv from './projects/cv.png';
import styles from './sidebar.scss';

const items = [
  {
    previewUrl: cv,
    url: 'http://kamilmielnik.com/',
    title: 'CV'
  },
  {
    previewUrl: 'https://raw.githubusercontent.com/kamilmielnik/scrabble-solver/master/screenshot.png',
    url: 'http://scrabble-solver.kamilmielnik.com/',
    title: 'Scrabble Solver'
  }
];

const Sidebar = ({ className, gitHubUrl, onClick }) => (
  <div className={classNames(styles.sidebar, className)} onClick={onClick}>

    <div className={styles.header}>
      Check out my other projects!
    </div>

    <div className={styles.items}>
      {items.map((item, index) => (
        <Item key={index} {...item} />
      ))}
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
