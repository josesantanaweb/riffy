export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  state?: string;
  role?: string;
}
