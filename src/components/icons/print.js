import React from 'react';
import PropTypes from 'prop-types';

const PrintIcon = ({ height = 27, width = height }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={width}
    height={height}>
    <path fill="currentColor" d="M7 11v-6.003c0-1.102 0.894-1.997 1.997-1.997h15.005c1.107 0 1.997 0.894 1.997 1.997v6.003h-19zM6 27h-1.006c-1.654 0-2.994-1.343-2.994-2.999v-9.001c0-1.655 1.341-2.999 2.994-2.999h23.011c1.654 0 2.994 1.343 2.994 2.999v9.001c0 1.655-1.341 2.999-2.994 2.999h-1.006v-8h-21v8zM7 20h19v8c0 1.112-0.894 2-1.997 2h-15.005c-1.107 0-1.997-0.895-1.997-2v-8zM25 17c0.552 0 1-0.448 1-1s-0.448-1-1-1c-0.552 0-1 0.448-1 1s0.448 1 1 1v0zM9 23v1h15v-1h-15zM9 26v1h15v-1h-15z" />
  </svg>
);

PrintIcon.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};

export default PrintIcon;
