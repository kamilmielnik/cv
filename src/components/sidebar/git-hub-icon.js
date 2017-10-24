import React from 'react';
import Icon from './icon';
import imageUrl from './images/GitHub-Mark-Light-32px.png';

const GIT_HUB_URL = 'https://github.com/kamilmielnik';

const GitHubIcon = (props) => (
  <Icon
    imageUrl={imageUrl}
    title="GitHub Profile"
    url={GIT_HUB_URL}
    {...props} />
);

export default GitHubIcon;
