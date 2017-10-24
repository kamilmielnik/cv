import React from 'react';
import Icon from './icon';
import imageUrl from './images/In-White-34px-R.png';

const LINKED_IN_URL = 'https://www.linkedin.com/in/kamilmielnik/';

const LinkedInIcon = (props) => (
  <Icon
    imageUrl={imageUrl}
    title="LinkedIn Profile"
    url={LINKED_IN_URL}
    {...props} />
);

export default LinkedInIcon;
