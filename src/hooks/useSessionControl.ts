import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MENTOR_EMAIL } from '@/constants/constants';
import { Course } from "@/_common/interfaces/Course";
import { Skill } from "@/_common/interfaces/Skill";

export const useSessionControl = () => {
  const { data: session } = useSession();
  const [isMentor, setIsMentor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentSkills, setCurrentSkills] = useState<Skill[]>([]);

  useEffect(() => {
    if (!session?.user?.email) return;
    setIsMentor(session.user.email.endsWith(MENTOR_EMAIL));
  }, [session]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/classroom/courses/');
        const data = await res.json();
        setCourses(data.courses.filter((course: any) => course.courseState === 'ACTIVE'));
      } catch (error) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    const fetchPlayerSkills = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/player/skills/email?email=${session?.user?.email}`);
        if (res.status === 200) {
          const data = await res.json();
          setCurrentSkills(data.data);
        } else {
          setError('Failed to fetch skills');
        }
      } catch (error) {
        setError('Failed to fetch skills');
      } finally {
        setLoading(false);
      }
    };

    if (isMentor) {
      fetchCourses();
    } else {
      fetchPlayerSkills();
    }
  }, [isMentor]);

  return { isMentor, loading, error, courses, currentSkills };
};