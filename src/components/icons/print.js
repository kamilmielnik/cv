/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

const PrintIcon = ({ height = 42, width = height }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 76 76"
    width={width}
    height={height}>
    <path
      fill="currentColor"
      d="M 25,27L 25,17L 51,17L 51,27L 47,27L 47,21L 29,21L 29,27L 25,27 Z M 16,28L 60,28L 60,51L 52,51L 52,46L 55,46L 55,33L 21,33L 21,46L 24,46L 24,51L 16,51L 16,28 Z M 25,39L 28,39L 28,52L 35,52L 35,59L 48,59L 48,39L 51,39L 51,62L 33,62L 25,54L 25,39 Z M 46,55L 38,55L 38,52L 46,52L 46,55 Z M 46,49L 30,49L 30,46L 46,46L 46,49 Z M 46,43L 30,43L 30,40L 46,40L 46,43 Z " />
  </svg>
);

PrintIcon.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};

export default PrintIcon;
