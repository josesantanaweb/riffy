export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string;
  name: string;
  email: string;
  brandColor?: string | null;
  phone?: string | null;
  image?: string | null;
  state?: string | null;
  role?: string | null;
}
