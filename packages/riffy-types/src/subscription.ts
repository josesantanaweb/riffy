import { Plan } from "./plan";

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELED = 'CANCELED',
}

export interface Subscription {
  id: string;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  plan: Plan;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionInput {
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  plan: Plan;
}

export type UpdateSubscriptionInput = Partial<CreateSubscriptionInput>;
