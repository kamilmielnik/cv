import React from 'react';
import PropTypes from 'prop-types';
import imageUrl from './GitHub-Mark-Light-32px.png';

const GitHub = ({ className, url }) => (
  <a
    className={className}
    href={url}
    title="Fork me on GitHub">
    <img alt={url} src={imageUrl} />
  </a>
);

GitHub.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default GitHub;
