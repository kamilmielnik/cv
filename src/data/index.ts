import { email, github } from 'icons';
import { Data } from 'types';

import agh from './agh';
import cern from './cern';
import codete from './codete';
import comarch from './comarch';
import limesquid from './limesquid';
import pega from './pega';
import prezly from './prezly';

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
  education: [agh],
  workExperience: [limesquid, prezly, codete, pega, cern, comarch]
};

export default data;
