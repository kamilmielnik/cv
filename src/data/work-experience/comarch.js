import moment from 'moment';
import {
  C_SHARP, CSS, DOCTRINE, JAVA_SCRIPT, JQUERY, PHP, POSTGRESQL,
  TYPE_SCRIPT, WINDOWS_PRESENTATION_FOUNDATION, ZEND_FRAMEWORK
} from 'constants/technologies';

const comarch = {
  description: [
    TYPE_SCRIPT, JAVA_SCRIPT, JQUERY, CSS, PHP, ZEND_FRAMEWORK, DOCTRINE,
    POSTGRESQL, C_SHARP, WINDOWS_PRESENTATION_FOUNDATION
  ].join(', '),
  location: 'Kraków, Poland',
  organization: 'Comarch',
  positions: [
    {
      timePeriods: [
        {
          from: moment('2012/10/01', 'YYYY-MM-DD'),
          to: moment('2013/03/31', 'YYYY-MM-DD')
        },
        {
          from: moment('2014/02/07', 'YYYY-MM-DD'),
          to: moment('2014/06/30', 'YYYY-MM-DD')
        }
      ],
      title: 'Software Engineer'
    },
    {
      timePeriods: [
        {
          from: moment('2012/07/01', 'YYYY-MM-DD'),
          to: moment('2012/09/30', 'YYYY-MM-DD')
        }
      ],
      title: 'Software Engineer - Internship'
    }
  ],
  timePeriod: '2012 - 2013, 2014'
};
export default comarch;
