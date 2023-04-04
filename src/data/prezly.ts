import { ExperienceData } from 'types';

import {
  CSS,
  JAVA_SCRIPT,
  NODE_JS,
  REACT,
  TECHNICAL_RECRUITMENT,
  TYPE_SCRIPT
} from './technologies';

const prezly: ExperienceData = {
  description: [TYPE_SCRIPT, JAVA_SCRIPT, NODE_JS, REACT, CSS].join(', '),
  extra: TECHNICAL_RECRUITMENT,
  location: 'Remote',
  organization: 'Prezly',
  url: 'https://www.prezly.com/',
  positions: [
    {
      timePeriods: [
        {
          start: new Date(2018, 6, 2),
          end: new Date(2021, 9, 29)
        }
      ],
      title: 'Frontend Engineer'
    }
  ]
};

export default prezly;
