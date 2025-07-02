import { Skill } from '@/_common/interfaces/Skill';
import { useState, useEffect, useCallback } from 'react';

export const useStudentSkills = (selectedStudent: string | null) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSkills = useCallback(async () => {
    if (!selectedStudent) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/player/skills/by-classroom-id?classroomId=${selectedStudent}`);
      const result = await res.json();
      setSkills(result.data);
    } catch (error) {
      setError('Failed to fetch student skills');
    } finally {
      setLoading(false);
    }
  }, [selectedStudent]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return { skills, skillsLoading, error, refetchSkills: fetchSkills };
};