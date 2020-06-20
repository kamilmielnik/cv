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
  url: string;
  positions: PositionData[];
  timePeriod: string;
}

export interface PositionData {
  timePeriod?: string;
  timePeriods: TimePeriod[];
  title: string;
}

export interface TimePeriod {
  from: Date;
  to: Date;
}
