import { CASTOR, CSS, JAVA, VAADIN, ZEROC_ICE } from 'constants/skills';

const cern = {
  description: [ JAVA, VAADIN, CSS, ZEROC_ICE, CASTOR ].join(', '),
  location: 'Genève, Switzerland',
  organization: 'CERN',
  positions: [
    {
      timePeriods: [
        {
          from: new Date('2013/10/01'),
          to: new Date('2014/01/31')
        }
      ],
      title: 'User'
    },
    {
      timePeriods: [
        {
          from: new Date('2013/07/01'),
          to: new Date('2013/09/30')
        }
      ],
      title: 'Cooperation Associate'
    }
  ],
  timePeriod: '2013 - 2014'
};

export default cern;
