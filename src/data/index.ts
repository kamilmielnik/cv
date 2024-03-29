import { email, github } from 'icons';
import { Data } from 'types';

import agh from './agh';
import cern from './cern';
import codete from './codete';
import comarch from './comarch';
import metabase from './metabase';
import pega from './pega';
import prezly from './prezly';

const data: Data = {
  name: 'Kamil Mielnik',
  description: 'Senior Frontend Engineer',
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
  education: [agh],
  workExperience: [metabase, prezly, codete, pega, cern, comarch]
};

export default data;
