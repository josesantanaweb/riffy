import { useQuery } from '@apollo/client';
import { GET_MY_PLAN_USAGE } from '@riffy/graphql';
import { PlanUsage } from '@riffy/types';

interface UsePlanUsageReturn {
  data: PlanUsage | null;
  loading: boolean;
  error: Error | null;
  canCreateBingo: boolean;
  canCreateBoards: (requestedBoards: number) => boolean;
  bingoLimitMessage: string | null;
  boardLimitMessage: (requestedBoards: number) => string | null;
}

export const usePlanUsage = (): UsePlanUsageReturn => {
  const { data, loading, error } = useQuery<{ myPlanUsage: PlanUsage }>(GET_MY_PLAN_USAGE);

  const planUsage = data?.myPlanUsage;

  const canCreateBingo = (): boolean => {
    if (!planUsage?.plan) return false;

    if (planUsage.plan.maxBingos === null || planUsage.plan.maxBingos === 0 || planUsage.plan.maxBingos === undefined) {
      return true;
    }

    return planUsage.currentBingos < planUsage.plan.maxBingos;
  };

  const canCreateBoards = (requestedBoards: number): boolean => {
    if (!planUsage?.plan) return false;

    if (planUsage.plan.maxBoards === null || planUsage.plan.maxBoards === 0 || planUsage.plan.maxBoards === undefined) {
      return true;
    }

    const newTotal = planUsage.currentBoards + requestedBoards;
    return newTotal <= planUsage.plan.maxBoards;
  };

  const bingoLimitMessage = (): string | null => {
    if (!planUsage?.plan) return null;

    if (planUsage.plan.maxBingos === null || planUsage.plan.maxBingos === 0 || planUsage.plan.maxBingos === undefined) {
      return null;
    }

    if (planUsage.currentBingos >= planUsage.plan.maxBingos) {
      return `Has alcanzado el límite de ${planUsage.plan.maxBingos} bingos de tu plan ${planUsage.plan.name}. Actualiza tu plan para crear más bingos.`;
    }

    const remaining = planUsage.plan.maxBingos - planUsage.currentBingos;
    return `Te quedan ${remaining} bingos disponibles en tu plan ${planUsage.plan.name}.`;
  };

  const boardLimitMessage = (requestedBoards: number): string | null => {
    if (!planUsage?.plan) return null;

    if (planUsage.plan.maxBoards === null || planUsage.plan.maxBoards === 0 || planUsage.plan.maxBoards === undefined) {
      return null; // Plan ilimitado
    }

    const newTotal = planUsage.currentBoards + requestedBoards;
    if (newTotal > planUsage.plan.maxBoards) {
      const available = planUsage.plan.maxBoards - planUsage.currentBoards;
      return `Solo puedes crear ${available} boards más con tu plan actual. Has usado ${planUsage.currentBoards}/${planUsage.plan.maxBoards} boards.`;
    }

    return null;
  };

  return {
    data: planUsage || null,
    loading,
    error: error || null,
    canCreateBingo: canCreateBingo(),
    canCreateBoards,
    bingoLimitMessage: bingoLimitMessage(),
    boardLimitMessage,
  };
};
