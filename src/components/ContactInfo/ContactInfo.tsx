import React, { FunctionComponent } from 'react';

import { ContactInfoData } from 'types';

import ContactInfoEntry from './ContactInfoEntry';

interface Props {
  contactInfo: ContactInfoData[];
}

const ContactInfo: FunctionComponent<Props> = ({ contactInfo }) => (
  <div>
    {contactInfo.map((contactInfoEntry, index) => (
      <ContactInfoEntry key={index} {...contactInfoEntry} />
    ))}
  </div>
);

export default ContactInfo;
