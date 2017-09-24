import React from 'react';
import { contactInfo, education, name, skills, workExperience } from 'data';
import ContactInfo from 'components/contact-info';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import Button from 'components/button';
import Name from 'components/name';
import Page from 'components/page';
import Section from 'components/section';
import Skills from 'components/skills';
import Experience from 'components/experience';
import styles from './styles.scss';

const PDF_FILENAME = 'KamilMielnik.pdf';
const print = () => window.print();
const downloadPdf = () => window.open(window.location.href + PDF_FILENAME);

const App = () => (
  <div className={styles.app}>
    <GitHubForkRibbon
      color="black"
      href="https://github.com/kamilmielnik/cv"
      position="right"
      target="_blank">
      Fork me on GitHub
    </GitHubForkRibbon>

    <Page className={styles.page}>
      <Name name={name} />

      <Section title="Contact Info">
        <ContactInfo contactInfo={contactInfo} />
      </Section>

      <Section title="Work Experience">
        <Experience experience={workExperience} />
      </Section>

      <Section title="Education">
        <Experience experience={education} />
      </Section>

      <Section title="Skills">
        <Skills skills={skills} />
      </Section>

      <div className={styles.buttons}>
        <Button className={styles.button} onClick={print}>
          Print
        </Button>

        <Button className={styles.button} onClick={downloadPdf}>
          PDF
        </Button>
      </div>
    </Page>
  </div>
);

export default App;
