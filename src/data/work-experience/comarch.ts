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
import { ExperienceData } from 'types';

const Comarch: ExperienceData = {
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
  url: 'https://www.comarch.com/',
  positions: [
    {
      timePeriods: [
        {
          from: new Date(2012, 9, 1),
          to: new Date(2013, 2, 31)
        },
        {
          from: new Date(2014, 1, 7),
          to: new Date(2014, 5, 30)
        }
      ],
      title: 'Software Engineer'
    },
    {
      timePeriods: [
        {
          from: new Date(2012, 6, 1),
          to: new Date(2012, 8, 30)
        }
      ],
      title: 'Software Engineer - Intern'
    }
  ],
  timePeriod: '2012 - 2013, 2014'
};

export default Comarch;
