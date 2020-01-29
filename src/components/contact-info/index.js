import React from 'react';
import PropTypes from 'prop-types';

import ContactInfoEntry from './ContactInfoEntry';

const ContactInfo = ({ contactInfo }) => (
  <div>
    {contactInfo.map((contactInfoEntry, index) => (
      <ContactInfoEntry key={index} {...contactInfoEntry} />
    ))}
  </div>
);

ContactInfo.propTypes = {
  contactInfo: PropTypes.array.isRequired
};

export default ContactInfo;
