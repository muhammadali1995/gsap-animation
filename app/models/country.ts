export interface Country {
  id: string;
  name: string;
  logo: string;
  description: string;
  founded: string;
  industry: string;
  employees: string;
  revenue: string;
  headquarters: string;
  details: {
    companies: {
      name: string;
      logo: string;
    }[];
  };
}
