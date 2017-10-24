import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const Icon = ({ className, imageUrl, title, url }) => (
  <a className={classNames(styles.icon, className)} href={url}>
    <img className={styles.image} alt={url} src={imageUrl} title={title} />
  </a>
);

Icon.propTypes = {
  className: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Icon;
