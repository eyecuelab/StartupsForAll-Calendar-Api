import EventbriteSeries from './eventbrite_series';

export default interface EventbriteEvent {
  logo?: string;
  changed?: Date | string;
  created?: Date | string;
  id: string;
  title: string;
  cost?: string;
  currency?: string;
  summary?: string;
  description?: string;
  url?: string;
  start_date: Date | string;
  end_date: Date | string;
  start_time: string;
  end_time: string;
  series_dates?: EventbriteSeries[];
}
