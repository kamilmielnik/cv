import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { ContactInfoData } from 'types';

import styles from './ContactInfo.module.scss';
import ContactInfoEntry from './ContactInfoEntry';

interface Props {
  className?: string;
  contactInfo: ContactInfoData[];
}

const ContactInfo: FunctionComponent<Props> = ({ className, contactInfo }) => (
  <div className={classNames(styles.contactInfo, className)}>
    {contactInfo.map((contactInfoEntry, index) => (
      <ContactInfoEntry className={styles.entry} contactInfo={contactInfoEntry} key={index} />
    ))}
  </div>
);

export default ContactInfo;
