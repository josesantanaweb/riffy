import { User } from "./user";
import { Plan } from "./plan";

export interface PlanUsage {
  id: string;
  currentRaffles: number;
  currentTickets: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  ownerId: string;
  planId: string;
  owner?: User | null;
  plan?: Plan | null;
}
