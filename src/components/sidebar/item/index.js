import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const Item = ({ className, previewUrl, title, url }) => (
  <a className={styles.link} href={url}>
    <div className={classNames(styles.item, className)}>
      <div
        className={styles.preview}
        style={{
          backgroundImage: `url(${previewUrl})`
        }} />

      <div className={styles.title}>
        {title}
      </div>
    </div>
  </a>
);

Item.propTypes = {
  className: PropTypes.string,
  previewUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Item;
