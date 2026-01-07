

export const decodeJWT = (token: string): unknown  => {
  const payload = token.split('.')[1];
  const decoded = JSON.parse(atob(payload));
  return decoded;
}

export const extractUserIdFromToken = (token: string): string  => {
  const payload = decodeJWT(token) as Record<string, unknown>;
  
  // Try different possible ID fields in order of preference
  const possibleIdFields = ['sub', 'userId', 'id', 'user_id', 'uid'];
  
  for (const field of possibleIdFields) {
    if (payload[field]) {
      return (payload[field] as string).toString();
    }
  }
  
  throw new Error('No user ID found in JWT payload');
}
