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
  <a
    className={classNames(styles.contactInfoEntry, className)}
    href={contactInfo.url}
    rel="noopener noreferrer"
    target="_blank"
    title={contactInfo.value}
  >
    <SvgIcon className={styles.icon} icon={contactInfo.icon} />

    <div className={styles.value} title={contactInfo.value}>
      <span className={styles.valueContent}>{contactInfo.value}</span>
    </div>
  </a>
);

export default ContactInfoEntry;
