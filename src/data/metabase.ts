import { ExperienceData } from 'types';

import {
  CSS,
  CYPRESS,
  JAVA_SCRIPT,
  JEST,
  REACT,
  REDUX,
  TESTING_LIBRARY,
  TYPE_SCRIPT
} from './technologies';

const metabase: ExperienceData = {
  description: [TYPE_SCRIPT, JAVA_SCRIPT, REACT, REDUX, CSS, JEST, TESTING_LIBRARY, CYPRESS].join(
    ', '
  ),
  location: 'Remote',
  organization: 'Metabase',
  url: 'https://www.metabase.com/',
  positions: [
    {
      timePeriods: [
        {
          start: new Date(2023, 4, 15),
          end: null
        }
      ],
      title: 'Frontend Software Engineer'
    }
  ]
};

export default metabase;
