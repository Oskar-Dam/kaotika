import { useSession } from 'next-auth/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Tooltip } from "@nextui-org/react";
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { useState } from 'react';
import CourseSelector from '@/components/skills/CourseSelector';
import StudentSelector from '@/components/skills/StudentsSelector';
import SkillGrid from '@/components/skills/SkillGrid';
import { Skill } from '@/_common/interfaces/Skill';
import { useSessionControl } from "@/hooks/useSessionControl";
import { useCourseStudents } from '@/hooks/useCourseStudents';
import { useStudentSkills } from '@/hooks/useStudentSkills';
import KaotikaButton from '@/components/KaotikaButton';
import { useApplySkill } from '@/hooks/useApplySkill';

 type currentSkillForSelectedStudent = {
  classroomId: string;
  skillId: string;
  skillDescription: string;
  skillPosition: number
}

const Skills = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [currentSkillsForSelectedStudent, setCurrentSkillsForSelectedStudent] = useState<currentSkillForSelectedStudent>();
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  

  const { 
    isMentor, 
    loading: sessionLoading,
    error: sessionError,
    courses, 
    currentSkills 
  } = useSessionControl();

  const { 
    students, 
    loading: studentsLoading,
    error: studentsError, 
  } = useCourseStudents(selectedCourse);

  const { 
    skills, 
    loading: skillsLoading, 
    error : skillsError,
    refetchSkills
  } = useStudentSkills(selectedStudent);

  const { 
    applySkill, 
    loading: applySkillLoading, 
    error: applySkillError 
  } = useApplySkill(() => {
    onClose(); 
  });

  const isLoading = sessionLoading || studentsLoading || skillsLoading || applySkillLoading;

  const canClick = (position: number, skill: Skill) => {
    if(position === 0 && !skill.levels[position].active || position > 0 && skill.levels[position - 1].active) {
      return true;
    }
    return false;
  }
  
  const handleClick = (position: number, skill: Skill, selectedStudent: string) => {
    if(canClick(position, skill)) {
      const data = {
        classroomId: selectedStudent,
        skillId: skill._id,
        skillDescription: skill.levels[position].description,
        skillPosition: position
      }
      setCurrentSkillsForSelectedStudent(data);
      onOpen();
    }
  }

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudent(studentId);
  };

  const handleApplySkill = async() => {
    try {
      await applySkill({
        classroomId: currentSkillsForSelectedStudent?.classroomId!,
        skillId: currentSkillsForSelectedStudent?.skillId!,
        skillDescription: currentSkillsForSelectedStudent?.skillDescription!,
        skillPosition: currentSkillsForSelectedStudent?.skillPosition!,
      });
  
      await refetchSkills();
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Layout>
     
      <div className="relative min-h-screen text-white p-8 flex flex-col items-center overflow-hidden">
      {!isMentor && (
        <>
        <video
          className="fixed inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/skills-bg.mp4" type="video/mp4" />
        </video>

        <div className="fixed inset-0 bg-black/50 z-10"></div>
        </>
        )}
    	<div className="flex flex-col items-center space-y-6 w-full px-4">
        
        {isMentor && !selectedCourse && (
          <CourseSelector
            courses={courses}
            selectedCourse={selectedCourse}
            handleCourseSelect={handleCourseSelect}
            loading={isLoading}
          />
        )}
        {isMentor && selectedCourse && !selectedStudent && (
          <StudentSelector
            students={students}
            selectedStudent={selectedStudent}
            handleStudentSelect={handleStudentSelect}
            loading={isLoading}
          />
        )}
        {isMentor && selectedStudent && (
          <>
          <StudentSelector
            students={students}
            selectedStudent={selectedStudent}
            handleStudentSelect={handleStudentSelect}
            loading={isLoading}
          />
          <SkillGrid
            skills={skills}
            selectedStudent={selectedStudent}
            canClick={canClick}
            handleClick={handleClick}
          />
          </>
        )}
        {!isMentor && (
          currentSkills.map((skill) => (
            <div
              key={skill._id}
              className="w-2/3 mb-12 relative rounded-2xl shadow-lg border-2 border-medievalSepia overflow-hidden"
            >
              <div className="relative z-10 p-6 w-full bg-black/70">
                <h2 className="text-3xl text-center text-medievalSepia  mb-2">
                  {skill.epicName}
                </h2>
                <p className="text-2xl text-medievalSepia text-center  mb-6">{skill.description}</p>
                         
                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {skill.levels.map((level, index) => {
                    const isActive = level.active;
                    return (
                      <Tooltip
                            className="w-auto text-3xl mb-4 border-1 rounded-lg border-sepia bg-black/90"
                            placement="top"
                            size="sm"
                            showArrow={true}
                            content={level.description}
                          >
                      <div
                        key={index}
                        className={`w-full md:w-1/3 p-4 rounded-xl border-2 transition duration-300 relative overflow-hidden  ${
                          isActive ? "border-medievalSepia " : "border-gray-800"
                        }`}
                      >
                        
                        {!isActive && (

                          
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                              <img
                                src="/images/skills/lock.webp"
                                alt="locked"
                                className="drop-shadow-md"
                              />
                              <div className="w-full text-3xl text-medievalGold">
                                <div className="flex flex-row justify-around">
                                  <span className="text-medievalSepia">Exp: {level.exp}</span>  
                                  <span className="text-medievalSepia">Gold: {level.gold}</span>
                                </div>
                                <div className="flex flex-row justify-around">
                                  <span className="text-medievalSepia">{level.unique ? "Unique Item" : "Magical Item"}</span>  
                                  <span className="text-medievalSepia">{level.bonus ? `+${level.bonus.value}% ${level.bonus.attribute}` : null}</span>    
                                </div>
                                <div className="text-center">
                                  <span className="text-medievalSepia">Altar de la Experiencia 5</span>
                                </div>
                              </div>
                            </div>
                          
                        )}

                        <div
                          className={`relative z-10 space-y-2 text-center${
                            isActive ? "" : "grayscale opacity-10 pointer-events-none"
                          }`}
                        >

                          <div className="flex justify-center mb-3">
                            <img
                              src={level.image}
                              alt={level.epicName}
                              className="h-full object-contain"
                            />
                          </div>

                          <h3 className="text-3xl text-medievalSepia">{level.epicName}</h3>
                          <p className="text-2xl text-medievalGold">{level.description}</p>
                        </div>
                      </div>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
    	</div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-medievalSepial text-center text-3xl">Are you sure to unlock the current skill?</ModalHeader>
              <ModalBody>
                <h2 className="flex flex-col gap-1 text text-center text-2xl">{currentSkillsForSelectedStudent?.skillDescription}</h2>
              </ModalBody>
              <ModalFooter>
                <KaotikaButton text='ACCEPT' handleClick={handleApplySkill} /> 
                <KaotikaButton text='CANCEL' handleClick={onClose} /> 
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </div>
		</Layout>
  )
}
export default Skills;