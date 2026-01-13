import { AuthRepository, LoginDto, RegisterDto, User } from '@onboarding-course/customer-auth-domain';

export class AuthHttpRepository implements AuthRepository {
  constructor(protected baseUrl: string = AuthHttpRepository.getApiUrl()){
  }

  static getApiUrl() {
    return import.meta.env.VITE_API_URL;
  }

  async login(credentials: LoginDto): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //HACK: DummyJSON expects the credentials in the body, change email to username
      body: JSON.stringify({username: parseEmailToUsername(credentials.email), password: credentials.password})
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json() as Promise<User>;
  }

  async register(data: RegisterDto): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Register failed');
    }

    // DummyJSON returns the created user object
    return response.json() as Promise<User>;
  }

  async verify(token: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error('Verify failed');
    }

    return response.json() as Promise<User>;
  }
}

/**
 * Converts an email in "firstname.lastname@domain" format to a username
 * following the pattern: firstname + first letter of lastname
 * 
 * Example: 
 * - james.davis@x.dummyjson.com → "jamesd"
 * - ana.garcia@x.dummyjson.com → "anag"
 * - john.doe@x.dummyjson.com → "johnd"
 * 
 * @param email - Email in "firstname.lastname@domain" format
 * @returns Username formed by firstname + first letter of lastname
 * @throws Error if email doesn't have the expected format
 */
function parseEmailToUsername(email: string) {

   // Extract the part before @
  const localPart = email.split('@')[0];
  
  if (!localPart) {
    throw new Error('Invalid email format: missing @ symbol');
  }


   // Separate first name and last name by the dot
  const nameParts = localPart.split('.');
  
  if (nameParts.length < 2) {
    throw new Error('Invalid email format: must contain firstname.lastname before @');
  }

  const [firstName, lastName] = nameParts;
  
  // Validate that both first name and last name exist
  if (!firstName || !lastName) {
    throw new Error('Invalid email format: first name or last name is empty');
  }

  // Convert to lowercase and take first letter of last name
  const cleanFirstName = firstName.toLowerCase();
  const firstLetterOfLastName = lastName.charAt(0).toLowerCase();
  
  // Combine first name + first letter of last name
  return cleanFirstName + firstLetterOfLastName;
}
