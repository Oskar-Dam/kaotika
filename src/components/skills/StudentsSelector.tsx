import React from 'react';

interface Student {
  userId: string;
  profile: {
    name: {
      fullName: string;
    };
  };
}

interface StudentSelectorProps {
  students: Student[];
  selectedStudent: string | null;
  handleStudentSelect: (id: string) => void;
  loading: boolean;
}

const StudentSelector: React.FC<StudentSelectorProps> = ({ students, selectedStudent, handleStudentSelect, loading }) => (
  <div className="relative w-full max-w-3xl">
    <select
      className="block w-full bg-gray-800 border border-medievalGold rounded-md p-2 pr-10 text-3xl text-medievalSepia"
      onChange={(e) => handleStudentSelect(e.target.value)}
      value={selectedStudent || ''}
    >
      <option value="" disabled>
        {loading ? 'Loading students...' : 'Select a student'}
      </option>
      {students.map((student) => (
        <option key={student.userId} value={student.userId}>
          {student.profile.name.fullName.toUpperCase()}
        </option>
      ))}
    </select>
  </div>
);

export default StudentSelector;