import React from 'react'

interface Course {
  id: string;
  name: string;
}

interface CourseSelectorProps {
  courses: Course[];
  selectedCourse: string | null;
  handleCourseSelect: (id: string) => void;
  loading: boolean;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ courses, selectedCourse, handleCourseSelect, loading }) => (
  <div className="relative w-full max-w-3xl">
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
          {course.name}
        </option>
      ))}
    </select>
  </div>
);

export default CourseSelector