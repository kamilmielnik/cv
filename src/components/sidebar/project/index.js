import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const Project = ({ className, gitHubUrl, previewUrl, title, url }) => (
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

Project.propTypes = {
  className: PropTypes.string,
  gitHubUrl: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Project;
