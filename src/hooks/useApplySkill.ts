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
      const response = await fetch('/api/player/skills/apply-skill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error applying skill');
      }

      const result = await response.json();
      if (onSuccess) onSuccess();
      return result;
    } catch (err: any) {
      console.error('Error in useApplySkill:', err);
      setError(err.message || 'Unexpected error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { applySkill, loading, error };
}