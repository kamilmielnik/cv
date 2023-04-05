import { ExperienceData } from 'types';

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
} from './technologies';

const comarch: ExperienceData = {
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
          start: new Date(2012, 9, 1),
          end: new Date(2013, 2, 31)
        },
        {
          start: new Date(2014, 1, 7),
          end: new Date(2014, 5, 30)
        }
      ],
      title: 'Software Engineer'
    },
    {
      timePeriods: [
        {
          start: new Date(2012, 6, 1),
          end: new Date(2012, 8, 30)
        }
      ],
      title: 'Software Engineer - Intern'
    }
  ]
};

export default comarch;
