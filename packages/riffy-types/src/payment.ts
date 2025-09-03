import { Ticket } from './ticket';
import { User } from './user';

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
  phone: string;
  state: string;
  paymentDate: string;
  proofUrl?: string | null;
  status?: PaymentStatus | null;
  ticket?: Ticket | null;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: PaymentMethodType;
  status: PaymentMethodStatus;

  bankName?: string | null;
  phoneNumber?: string | null;
  nationalId?: string | null;

  binanceId?: string | null;
  binanceEmail?: string | null;

  paypalEmail?: string | null;

  createdAt: string;
  updatedAt: string;

  ownerId: string;
  owner?: User | null;
}

export interface PagoMovilData {
  bankName: string;
  phoneNumber: string;
  nationalId: string;
}

export interface BinancePayData {
  binanceId?: string;
  binanceEmail?: string;
}

export interface PaypalData {
  paypalEmail: string;
}

export type PaymentMethodData = PagoMovilData | BinancePayData | PaypalData;

export interface CreatePaymentMethodInput {
  name: string;
  type: PaymentMethodType;
  data: PaymentMethodData;
}
