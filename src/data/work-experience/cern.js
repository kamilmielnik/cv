import moment from 'moment';
import { ASSEMBLA, CASTOR, ECLIPSE, JAVA, SASS, SVN, VAADIN, ZEROC_ICE } from './technologies';

const cern = {
  description: [ JAVA, VAADIN, ZEROC_ICE, CASTOR, SASS, ASSEMBLA, ECLIPSE, SVN ].join(', '),
  location: 'Genève, Switzerland',
  organization: 'CERN',
  positions: [
    {
      timePeriods: [
        {
          from: moment('2013/10/01', 'YYYY-MM-DD'),
          to: moment('2014/01/31', 'YYYY-MM-DD')
        }
      ],
      title: 'Associated Member of the Personnel (User)'
    },
    {
      timePeriods: [
        {
          from: moment('2013/07/01', 'YYYY-MM-DD'),
          to: moment('2013/09/30', 'YYYY-MM-DD')
        }
      ],
      title: 'Associated Member of the Personnel (Cooperation Associate)'
    }
  ],
  timePeriod: '2013 - 2014'
};
export default cern;
