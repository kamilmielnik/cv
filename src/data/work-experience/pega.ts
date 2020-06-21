import { BACKBONE_JS, JAVA_SCRIPT, KNOCKBACK_JS, KNOCKOUT_JS, CSS } from 'technologies';
import { ExperienceData } from 'types';

const Pega: ExperienceData = {
  description: [JAVA_SCRIPT, KNOCKOUT_JS, KNOCKBACK_JS, BACKBONE_JS, CSS].join(', '),
  location: 'Kraków, Poland',
  organization: 'Pega',
  url: 'https://www.pega.com/',
  positions: [
    {
      timePeriods: [
        {
          from: new Date(2015, 6, 1),
          to: new Date(2015, 6, 31)
        }
      ],
      title: 'System Architect - Mobility'
    },
    {
      timePeriods: [
        {
          from: new Date(2014, 6, 1),
          to: new Date(2015, 5, 30)
        }
      ],
      title: 'Associate System Architect - Mobility'
    }
  ],
  timePeriod: '2014 - 2015'
};

export default Pega;
