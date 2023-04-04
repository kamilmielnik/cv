import { ExperienceData } from 'types';

import { CSS, DESIGN, JAVA_SCRIPT, NODE_JS, REACT, TYPE_SCRIPT } from './technologies';

const limesquid: ExperienceData = {
  description: [TYPE_SCRIPT, JAVA_SCRIPT, NODE_JS, REACT, CSS].join(', '),
  extra: DESIGN,
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
      title: 'Websktop'
    },
    {
      timePeriods: [
        {
          start: new Date(2018, 4, 13),
          end: new Date(2018, 9, 19)
        }
      ],
      title: 'R-Factor'
    }
  ],
  timePeriod: '2018 - present'
};

export default limesquid;
