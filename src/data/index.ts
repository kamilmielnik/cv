import { email, github } from 'icons';
import { Data } from 'types';

import education from './education';
import workExperience from './work-experience';

const data: Data = {
  name: 'Kamil Mielnik',
  description: 'Senior Frontend Engineer with over 10 years of professional experience',
  contactInfo: [
    {
      icon: email,
      label: 'Email',
      url: 'mailto:kamil@kamilmielnik.com',
      value: 'kamil@kamilmielnik.com'
    },
    {
      icon: github,
      label: 'GitHub',
      url: 'https://github.com/kamilmielnik',
      value: 'github.com/kamilmielnik'
    }
  ],
  education,
  workExperience
};

export default data;
