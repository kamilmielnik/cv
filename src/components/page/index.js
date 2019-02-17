import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './page.module.scss';

const Page = ({ children, className }) => (
  <div className={classNames(styles.page, className)}>
    {children}
  </div>
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Page;
