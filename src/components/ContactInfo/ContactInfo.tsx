import { FunctionComponent } from 'react';

import { ContactInfoData } from 'types';

import ContactInfoEntry from './ContactInfoEntry';

interface Props {
  className?: string;
  contactInfo: ContactInfoData[];
}

const ContactInfo: FunctionComponent<Props> = ({ className, contactInfo }) => (
  <div className={className}>
    {contactInfo.map((contactInfoEntry, index) => (
      <ContactInfoEntry contactInfo={contactInfoEntry} key={index} />
    ))}
  </div>
);

export default ContactInfo;
