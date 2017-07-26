import moment from 'moment';
import {
  BACKBONE_JS, BRACKETS, GERRIT, GIT, GRUNT, HTML, JAVA_SCRIPT, JIRA, JQUERY, KNOCKBACK_JS,
  KNOCKOUT_JS, LESS, MOMENT_JS, NPM, REQUIRE_JS, UNDERSCORE_JS, VISUAL_STUDIO
} from './technologies';

const pega = {
  description: [
    JAVA_SCRIPT, KNOCKOUT_JS, KNOCKBACK_JS, BACKBONE_JS, REQUIRE_JS, MOMENT_JS, UNDERSCORE_JS,
    JQUERY, HTML, LESS, NPM, GRUNT, GERRIT, JIRA, BRACKETS, VISUAL_STUDIO, GIT
  ].join(', '),
  location: 'Kraków, Poland',
  organization: 'Pega',
  positions: [
    {
      timePeriods: [
        {
          from: moment('2015/07/01', 'YYYY-MM-DD'),
          to: moment('2015/07/31', 'YYYY-MM-DD')
        }
      ],
      title: 'System Architect - Mobility'
    },
    {
      timePeriods: [
        {
          from: moment('2014/07/01', 'YYYY-MM-DD'),
          to: moment('2015/06/30', 'YYYY-MM-DD')
        }
      ],
      title: 'Associate System Architect - Mobility'
    }
  ],
  timePeriod: '2014 - 2015'
};
export default pega;
