import React, { PropTypes } from 'react';
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

ContactInfoEntry.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string,
  value: PropTypes.node.isRequired
};

export default ContactInfoEntry;
