import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Loading';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, SliderValue} from "@nextui-org/react";
import {Slider} from "@nextui-org/react";
import { Toaster, toast } from 'sonner'
import Image from 'next/image';
import KaotikaButton from '@/components/KaotikaButton';
import { Course } from '@/_common/interfaces/Course';
import { Student } from '@/_common/interfaces/Student';

const AcolytesPage = () => {
	const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
	const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const [gold, setGold] = useState<number | number[]>(0);
  const [experience, setExperience] = useState<number | number[]>(0);
  const [type, setType] = useState<string>("")

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
	}, [selectedCourse])
	
  useEffect(() => {
    if(selectedStudent) onOpen();
  }, [selectedStudent])
  

	const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleClick = (student: Student, type: string) => {
    setType(type);
    setSelectedStudent(student);
  }

  const handleGold = (value: SliderValue) => {
    setGold(value)
  }

  const handleExperience = (value: SliderValue) => {
    setExperience(value)
  }

  const applyBonification = async() => {
    try {
      setLoading(true);
      console.log("update gold and experience");
      const response = await fetch(`/api/player/bonification?classroom_Id=${selectedStudent?.userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
          gold,
          experience     
        }),
      });
      const results = await response.json();
      console.log(results);
    } catch (error) {
      console.error('Failed to patch player bonification:', error);
    } finally {
      onClose();
      setLoading(false);
    } 
  }

  const applyUnique = async () => {
    try {
      setLoading(true);
      console.log("Assigning unique item");
      const response = await fetch(`/api/player/unique?classroom_Id=${selectedStudent?.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const results = await response.json();
      if (results.status === 'OK') {
        toast('Unique object assigned!');
        console.log("Assigned unique item");
      }
    } catch (error) {
      console.error('Failed to patch player bonification:', error);
    } finally {
      onClose();
      setType("");
      setLoading(false);
    } 
  }

  if (loading) {
		return <Loading />;
	}

  return (
		<Layout>
      <div className="flex justify-center">
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
                <TableColumn className="text-center text-xl text-black">ASSIGN UNIQUE ITEM</TableColumn>
                <TableColumn className="text-center text-xl text-black">ASSIGN GOLD & EXP</TableColumn>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.userId}>
                    <TableCell >{student.userId}</TableCell>
                    <TableCell className="text-center"><span>{student.profile.name.fullName.toUpperCase()}</span></TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleClick(student, "unique")}
                          className="flex items-center bg-medievalSepia text-black text-2xl py-2 px-4 rounded  hover:bg-darkSepia transition"
                          >
                          <Image src="/images/icons/level.png" alt="Cross imager" width={48} height={48} className="rounded-full" />
                          <span>Assign unique item</span> 
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleClick(student, "bonification")}
                          className="flex items-center bg-medievalSepia text-black text-2xl py-2 px-4 rounded  hover:bg-darkSepia transition"
                          >
                          <Image src="/images/icons/gold.png" alt="Cross imager" width={48} height={48} className="rounded-full" />
                          <span>Apply bonification</span>  
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
                
                {type === "bonification" 
                ?
                  <>
                    <h2 className="flex flex-col gap-1 text text-center text-3xl">Apply this settings?</h2>
                    <Slider 
                      size='md'
                      label="Gold" 
                      step={500} 
                      maxValue={15000} 
                      minValue={-15000} 
                      defaultValue={0}
                      color="foreground"
                      onChangeEnd={handleGold}
                      classNames={{
                        base: "max-w-md",
                        filler: "bg-gradient-to-r from-blackSepia to-medievalSepia",
                        label: "text-2xl",
                        value: "text-3xl"
                      }}
                    />
                    <Slider 
                      size='md'
                      label="Experience" 
                      step={100} 
                      maxValue={4000} 
                      minValue={0} 
                      defaultValue={0}
                      color="foreground"
                      onChangeEnd={handleExperience}
                      classNames={{
                        base: "max-w-md",
                        filler: "bg-gradient-to-r from-blackSepia to-medievalSepia",
                        label: "text-2xl",
                        value: "text-3xl"
                      }}
                    />
                  </>
                : <h2 className="flex flex-col gap-1 text text-center text-3xl">Are you sure to assign unique item?</h2>}
                
              </ModalBody>
              <ModalFooter>
                <KaotikaButton text='CANCEL' handleClick={onClose} /> 
                <KaotikaButton text='ACCEPT' handleClick={type === "bonification" ? applyBonification : applyUnique} /> 
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Toaster
        position="top-center"
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: 'w-96 text-4xl p-2 text-center mb-4 border-1 rounded-lg border-sepia bg-black/90',
            title: 'text-4xl text-red-800',
            
          },
          style: {
            fontFamily: 'kaotika'
          }
        }}
      />
    </Layout>
  )
}

export default AcolytesPage