import {
  CSS,
  JAVA_SCRIPT,
  REACT,
  REDUX,
  REDUX_SAGA,
  RESELECT,
  TECHNICAL_RECRUITMENT
} from 'technologies';
import { WorkExperienceData } from 'types';

const Codete: WorkExperienceData = {
  description: [JAVA_SCRIPT, REACT, REDUX, REDUX_SAGA, RESELECT, CSS].join(', '),
  extra: TECHNICAL_RECRUITMENT,
  location: 'Kraków, Poland',
  organization: 'Codete',
  positions: [
    {
      timePeriods: [
        {
          from: new Date('2016/06/01'),
          to: new Date('2017/12/31')
        }
      ],
      title: 'Technical Lead'
    },
    {
      timePeriods: [
        {
          from: new Date('2015/08/01'),
          to: new Date('2016/05/31')
        }
      ],
      title: 'JavaScript Developer'
    }
  ],
  timePeriod: '2015 - 2017'
};
export default Codete;
