export const CATEGORIES = ['Retail', 'Food', 'Service', 'Other'];

export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  createdAt: number;
}