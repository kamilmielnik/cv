import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import imageUrl from './GitHub-Mark-Light-32px.png';
import styles from './styles.scss';

const GitHub = ({ className, url }) => (
  <a className={classNames(styles.gitHub, className)} href={url}>
    <div className={styles.container}>
      <img alt={url} src={imageUrl} />

      <span>
        Fork me on GitHub
      </span>
    </div>
  </a>
);

GitHub.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default GitHub;
