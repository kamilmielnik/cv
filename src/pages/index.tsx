import React, { useEffect } from 'react';

import { Button, ContactInfo, Description, Experience, Name, Page, Section } from 'components';
import { contactInfo, description, education, name, workExperience } from 'data';
import { download, github, print } from 'icons';
import { useTrack } from 'tracking';

import styles from './index.module.scss';

const Index = () => {
  const track = useTrack();

  const handleGithubClick = () => {
    track('github');
  };

  const handlePdfClick = () => {
    track('pdf');
  };

  const handlePrintClick = () => {
    track('print');
    window.print();
  };

  useEffect(() => {
    track('visit');
  }, [track]);

  return (
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
          <div className={styles.buttonsLeft}>
            <Button.Link
              href="https://github.com/kamilmielnik/cv"
              icon={github}
              onClick={handleGithubClick}
              rel="noopener noreferrer"
              target="_blank"
              title="See this project on GitHub"
            >
              GitHub
            </Button.Link>
          </div>

          <div className={styles.buttonsRight}>
            <Button
              className={styles.printButton}
              icon={print}
              title="Print CV"
              type="button"
              onClick={handlePrintClick}
            >
              Print
            </Button>

            <Button.Link
              className={styles.downloadButton}
              href="/api/pdf"
              icon={download}
              onClick={handlePdfClick}
              title="Download PDF"
            >
              PDF
            </Button.Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
