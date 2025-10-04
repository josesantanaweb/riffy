import { useQuery } from '@apollo/client';
import { GET_MY_PLAN_USAGE } from '@riffy/graphql';
import { PlanUsage } from '@riffy/types';

interface UsePlanUsageReturn {
  data: PlanUsage | null;
  loading: boolean;
  error: Error | null;
  canCreateRaffle: boolean;
  canCreateTickets: (requestedTickets: number) => boolean;
  raffleLimitMessage: string | null;
  ticketLimitMessage: (requestedTickets: number) => string | null;
}

export const usePlanUsage = (): UsePlanUsageReturn => {
  const { data, loading, error } = useQuery<{ myPlanUsage: PlanUsage }>(GET_MY_PLAN_USAGE);

  const planUsage = data?.myPlanUsage;

  const canCreateRaffle = (): boolean => {
    if (!planUsage?.plan) return false;

    if (planUsage.plan.maxRaffles === null || planUsage.plan.maxRaffles === 0 || planUsage.plan.maxRaffles === undefined) {
      return true;
    }

    return planUsage.currentRaffles < planUsage.plan.maxRaffles;
  };

  const canCreateTickets = (requestedTickets: number): boolean => {
    if (!planUsage?.plan) return false;

    if (planUsage.plan.maxTickets === null || planUsage.plan.maxTickets === 0 || planUsage.plan.maxTickets === undefined) {
      return true;
    }

    const newTotal = planUsage.currentTickets + requestedTickets;
    return newTotal <= planUsage.plan.maxTickets;
  };

  const raffleLimitMessage = (): string | null => {
    if (!planUsage?.plan) return null;

    if (planUsage.plan.maxRaffles === null || planUsage.plan.maxRaffles === 0 || planUsage.plan.maxRaffles === undefined) {
      return null;
    }

    if (planUsage.currentRaffles >= planUsage.plan.maxRaffles) {
      return `Has alcanzado el límite de ${planUsage.plan.maxRaffles} rifas de tu plan ${planUsage.plan.name}. Actualiza tu plan para crear más rifas.`;
    }

    const remaining = planUsage.plan.maxRaffles - planUsage.currentRaffles;
    return `Te quedan ${remaining} rifas disponibles en tu plan ${planUsage.plan.name}.`;
  };

  const ticketLimitMessage = (requestedTickets: number): string | null => {
    if (!planUsage?.plan) return null;

    if (planUsage.plan.maxTickets === null || planUsage.plan.maxTickets === 0 || planUsage.plan.maxTickets === undefined) {
      return null; // Plan ilimitado
    }

    const newTotal = planUsage.currentTickets + requestedTickets;
    if (newTotal > planUsage.plan.maxTickets) {
      const available = planUsage.plan.maxTickets - planUsage.currentTickets;
      return `Solo puedes crear ${available} tickets más con tu plan actual. Has usado ${planUsage.currentTickets}/${planUsage.plan.maxTickets} tickets.`;
    }

    return null;
  };

  return {
    data: planUsage || null,
    loading,
    error: error || null,
    canCreateRaffle: canCreateRaffle(),
    canCreateTickets,
    raffleLimitMessage: raffleLimitMessage(),
    ticketLimitMessage,
  };
};
