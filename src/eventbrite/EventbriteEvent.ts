import EventbriteSeries from './eventbrite_series';

export default interface EventbriteEvent {
  logo?: string;
  changed?: string;
  created?: string;
  id: string;
  name: string;
  cost?: string;
  currency?: string;
  summary?: string;
  description?: string;
  url?: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  series_dates?: EventbriteSeries[];
}
