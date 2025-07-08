import { useEffect, useState } from "react";
import { getStudentClassrooms, getOpenTasksFromClassroom } from "@/services/googleClassroom/googleClassroom";
import { getMapPoints } from "@/services/maps/map";
import { MapPoint } from "@/_common/interfaces/MapPoint";

export const useMap = (token: string) => {
  const [points, setPoints] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const classrooms = await getStudentClassrooms(token);

        let openTasks: string[] = [];
        for (const classroom of classrooms) {
          const tasks = await getOpenTasksFromClassroom(token, classroom.id);
          openTasks = openTasks.concat(tasks.map(t => t.id));
        }

        const mapPoints = await getMapPoints();

        //TODO FILTRAR UNLOCKED
        const filteredPoints = mapPoints.map(p => ({
          ...p,
          isUnlocked: false
        }));

        setPoints(filteredPoints);
      } catch (err) {
        console.error(err);
        setError("Failed to load map data");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return { points, loading, error };
};