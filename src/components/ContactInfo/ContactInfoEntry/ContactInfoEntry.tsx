import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { ContactInfoData } from 'types';

import SvgIcon from '../../SvgIcon';

import styles from './ContactInfoEntry.module.scss';

interface Props {
  className?: string;
  contactInfo: ContactInfoData;
}

const ContactInfoEntry: FunctionComponent<Props> = ({ className, contactInfo }) => (
  <div className={classNames(styles.contactInfoEntry, className)}>
    <SvgIcon className={styles.icon} icon={contactInfo.icon} />

    {contactInfo.url && (
      <a
        className={styles.value}
        href={contactInfo.url}
        rel="noopener noreferrer"
        target="_blank"
        title={contactInfo.value}
      >
        <span className={styles.valueContent}>{contactInfo.value}</span>
      </a>
    )}

    {!contactInfo.url && (
      <div className={styles.value} title={contactInfo.value}>
        <span className={styles.valueContent}>{contactInfo.value}</span>
      </div>
    )}
  </div>
);

export default ContactInfoEntry;
