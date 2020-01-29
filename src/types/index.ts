export type Technology = string;

export interface WorkExperienceData {
  description: string;
  extra?: string;
  location: string;
  organization: string;
  positions: {
    now?: true;
    timePeriods: { from: Date; to: Date }[];
    title: string;
  }[];
  timePeriod: string;
}
