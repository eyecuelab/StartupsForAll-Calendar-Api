import EventbriteSeries from './eventbrite_series';

export default interface FormattedEvent {
  name: string;
  changed: Date;
  created: Date;
  currency: string;
  description: string;
  id: string;
  logo?: string;
  organizer?: string;
  series_dates?: EventbriteSeries[];
  summary: string;
  start: Record<string, unknown>;
  end: Record<string, unknown>;
  url: string;
}
