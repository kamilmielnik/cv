import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

const Name = ({ className, name }) => (
  <h1 className={classNames(styles.name, className)}>
    {name}
  </h1>
);

Name.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default Name;
