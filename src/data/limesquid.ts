import { ExperienceData } from 'types';

import {
  CSS,
  EXPRESS,
  JAVA_SCRIPT,
  MARIA_DB,
  NODE_JS,
  REACT,
  REDIS,
  TYPE_SCRIPT
} from './technologies';

const limesquid: ExperienceData = {
  description: [TYPE_SCRIPT, JAVA_SCRIPT, REACT, CSS, NODE_JS, EXPRESS, MARIA_DB, REDIS].join(', '),
  location: 'Remote',
  organization: 'LimeSquid',
  url: 'https://limesquid.com/',
  positions: [
    {
      timePeriods: [
        {
          start: new Date(2021, 11, 16),
          end: null
        }
      ],
      title: 'Websktop Product Engineer',
      url: 'https://websktop.com'
    },
    {
      timePeriods: [
        {
          start: new Date(2018, 4, 13),
          end: new Date(2018, 9, 19)
        }
      ],
      title: 'R-Factor Product Engineer',
      url: 'https://r-factor.org'
    }
  ],
  timePeriod: '2018 - present'
};

export default limesquid;
