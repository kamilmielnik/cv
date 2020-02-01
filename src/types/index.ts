export interface TimePeriod {
  from: Date;
  to: Date;
}

export interface ContactInfoData {
  label: string;
  url: string;
  value: string;
}

export interface ExperienceData {
  description: string;
  extra?: string;
  location: string;
  organization: string;
  positions: {
    timePeriod?: string;
    timePeriods: TimePeriod[];
    title: string;
  }[];
  timePeriod: string;
}
