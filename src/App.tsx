import React from 'react';
import { contactInfo, description, education, name, workExperience } from 'data';
import { ContactInfo, Button, Name, Page, Section, Description, Experience } from 'components';

import styles from './App.module.scss';

const PDF_FILENAME = 'KamilMielnik.pdf';
const print = () => window.print();
const downloadPdf = () => window.open(window.location.href + PDF_FILENAME);

const App = () => (
  <div className={styles.app}>
    <div className={styles.content}>
      <Page>
        <Name>{name}</Name>
        <Description className={styles.description}>{description}</Description>

        <Section title="Contact Info">
          <ContactInfo contactInfo={contactInfo} />
        </Section>

        <Section title="Work Experience">
          <Experience experience={workExperience} />
        </Section>

        <Section title="Education">
          <Experience experience={education} />
        </Section>
      </Page>

      <div className={styles.buttons}>
        <Button className={styles.button} title="Print this page" type="button" onClick={print}>
          Print
        </Button>

        <Button className={styles.button} title="Download PDF" type="button" onClick={downloadPdf}>
          Download PDF
        </Button>
      </div>
    </div>
  </div>
);

export default App;
