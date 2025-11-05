import { Player } from '@/_common/interfaces/Player';
import { API } from '@/constants/apiRoutes';
import { ERROR } from '@/constants/errors';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export const useHallOfFame = () => {
  const { data: session } = useSession();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!session) return;

    const fetchHallOfFame = async () => {
      try {
        setLoading(true);
        const res = await fetch(API.HALL_OF_FAME);
        const data = await res.json();
        setPlayers(data.data);
      } catch (error) {
        console.error(ERROR.FETCH_HALL_OF_FAME, error);
      } finally {
        setLoading(false);
      }
    };

    fetchHallOfFame();
  }, [session]);

  return { players, loading };
};