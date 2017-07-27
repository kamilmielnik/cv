import React from 'react';
import PropTypes from 'prop-types';
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
