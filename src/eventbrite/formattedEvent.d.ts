import EventbriteSeries from './eventbrite_series';

export default interface FormattedEvent {
  name: string;
  created: Date;
  changed: Date;
  currency: string;
  description: string;
  summary: string;
  start: Record<string, unknown>;
  end: Record<string, unknown>;
  id: string;
  url: string;
  logo: string;
  series_dates?: EventbriteSeries[];
}

// { id: number, name: string }[]
