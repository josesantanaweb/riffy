export enum Role {
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface User {
  id: string;
  name: string;
  email: string;
  brandColor?: string | null;
  phone?: string | null;
  logo?: string | null;
  role?: Role | null;
  status?: UserStatus | null;
}
