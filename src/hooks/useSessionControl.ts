import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MENTOR_EMAIL } from '@/constants/constants';
import { Course } from "@/_common/interfaces/Course";
import { Skill } from "@/_common/interfaces/Skill";
import { API } from "@/constants/apiRoutes";
import { ERROR } from "@/constants/errors";
import { STATUS } from "@/constants/classroom";

export const useSessionControl = () => {
  const { data: session } = useSession();
  const [isMentor, setIsMentor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentSkills, setCurrentSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const email = session?.user?.email;
    if (!email) return;
    setIsMentor(email.endsWith(MENTOR_EMAIL));
  }, [session?.user?.email]);

  useEffect(() => {
    if (!session?.user?.email) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (isMentor) {
          const res = await fetch(API.COURSES);
          if (!res.ok) throw new Error(ERROR.FETCH_COURSES);
          const data = await res.json();
          const activeCourses = data.courses.filter((course: any) => course.courseState === STATUS.ACTIVE)
          setCourses(activeCourses);
        } else {
          const email = session.user?.email;
          const res = await fetch(API.PLAYER_SKILLS(email));
          if (!res.ok) throw new Error(ERROR.FETCH_SKILLS);
          const data = await res.json();
          setCurrentSkills(data.data);
        }
      } catch (err) {
        setError(ERROR.FETCH_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isMentor, session?.user?.email]);

  return { isMentor, loading, error, courses, currentSkills };
};