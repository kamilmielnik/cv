import { ExperienceData } from 'types';

const agh: ExperienceData = {
  description: 'The Faculty of Computer Science, Electronics and Telecommunications',
  location: 'Kraków, Poland',
  organization: 'AGH UST',
  url: 'https://www.agh.edu.pl/',
  positions: [
    {
      timePeriod: '1.5 yr',
      timePeriods: [
        {
          start: new Date(2014, 2, 1),
          end: new Date(2015, 6, 22)
        }
      ],
      title: 'Master of Science in Computer Science'
    },
    {
      timePeriod: '3.5 yrs',
      timePeriods: [
        {
          start: new Date(2010, 9, 1),
          end: new Date(2014, 0, 28)
        }
      ],
      title: 'Bachelor of Science in Computer Science'
    }
  ],
  timePeriod: '2010 - 2015'
};

export default agh;
