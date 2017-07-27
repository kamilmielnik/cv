import moment from 'moment';
import {
  BOOTSTRAP, ECMA_SCRIPT_6, GIT, GRUNT, HTML, IMMUTABLE_JS, JAVA_SCRIPT, JIRA, JQUERY, LESS,
  LODASH, MERCURIAL, MOMENT_JS, NPM, REACT, REDUX, REDUX_SAGA, RESELECT, SASS, STYLUS,
  SUBLIME, UNDERSCORE_JS, WEBPACK
} from './technologies';

const codete = {
  description: [
    JAVA_SCRIPT, ECMA_SCRIPT_6, REACT, REDUX, REDUX_SAGA, RESELECT, IMMUTABLE_JS, MOMENT_JS,
    UNDERSCORE_JS, LODASH, JQUERY, BOOTSTRAP, HTML, LESS, SASS, STYLUS, WEBPACK, NPM,
    GRUNT, JIRA, SUBLIME, GIT, MERCURIAL
  ].join(', '),
  location: 'Kraków, Poland',
  organization: 'Codete',
  positions: [
    {
      now: true,
      timePeriods: [
        {
          from: moment('2016/06/01', 'YYYY-MM-DD'),
          to: moment()
        }
      ],
      title: 'Lead & Technical Recruiter'
    },
    {
      now: false,
      timePeriods: [
        {
          from: moment('2015/08/01', 'YYYY-MM-DD'),
          to: moment('2016/05/31', 'YYYY-MM-DD')
        }
      ],
      title: 'JavaScript Developer & Technical Recruiter'
    }
  ],
  timePeriod: '2015 - present'
};
export default codete;
