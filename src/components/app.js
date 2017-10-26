import React from 'react';
import { contactInfo, education, name, skills, workExperience } from 'data';
import ContactInfo from 'components/contact-info';
import Button from 'components/button';
import Name from 'components/name';
import Page from 'components/page';
import Section from 'components/section';
import Sidebar from 'components/sidebar';
import Skills from 'components/skills';
import Experience from 'components/experience';
import { PdfIcon, PrintIcon } from 'components/icons';
import styles from './styles.scss';

const PDF_FILENAME = 'KamilMielnik.pdf';
const print = () => window.print();
const downloadPdf = () => window.open(window.location.href + PDF_FILENAME);

const App = () => (
  <div className={styles.app}>
    <Sidebar
      contentClassName={styles.sidebarContent}>
      <Page className={styles.page}>
        <Name className={styles.name} name={name} />

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
      </Page>

      <div className={styles.buttons}>
        <Button className={styles.button} title="Print this page" onClick={print}>
          <PrintIcon />
        </Button>

        <Button className={styles.button} title="Download a PDF" onClick={downloadPdf}>
          <PdfIcon />
        </Button>
      </div>
    </Sidebar>
  </div>
);

export default App;
