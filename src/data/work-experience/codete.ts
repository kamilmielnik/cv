import {
  CSS,
  JAVA_SCRIPT,
  REACT,
  REDUX,
  REDUX_SAGA,
  RESELECT,
  TECHNICAL_RECRUITMENT
} from 'technologies';
import { ExperienceData } from 'types';

const Codete: ExperienceData = {
  description: [JAVA_SCRIPT, REACT, REDUX, REDUX_SAGA, RESELECT, CSS].join(', '),
  extra: TECHNICAL_RECRUITMENT,
  location: 'Kraków, Poland',
  organization: 'Codete',
  url: 'https://codete.com/',
  positions: [
    {
      timePeriods: [
        {
          from: new Date(2016, 5, 1),
          to: new Date(2017, 11, 31)
        }
      ],
      title: 'Technical Lead'
    },
    {
      timePeriods: [
        {
          from: new Date(2015, 7, 1),
          to: new Date(2016, 4, 31)
        }
      ],
      title: 'JavaScript Developer'
    }
  ],
  timePeriod: '2015 - 2017'
};
export default Codete;
