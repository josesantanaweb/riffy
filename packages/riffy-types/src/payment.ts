import { Board } from './board';
import { User } from './user';
import { Bingo } from './bingo';

export enum PaymentStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  DENIED = 'DENIED',
}

export enum PaymentMethodType {
  PAGO_MOVIL = 'PAGO_MOVIL',
  BINANCE_PAY = 'BINANCE_PAY',
  PAYPAL = 'PAYPAL',
}

export enum PaymentMethodStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface Payment {
  id: string;
  buyerName: string;
  nationalId: string;
  amount: number;
  phone: string;
  email?: string | null;
  state: string;
  paymentDate: string;
  paymentMethod: string;
  proofUrl?: string | null;
  status?: PaymentStatus | null;
  boards?: Board[] | null;
  bingo?: Bingo | null;
}

export interface CreatePaymentInput {
  buyerName: string;
  phone: string;
  nationalId: string;
  state?: string | null;
  amount: number;
  email?: string | null;
  paymentMethod: string;
  proofUrl: string;
  status?: PaymentStatus | null;
  boardIds: string[];
  bingoId: string;
}

export type UpdatePaymentInput = Partial<CreatePaymentInput>;

export interface PaymentMethod {
  id: string;
  name: string;
  type: PaymentMethodType;
  status: PaymentMethodStatus;

  bankName?: string | null;
  phoneNumber?: string | null;
  nationalId?: string | null;

  binanceId?: string | null;

  paypalEmail?: string | null;

  createdAt: string;
  updatedAt: string;

  ownerId: string;
  owner?: User | null;
}

export interface PagoMovil {
  bankName: string;
  phoneNumber: string;
  nationalId: string;
}

export interface BinancePay {
  binanceId?: string;
}

export interface Paypal {
  paypalEmail: string;
}

export type PaymentMethodData = PagoMovil | BinancePay | Paypal;

export interface CreatePaymentMethodInput {
  name?: string;
  type: PaymentMethodType;
  bankName?: string | null;
  phoneNumber?: string | null;
  nationalId?: string | null;
  binanceId?: string | null;
  binanceEmail?: string | null;
  paypalEmail?: string | null;
}

export type UpdatePaymentMethodInput = Partial<CreatePaymentMethodInput>;
