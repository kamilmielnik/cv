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

export interface ClientTrackingData {
  fingerprint: string;
  language: string;
  languages: string[];
  platform?: string;
  timezone?: string;
  timezoneOffset: number;
  userAgent: string;
}

export interface ServerTrackingData {
  origin?: string;
  referer?: string;
  timestamp: number;
  userAgent?: string;
  xForwardedFor?: string | string[];
  xRealIp?: string | string[];
}

export interface TrackingData {
  client: ClientTrackingData;
  server: ServerTrackingData;
}
