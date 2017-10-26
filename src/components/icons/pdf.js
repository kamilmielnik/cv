/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

const PdfIcon = ({ height = 42, width = height }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 76 76"
    width={width}
    height={height}>
    <path
      fill="currentColor"
      d="M 52,34L 39,34L 39,21L 24,21L 24,55L 52,55L 52,34 Z M 55.9999,59L 20,59L 20,17L 43.25,17L 55.9999,29.75L 55.9999,59 Z M 43,22.25L 43,30L 50.7499,30L 43,22.25 Z M 31,53L 31,45L 34,45C 35.6569,45 37,45.8431 37,47.5C 37,49.1569 35.6569,50 34,50L 33,50L 33,53L 31,53 Z M 34,48C 34.5523,48 35,48.0523 35,47.5C 35,46.9477 34.5523,47 34,47L 33,47L 33,48L 34,48 Z M 45,53L 45,45L 50,45L 50,47L 47,47L 47,48L 49,48L 49,50L 47,50L 47,53L 45,53 Z M 38,45L 41,45C 42.6569,45 44,46.3431 44,48L 44,50C 44,51.6568 42.6569,53 41,53L 38,53L 38,45 Z M 42,50L 42,48C 42,47.4477 41.5523,47 41,47L 40,47L 40,51L 41,51C 41.5523,51 42,50.5523 42,50 Z " />
  </svg>
);

PdfIcon.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};

export default PdfIcon;
