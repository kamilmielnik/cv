import React, { useEffect } from 'react';
import Fingerprint2 from 'fingerprintjs2';

import { apiRoutes, track } from 'api';
import {
  ContactInfo,
  Button,
  GitHubIcon,
  Name,
  Page,
  Section,
  Description,
  Experience
} from 'components';
import { contactInfo, description, education, name, workExperience } from 'data';
import { getTrackingData, useIdle } from 'lib';
import { ClientTrackingData } from 'types';

import styles from './index.module.scss';

const GITHUB_URL = 'https://github.com/kamilmielnik/cv';

const print = () => window.print();

const Index = () => {
  const idle = useIdle();

  useEffect(() => {
    if (idle) {
      getTrackingData().then(track);
    }
  }, [idle]);

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
              className={styles.githubButton}
              href={GITHUB_URL}
              rel="noopener noreferrer"
              target="_blank"
              title="See this project on GitHub"
            >
              <GitHubIcon className={styles.githubIcon} />
            </Button.Link>
          </div>

          <div className={styles.buttonsRight}>
            <Button
              className={styles.printButton}
              title="Print this page"
              type="button"
              onClick={print}
            >
              Print
            </Button>

            <Button.Link
              className={styles.downloadButton}
              href={apiRoutes.pdf}
              title="Download PDF"
            >
              Download PDF
            </Button.Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
