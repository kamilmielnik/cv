import { ExperienceData } from 'types';

import { CSS, JAVA_SCRIPT, REACT, TYPE_SCRIPT } from './technologies';

const websktop: ExperienceData = {
  description: [TYPE_SCRIPT, JAVA_SCRIPT, REACT, CSS].join(', '),
  location: 'Remote',
  organization: 'Websktop',
  url: 'https://websktop.com/',
  positions: [
    {
      timePeriods: [
        {
          start: new Date(2021, 11, 16),
          end: null
        }
      ],
      title: 'Principal Product Engineer'
    }
  ]
};

export default websktop;
