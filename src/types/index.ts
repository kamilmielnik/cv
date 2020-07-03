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
}

export interface PositionData {
  timePeriod?: string;
  timePeriods: TimePeriod[];
  title: string;
}

export interface TimePeriod {
  end: Date | null;
  start: Date;
}

export interface ClientTrackingData {
  fingerprint: string;
  language?: string;
  platform?: string;
  timezone?: string;
  timezoneOffset: number;
}

export interface ServerTrackingData {
  origin?: string;
  referer?: string;
  timestamp: number;
  userAgent?: string;
  xForwardedFor?: string | string[];
  xRealIp?: string | string[];
}

export type TrackingAction = 'github' | 'pdf' | 'print' | 'visit';

export interface TrackingData {
  action: TrackingAction;
  client: ClientTrackingData;
  server: ServerTrackingData;
}
