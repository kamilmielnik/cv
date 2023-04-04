import { email, github, linkedin } from 'icons';
import { ContactInfoData } from 'types';

const contactInfo: ContactInfoData[] = [
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
    value: 'https://github.com/kamilmielnik'
  }
];

export default contactInfo;
