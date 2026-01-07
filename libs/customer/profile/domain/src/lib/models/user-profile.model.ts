export interface UserProfile {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  address: Address;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  postalCode: string;
}
