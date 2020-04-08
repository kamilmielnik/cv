import React, { FunctionComponent } from 'react';

import styles from './ContactInfoEntry.module.scss';

interface Props {
  label: string;
  url?: string;
  value: string;
}

const ContactInfoEntry: FunctionComponent<Props> = ({ label, url, value }) => (
  <div className={styles.contactInfoEntry}>
    <div className={styles.label}>{label}</div>

    {url && (
      <a className={styles.value} href={url} rel="noopener noreferrer">
        {value}
      </a>
    )}

    {!url && <div className={styles.value}>{value}</div>}
  </div>
);

export default ContactInfoEntry;
