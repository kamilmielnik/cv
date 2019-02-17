import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './description.module.scss';

const Description = ({ className, description }) => (
  <div className={classNames(styles.description, className)}>{description}</div>
);

Description.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string.isRequired
};

export default Description;
