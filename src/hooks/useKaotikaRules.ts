import { Rules } from '@/_common/interfaces/Rules';
import { useState, useEffect, useCallback } from 'react';

export const useKaotikaRules = (session: any) => {
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState<Rules[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchRules = async () => {
    if (!session) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/player/rules`);
      const result = await res.json();
      setRules(result.data);
    } catch (error) {
      setError('Failed to fetch student skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return { rules, loading, error, refetchSkills: fetchRules };
};