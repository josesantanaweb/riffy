import { User } from "./user";
import { Plan } from "./plan";

export enum PlanUsageStatus {
  ACTIVE = 'ACTIVE',
  EXHAUSTED = 'EXHAUSTED',
  UNLIMITED = 'UNLIMITED',
}
export interface PlanUsage {
  id: string;
  currentBingos: number;
  currentBoards: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  ownerId: string;
  status: PlanUsageStatus;
  planId: string;
  owner?: User | null;
  plan?: Plan | null;
}
