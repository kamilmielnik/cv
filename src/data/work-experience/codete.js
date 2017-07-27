import moment from 'moment';
import {
  CSS, JAVA_SCRIPT, JQUERY, REACT, REDUX, REDUX_SAGA, RESELECT
} from 'constants/technologies';

const codete = {
  description: [
    JAVA_SCRIPT, REACT, REDUX, REDUX_SAGA, RESELECT, JQUERY, CSS
  ].join(', '),
  location: 'Kraków, Poland',
  organization: 'Codete',
  positions: [
    {
      now: true,
      timePeriods: [
        {
          from: moment('2016/06/01', 'YYYY-MM-DD'),
          to: moment()
        }
      ],
      title: 'Lead & Technical Recruiter'
    },
    {
      now: false,
      timePeriods: [
        {
          from: moment('2015/08/01', 'YYYY-MM-DD'),
          to: moment('2016/05/31', 'YYYY-MM-DD')
        }
      ],
      title: 'JavaScript Developer & Technical Recruiter'
    }
  ],
  timePeriod: '2015 - present'
};
export default codete;
