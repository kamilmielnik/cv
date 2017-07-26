import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

const Button = ({ className, children, onClick }) => (
  <div className={classNames(styles.button, className)} onClick={onClick}>
    {children}
  </div>
);

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default Button;
