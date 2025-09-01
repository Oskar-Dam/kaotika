import { useEffect, useState } from "react";
import { getStudentClassrooms,getCourseTopics, getOpenTasksFromClassroom } from "@/services/googleClassroom/googleClassroom";
import { useSession } from "next-auth/react";
import { Classroom } from "@/_common/interfaces/Classroom";
import { CLASSROOM_CONFIG } from "@/config/classroom";
import { MAP_POINTS } from "@/config/mapPoints";
import { MapPoint } from "@/_common/interfaces/MapPoint";

export const usePlayerMissions = () => {

  const { data: session } = useSession();
  const token = session?.accessToken;
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      setLoading(true);
      setError(null);

      try {
        const playerClassrooms: Classroom[] = await getStudentClassrooms(token);
        const kaotikaAdventureClassroom = playerClassrooms.filter(classroom=> classroom.name === CLASSROOM_CONFIG.currentAdventure);
        const topics = await getCourseTopics(token, kaotikaAdventureClassroom[0].id);

        const mapPoints = MAP_POINTS.map(point => {
          const isUnlocked = topics.some(topic =>
            topic.name.toLowerCase().includes(point.mapPointName.toLowerCase())
          );
          return {
            ...point,
            isUnlocked,
          };
        });

        setMapPoints(mapPoints ?? []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch classrooms");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return { mapPoints, loading, error };
};