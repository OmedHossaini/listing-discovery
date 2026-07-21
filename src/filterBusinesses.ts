import { Business } from './business';

export function filterBusinesses(businesses: Business[], query: string): Business[] {
  const search = query.trim().toLowerCase();
  if (!search) return businesses;
  return businesses.filter((business) => business.name.toLowerCase().includes(search));
}