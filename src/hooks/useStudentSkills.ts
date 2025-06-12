import { Skill } from '@/_common/interfaces/Skill';
import { useState, useEffect } from 'react';

export const useStudentSkills = (selectedStudent: string | null) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedStudent) return;

    const fetchSkills = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/player/by-classroom-id/${selectedStudent}`);
        const data = await res.json();
        setSkills(data);
      } catch (error) {
        setError('Failed to fetch student skills');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [selectedStudent]);

  return { skills, loading, error };
};