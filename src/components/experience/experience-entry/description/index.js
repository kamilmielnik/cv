import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

const Description = ({ className, description }) => (
  <div className={classNames(styles.description, className)}>
    {description}
  </div>
);

Description.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string.isRequired
};

export default Description;
