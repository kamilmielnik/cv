export type Technology = string;

export interface ContactInfoData {
  label: string;
  url: string;
  value: string;
}

export type Description = string;

export type Name = string;

export interface TimePeriod {
  from: Date;
  to: Date;
}

export interface WorkExperienceData {
  description: string;
  extra?: string;
  location: string;
  organization: string;
  positions: {
    now?: true;
    timePeriod?: string;
    timePeriods: TimePeriod[];
    title: string;
  }[];
  timePeriod: string;
}
