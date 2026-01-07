import { Address } from '../models/user-profile.model';

export const formatAddress = (address?: Address | null): string => {
  if (!address) return '-';
  const parts = [address.address, address.city, address.state, address.postalCode].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : '-';
};
