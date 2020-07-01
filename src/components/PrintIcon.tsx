/* eslint-disable max-len */

import React, { FunctionComponent, SVGAttributes } from 'react';

const PrintIcon: FunctionComponent<SVGAttributes<SVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path d="M8 2h16v4h-16v-4z"></path>
    <path d="M30 8h-28c-1.1 0-2 0.9-2 2v10c0 1.1 0.9 2 2 2h6v8h16v-8h6c1.1 0 2-0.9 2-2v-10c0-1.1-0.9-2-2-2zM4 14c-1.105 0-2-0.895-2-2s0.895-2 2-2 2 0.895 2 2-0.895 2-2 2zM22 28h-12v-10h12v10z"></path>
  </svg>
);

export default PrintIcon;
