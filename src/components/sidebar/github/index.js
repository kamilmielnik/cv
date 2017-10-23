import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import imageUrl from './GitHub-Mark-Light-32px.png';
import styles from './index.scss';

const GITHUB_URL = 'https://github.com/kamilmielnik/cv';

const GitHub = ({ className, onClick }) => (
  <a
    className={classNames(styles.github, className)}
    href={GITHUB_URL}
    title="Fork me on GitHub">
    <img alt={GITHUB_URL} src={imageUrl} />
  </a>
);

GitHub.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default GitHub;
