import { ExperienceData } from 'types';

import { CASTOR, CSS, JAVA, VAADIN, ZEROC_ICE } from './technologies';

const cern: ExperienceData = {
  description: [JAVA, VAADIN, CSS, ZEROC_ICE, CASTOR].join(', '),
  location: 'Genève, Switzerland',
  organization: 'CERN',
  url: 'https://home.cern/',
  positions: [
    {
      timePeriods: [
        {
          start: new Date(2013, 9, 1),
          end: new Date(2014, 0, 31)
        }
      ],
      title: 'User'
    },
    {
      timePeriods: [
        {
          start: new Date(2013, 6, 1),
          end: new Date(2013, 8, 30)
        }
      ],
      title: 'Cooperation Associate'
    }
  ]
};

export default cern;
