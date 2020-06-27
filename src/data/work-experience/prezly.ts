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
          from: new Date(2018, 6, 2),
          to: new Date()
        }
      ],
      title: 'Frontend Engineer'
    }
  ],
  timePeriod: '2018 - present'
};

export default Prezly;
