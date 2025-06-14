import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loading from './Loading';

interface Course {
  id: string;
  name: string;
}

const CourseDropdown: React.FC = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!session) return;
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/classroom/courses/');
        const data = await res.json();
        setCourses(data.courses.filter((course: { courseState: string; }) => course.courseState === "ACTIVE"));
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [session]);

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
    router.push(`/dashboard/course/${courseId}`);
  };

  return (
    
    <div className="flex justify-center">
      {(loading) ? <Loading /> : null}
      <div className="relative inline-block w-1/2">
        <select
          className="block w-full bg-gray-800 border border-medievalGold rounded-md p-2 pr-10 text-3xl text-medievalSepia"
          onChange={(e) => handleCourseSelect(e.target.value)}
          value={selectedCourse || ''}
        >
          <option value="" disabled>
            {loading ? 'Loading courses...' : 'Select a course'}
          </option>
          {courses?.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CourseDropdown;