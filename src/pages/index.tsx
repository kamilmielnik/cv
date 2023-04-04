import { useEffect } from 'react';

import { Button, ContactInfo, Experience, Page } from 'components';
import data from 'data';
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
          <h1 className={styles.name}>{data.name}</h1>
          <p className={styles.description}>{data.description}</p>
          <ContactInfo className={styles.contactInfo} contactInfo={data.contactInfo} />
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          <Experience experience={data.workExperience} />
          <h2 className={styles.sectionTitle}>Education</h2>
          <Experience experience={data.education} />
        </Page>

        <div className={styles.buttons}>
          <div className={styles.buttonsLeft}>
            <Button.Link
              href="https://github.com/kamilmielnik/cv"
              icon={github}
              rel="noopener noreferrer"
              target="_blank"
              title="See this project on GitHub"
              onClick={handleGithubClick}
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
              target="_blank"
              title="Download PDF"
              onClick={handlePdfClick}
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
