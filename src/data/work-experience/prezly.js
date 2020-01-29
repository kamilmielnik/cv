import { CSS, JAVA_SCRIPT, REACT, REDUX, TYPE_SCRIPT } from 'constants/skills';

export default {
  description: [TYPE_SCRIPT, JAVA_SCRIPT, REACT, CSS].join(', '),
  location: 'Remote',
  organization: 'Prezly',
  positions: [
    {
      now: true,
      timePeriods: [
        {
          from: new Date('2018/07/02'),
          to: new Date()
        }
      ],
      title: 'Frontend Engineer'
    }
  ],
  timePeriod: '2018 - present'
};
