export enum PlanType {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  ONE_TIME = 'ONE_TIME',
}

export interface Plan {
  id: string;
  name: string;
  description: string[];
  price: number;
  maxRaffles?: number;
  maxTickets?: number;
  type?: PlanType | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlanInput {
  name: string;
  description: string[];
  price: number;
  maxRaffles?: number;
  maxTickets?: number;
  type?: PlanType | null;
}

export type UpdatePlanInput = Partial<CreatePlanInput>;
