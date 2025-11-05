import { Student } from '@/_common/interfaces/Student';
import { API } from '@/constants/apiRoutes';
import { ERROR } from '@/constants/errors';
import { useState, useEffect } from 'react';


export const useCourseStudents = (selectedCourse: string | null) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedCourse) return;

    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await fetch(API.STUDENTS_FROM_COURSE(selectedCourse));
        const data = await res.json();
        setStudents(data.students);
      } catch (error) {
        setError(ERROR.FETCH_STUDENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedCourse]);

  return { students, studentsLoading, error };
};