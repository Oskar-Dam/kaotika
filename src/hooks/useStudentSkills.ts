import { Skill } from '@/_common/interfaces/Skill';
import { useState, useEffect } from 'react';

export const useStudentSkills = (selectedStudent: string | null) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSkills = async () => {
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
  };
  useEffect(() => {
    fetchSkills();
  }, [selectedStudent]);

  return { skills, loading, error };
};