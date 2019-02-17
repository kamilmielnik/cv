import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './description.module.scss';

const Description = ({ className, description, extra }) => (
  <div className={classNames(styles.description, className)}>
    {description}

    {extra && (
      <div className={styles.extra}>
        {extra}
      </div>
    )}
  </div>
);

Description.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string.isRequired,
  extra: PropTypes.string
};

export default Description;
