import React, { PropTypes } from 'react';
import ContactInfoEntry from './contact-info-entry';

const ContactInfo = ({ contactInfo }) => (
  <div>
    {contactInfo.map((contactInfoEntry, index) => (
      <ContactInfoEntry
        key={index}
        {...contactInfoEntry} />
    ))}
  </div>
);

ContactInfo.propTypes = {
  contactInfo: PropTypes.array.isRequired
};

export default ContactInfo;
