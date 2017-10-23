import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import imageUrl from './GitHub-Mark-Light-32px.png';
import styles from './index.scss';

const GitHub = ({ className, url }) => (
  <a
    className={classNames(styles.github, className)}
    href={url}
    title="Fork me on GitHub">
    <img alt={url} src={imageUrl} />
  </a>
);

GitHub.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default GitHub;
