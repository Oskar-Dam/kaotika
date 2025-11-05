import { API } from '@/constants/apiRoutes';
import { ERROR } from '@/constants/errors';
import { useState } from 'react';

interface ApplySkillParams {
  classroomId: string;
  skillId: string;
  skillDescription: string;
  skillPosition: number;
}

interface UseApplySkillResult {
  applySkill: (params: ApplySkillParams) => Promise<any>;
  loading: boolean;
  error: string | null;
}

export function useApplySkill(onSuccess?: () => void): UseApplySkillResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applySkill = async (params: ApplySkillParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API.APPLY_SKILL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(ERROR.APPLY_SKILL);
      }

      const result = await response.json();
      if (onSuccess) onSuccess();
      return result;
    } catch (err: any) {
      setError(ERROR.APPLY_SKILL);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { applySkill, loading, error };
}