import moment from 'moment';

const education = [
  {
    description: 'The Faculty of Computer Science, Electronics and Telecommunications',
    location: 'Kraków, Poland',
    organization: 'AGH UST',
    positions: [
      {
        timePeriod: '1.5 yr',
        timePeriods: [
          {
            from: moment('2014/03/01', 'YYYY-MM-DD'),
            to: moment('2015/07/22', 'YYYY-MM-DD')
          }
        ],
        title: 'Master of Science in Computer Science'
      },
      {
        timePeriod: '3.5 yr',
        timePeriods: [
          {
            from: moment('2010/10/01', 'YYYY-MM-DD'),
            to: moment('2014/01/28', 'YYYY-MM-DD')
          }
        ],
        title: 'Bachelor of Science in Computer Science'
      }
    ],
    timePeriod: '2010 - 2015'
  }
];
export default education;
