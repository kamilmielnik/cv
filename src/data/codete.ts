import { ExperienceData } from 'types';

import {
  CSS,
  JAVA_SCRIPT,
  REACT,
  REDUX,
  REDUX_SAGA,
  RESELECT,
  TECHNICAL_RECRUITMENT
} from './technologies';

const codete: ExperienceData = {
  description: [JAVA_SCRIPT, REACT, REDUX, REDUX_SAGA, RESELECT, CSS].join(', '),
  extra: TECHNICAL_RECRUITMENT,
  location: 'Kraków, Poland',
  organization: 'Codete',
  url: 'https://codete.com/',
  positions: [
    {
      timePeriods: [
        {
          start: new Date(2016, 5, 1),
          end: new Date(2017, 11, 31)
        }
      ],
      title: 'Technical Lead'
    },
    {
      timePeriods: [
        {
          start: new Date(2015, 7, 1),
          end: new Date(2016, 4, 31)
        }
      ],
      title: 'JavaScript Developer'
    }
  ]
};

export default codete;
