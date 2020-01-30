import { CSS, JAVA_SCRIPT, REACT, TYPE_SCRIPT } from 'technologies';
import { WorkExperienceData } from 'types';

const Prezly: WorkExperienceData = {
  description: [TYPE_SCRIPT, JAVA_SCRIPT, REACT, CSS].join(', '),
  location: 'Remote',
  organization: 'Prezly',
  positions: [
    {
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

export default Prezly;
