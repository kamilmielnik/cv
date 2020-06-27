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

export interface TrackingData {
  fingerprint: string;
  language: string;
  languages: string[];
  platform?: string;
  timezone?: string;
  timezoneOffset: number;
  userAgent: string;
}

export interface ServerTrackingData extends TrackingData {
  ip: string;
  serverTimestamp: number;
}
