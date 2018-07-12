import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const ContactInfoEntry = ({ label, url, value }) => (
  <div className={styles.contactInfoEntry}>
    <div className={styles.label}>
      {label}
    </div>

    {url && (
      <a className={styles.value} href={url}>
        {value}
      </a>
    )}

    {!url && (
      <div className={styles.value}>
        {value}
      </div>
    )}
  </div>
);

export default ContactInfoEntry;
