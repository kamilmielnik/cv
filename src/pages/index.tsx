import React, { useCallback, useEffect } from 'react';
import Fingerprint2 from 'fingerprintjs2';

import { Button, ContactInfo, Description, Experience, Name, Page, Section } from 'components';
import { contactInfo, description, education, name, workExperience } from 'data';
import { download, github, print } from 'icons';
import { useTrackingData } from 'tracking';
import { ClientTrackingData, TrackingAction } from 'types';

import styles from './index.module.scss';

const track = (action: TrackingAction, trackingData: ClientTrackingData) =>
  fetch(`/api/track/${action}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trackingData)
  });

const Index = () => {
  const trackingData = useTrackingData();

  const handleGithubClick = useCallback(() => {
    if (trackingData) {
      track('github', trackingData);
    }
  }, [trackingData]);

  const handlePdfClick = useCallback(() => {
    if (trackingData) {
      track('pdf', trackingData);
    }
  }, [trackingData]);

  const handlePrintClick = useCallback(() => {
    if (trackingData) {
      track('print', trackingData);
    }
    window.print();
  }, [trackingData]);

  useEffect(() => {
    if (trackingData) {
      track('visit', trackingData);
    }
  }, [trackingData]);

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
