import { ExperienceData } from 'types';

import { CSS, JAVA_SCRIPT, REACT, TYPE_SCRIPT } from './technologies';

const Prezly: ExperienceData = {
  description: [TYPE_SCRIPT, JAVA_SCRIPT, REACT, CSS].join(', '),
  location: 'Remote',
  organization: 'Prezly',
  url: 'https://www.prezly.com/',
  positions: [
    {
      timePeriods: [
        {
          start: new Date(2018, 6, 2),
          end: null
        }
      ],
      title: 'Frontend Engineer'
    }
  ]
};

export default Prezly;
