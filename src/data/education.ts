import { ExperienceData } from 'types';

const education: ExperienceData[] = [
  {
    description: 'The Faculty of Computer Science, Electronics and Telecommunications',
    location: 'Kraków, Poland',
    organization: 'AGH UST',
    url: 'https://www.agh.edu.pl/',
    positions: [
      {
        timePeriod: '1.5 yr',
        timePeriods: [
          {
            from: new Date('2014/03/01'),
            to: new Date('2015/07/22')
          }
        ],
        title: 'Master of Science in Computer Science'
      },
      {
        timePeriod: '3.5 yr',
        timePeriods: [
          {
            from: new Date('2010/10/01'),
            to: new Date('2014/01/28')
          }
        ],
        title: 'Bachelor of Science in Computer Science'
      }
    ],
    timePeriod: '2010 - 2015'
  }
];
export default education;
