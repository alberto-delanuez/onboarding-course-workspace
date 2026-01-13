import { UserProfile } from "../models/user-profile.model";




export const formatName = (user: UserProfile): string => {
  if (!user.firstName && !user.lastName) return '-';
  return [user.firstName, user.lastName].filter(Boolean).join(' ') || '-';
};
