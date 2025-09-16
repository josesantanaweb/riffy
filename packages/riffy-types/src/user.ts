import { PaymentMethod } from "./payment";
import { Raffle } from "./raffle";

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
  whatsapp?: string | null;
  tiktok?: string | null;
  instagram?: string | null;
  logo?: string | null;
  role?: Role | null;
  status?: UserStatus | null;
  raffles?: Raffle[] | null;
  paymentMethods?: PaymentMethod[] | null;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  brandColor?: string | null;
  whatsapp?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  logo?: string | null;
  role?: Role | null;
  status?: UserStatus | null;
}

export type UpdateUserInput = Partial<CreateUserInput>;
