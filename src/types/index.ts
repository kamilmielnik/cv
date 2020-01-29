export type Technology = string;

export interface ContactInfoData {
  label: string;
  url: string;
  value: string;
}

export type Description = string;

export type Name = string;

export interface WorkExperienceData {
  description: string;
  extra?: string;
  location: string;
  organization: string;
  positions: {
    now?: true;
    timePeriod?: string;
    timePeriods: { from: Date; to: Date }[];
    title: string;
  }[];
  timePeriod: string;
}
