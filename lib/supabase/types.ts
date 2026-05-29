export type BriefStatus = "new" | "replied" | "archived";

export type Brief = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  project: string | null;
  budget: string | null;
  message: string;
  status: BriefStatus;
  notes: string | null;
};

export type Availability = {
  id: 1;
  is_open: boolean;
  booking_label: string;
  slots_left: number;
  next_open_label: string;
  after_label: string;
  updated_at: string;
};

export type PortfolioItem = {
  id: string;
  created_at: string;
  sort_order: number;
  num: string;
  year: string;
  title: string;
  italic: string;
  description: string;
  role: string[];
  palette: string[];
  accent: string;
  url: string;
  domain: string;
  published: boolean;
};

export type Testimonial = {
  id: string;
  created_at: string;
  sort_order: number;
  quote: string;
  name: string;
  role: string;
  org: string;
  accent: string;
  published: boolean;
};
