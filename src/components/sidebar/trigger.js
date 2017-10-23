import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './trigger.scss';

const Trigger = ({ className, ...props }) => (
  <div className={classNames(styles.trigger, className)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      width="30"
      height="30"
      focusable="false"
      {...props}>
      <title>Menu</title>
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeMiterlimit="10"
        d="M4 7h22M4 15h22M4 23h22" />
    </svg>
  </div>
);

Trigger.propTypes = {
  className: PropTypes.string
};

export default Trigger;
