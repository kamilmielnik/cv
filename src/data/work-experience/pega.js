import {
  BACKBONE_JS, JAVA_SCRIPT, JQUERY, KNOCKBACK_JS, KNOCKOUT_JS, CSS
} from 'constants/technologies';

const pega = {
  description: [
    JAVA_SCRIPT, KNOCKOUT_JS, KNOCKBACK_JS, BACKBONE_JS, JQUERY, CSS
  ].join(', '),
  location: 'Kraków, Poland',
  organization: 'Pega',
  positions: [
    {
      timePeriods: [
        {
          from: new Date('2015/07/01'),
          to: new Date('2015/07/31')
        }
      ],
      title: 'System Architect - Mobility'
    },
    {
      timePeriods: [
        {
          from: new Date('2014/07/01'),
          to: new Date('2015/06/30')
        }
      ],
      title: 'Associate System Architect - Mobility'
    }
  ],
  timePeriod: '2014 - 2015'
};
export default pega;
