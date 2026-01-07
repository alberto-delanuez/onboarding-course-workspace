export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: {
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
}
