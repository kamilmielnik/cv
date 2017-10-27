import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';

const getCurrentYear = () => new Date().getFullYear();

const Copyright = ({ className }) => (
  <div className={classNames(styles.copyright, className)}>
    Copyright © {getCurrentYear()}
    &nbsp;
    <a href="http://kamilmielnik.com">
      Kamil Mielnik
    </a>
  </div>
);

Copyright.propTypes = {
  className: PropTypes.string
};

export default Copyright;
