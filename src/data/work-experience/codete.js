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
          from: new Date('2016/06/01'),
          to: new Date()
        }
      ],
      title: 'Lead & Technical Recruiter'
    },
    {
      now: false,
      timePeriods: [
        {
          from: new Date('2015/08/01'),
          to: new Date('2016/05/31')
        }
      ],
      title: 'JavaScript Developer & Technical Recruiter'
    }
  ],
  timePeriod: '2015 - present'
};
export default codete;
