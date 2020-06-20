import React, { FunctionComponent } from 'react';

import { ContactInfoData } from 'types';

import styles from './ContactInfoEntry.module.scss';

interface Props {
  contactInfo: ContactInfoData;
}

const ContactInfoEntry: FunctionComponent<Props> = ({ contactInfo }) => (
  <div className={styles.contactInfoEntry}>
    <div className={styles.label}>{contactInfo.label}</div>

    {contactInfo.url && (
      <a className={styles.value} href={contactInfo.url} rel="noopener noreferrer" target="_blank">
        {contactInfo.value}
      </a>
    )}

    {!contactInfo.url && <div className={styles.value}>{contactInfo.value}</div>}
  </div>
);

export default ContactInfoEntry;
