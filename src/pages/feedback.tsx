import React, { useEffect, useState } from 'react';
import { Course } from '@/_common/interfaces/Course';
import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react';
import { Student } from '@/_common/interfaces/Student';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Textarea } from "@heroui/react";
import Image from 'next/image';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, SliderValue} from "@nextui-org/react";
import KaotikaButton from '@/components/KaotikaButton';
import Loading from '@/components/Loading';
import { FaLess } from 'react-icons/fa';

const feedback = () => {

  const { data: session } = useSession();
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [action, setAction] = React.useState(null);
  
  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  useEffect(() => {
      console.log("useEffect Fetching courses");
      if (!session) return;
      const fetchCourses = async () => {
        try {
          setLoading(true);
          console.log("Fetching courses");
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
    }, []);

    useEffect(() => {
      if (!session || !selectedCourse) return;
      const fetchStudents = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/classroom/courses/${selectedCourse}/students`);
          const data = await res.json();
          console.log(data.students)
          setStudents(data.students);
        } catch (error) {
          console.error('Failed to fetch students:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchStudents();
    }, [selectedCourse]);

    useEffect(() => {
      if(selectedStudent) onOpen();
    }, [selectedStudent])

    const handleNewFeedback = (student: Student) => {
      setSelectedStudent(student);
    }

    const handleFeedbackRequest = (student: Student) => {
      //setSelectedStudent(student);
    }
    const handleStrength = (value: string) => {
      console.log(value)
    }

  if (loading) {
    return <Loading />;
  }
  
  return (
    <Layout>
      <div className='flex justify-around'>
        {!selectedCourse && (
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
									{course.name}
								</option>
							))}
						</select>
					</div>)}
        {selectedCourse && (
          <>
            <Table 
              color="warning"
              selectionMode="none" 
              classNames={{
                table: "text-xl",
                td: "text-xl",
                tr: "text-xl",
                tbody: "text-xl"

              }} 
              aria-label="Kaotika Students">
              <TableHeader>
                <TableColumn className="text-center text-xl text-black">CLASSROOM ID</TableColumn>
                <TableColumn className="text-center text-xl text-black">NAME</TableColumn>
                <TableColumn className="text-center text-xl text-black">VIEW FEEDBACKS</TableColumn>
                <TableColumn className="text-center text-xl text-black">WRITE FEEDBACK</TableColumn>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.userId}>
                    <TableCell >{student.userId}</TableCell>
                    <TableCell className="text-center"><span>{student.profile.name.fullName.toUpperCase()}</span></TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleFeedbackRequest(student)}
                          className="flex items-center border-sepia border py-2 px-4 rounded  hover:bg-darkSepia transition"
                          >
                          <Image src="/images/icons/eye.webp" alt="Cross imager" width={48} height={48} className="rounded-full" />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleNewFeedback(student)}
                          className="flex items-center border-sepia border py-2 px-4 rounded  hover:bg-darkSepia transition"
                          >
                          <Image src="/images/icons/quill.webp" alt="Cross imager" width={48} height={48} className="rounded-full" /> 
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>  
          </>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl text text-center">{selectedStudent?.profile.name.fullName}</ModalHeader>
              <ModalBody>
                <>
                  <Textarea
                    className="max-w-xs"
                    errorMessage="The description should be at least 255 characters long."
                    isInvalid={false}
                    label="Description"
                    placeholder="Enter your description"
                    variant="bordered"
                    onValueChange={(value)=>handleStrength(value)}
                  />
                </>  
              </ModalBody>
              <ModalFooter>
                <KaotikaButton text='CANCEL' handleClick={onClose} /> 
                <KaotikaButton text='ACCEPT' handleClick={onClose} /> 
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Layout>
  )
}

export default feedback