import {
  C_SHARP,
  CSS,
  DOCTRINE,
  JAVA_SCRIPT,
  JQUERY,
  PHP,
  POSTGRESQL,
  TYPE_SCRIPT,
  WINDOWS_PRESENTATION_FOUNDATION,
  ZEND_FRAMEWORK
} from 'technologies';
import { WorkExperienceData } from 'types';

const Comarch: WorkExperienceData = {
  description: [
    TYPE_SCRIPT,
    JAVA_SCRIPT,
    JQUERY,
    CSS,
    PHP,
    ZEND_FRAMEWORK,
    DOCTRINE,
    POSTGRESQL,
    C_SHARP,
    WINDOWS_PRESENTATION_FOUNDATION
  ].join(', '),
  location: 'Kraków, Poland',
  organization: 'Comarch',
  positions: [
    {
      timePeriods: [
        {
          from: new Date('2012/10/01'),
          to: new Date('2013/03/31')
        },
        {
          from: new Date('2014/02/07'),
          to: new Date('2014/06/30')
        }
      ],
      title: 'Software Engineer'
    },
    {
      timePeriods: [
        {
          from: new Date('2012/07/01'),
          to: new Date('2012/09/30')
        }
      ],
      title: 'Software Engineer - Intern'
    }
  ],
  timePeriod: '2012 - 2013, 2014'
};

export default Comarch;
