import { useSession } from 'next-auth/react';
import { MENTOR_EMAIL } from '@/constants/constants';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';
import { Course } from '@/_common/interfaces/Course';
import { Student } from '@/_common/interfaces/Student';
import CourseSelector from '@/components/skills/CourseSelector';
import StudentSelector from '@/components/skills/StudentsSelector';
import SkillGrid from '@/components/skills/SkillGrid';
import { Skill } from '@/_common/interfaces/Skill';
import { useSessionControl } from "@/hooks/useSessionControl";
import { useCourseStudents } from '@/hooks/useCourseStudents';
import { useStudentSkills } from '@/hooks/useStudentSkills';

const fakeSkills = [
  {
    id: "8982938273",
    epicName: "Design of Arcane Gateways",
    description: "Diseña la arquitectura de aplicaciones web (componentes técnicos, funcionales y visuales).",
    image: "/images/skills/skill_1/skill_1_bg.webp",
    levels: [
      {
        description: "Conoce los elementos que intervienen en el diseño de la arquitectura de aplicaciones web",
        image: "/images/skills/skill_1/level_1.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true,
        modifier: {
          name: "Dexterity",
          value: 5
        }
      },
      {
        description: "Diseña de manera eficaz y eficiente la arquitectura de aplicaciones web",
        image: "/images/skills/skill_1/level_2.webp",
        epicName: "Silent Adept",
        exp: 1000,
        gold: 1000,
        unique: false,
        active: true,
        modifier: {
          name: "Constitution",
          value: 8
        }
      },
      {
        description: "Analiza y evalúa arquitecturas de aplicaciones web proponiendo mejoras",
        image: "/images/skills/skill_1/level_3.webp",
        epicName: "Arcane Master",
        exp: 1500,
        gold: 1500,
        unique: false,
        active: false,
        modifier: {
          name: "Insanity",
          value: 5
        }
      }
    ]
  },
  {
    id: "backend",
    epicName: "Artisan of Runic Views",
    description: "Desarrolla interfaces de usuario de aplicaciones web y la funcionalidad asociada. Front-end.",
    image: "/images/skills/skill_2/skill_2_bg.webp",
    levels: [
      {
        description: "Conoce los elementos que intervienen en el desarrollo de interfaces web",
        image: "/images/skills/skill_2/level_1.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true,
        modifier: {
          name: "Charisma",
          value: 5
        }
      },
      {
        description: "Desarrolla interfaces web de manera eficaz y eficiente",
        image: "/images/skills/skill_2/level_2.webp",
        epicName: "Whispering Soul",
        exp: 1000,
        gold: 1000,
        unique: false,
        active: false,
        modifier: {
          name: "Insanity",
          value: 5
        }
      },
      {
        description: "Analiza y evalúa interfaces web proponiendo mejoras",
        image: "/images/skills/skill_2/level_3.webp",
        epicName: "Whispering Soul",
        exp: 1500,
        gold: 1500,
        unique: false,
        active: false,
        modifier: {
          name: "Intelligence",
          value: 10
        }
      }
    ]
  },
  {
    id: "testing",
    epicName: "Back-end Rites and Relics",
    description: "Programa las funcionalidades de aplicaciones web y maneja bases de datos. Back-end.",
    image: "/images/skills/skill_3/skill_3_bg.webp",
    levels: [
      {
        description: "Conoce los elementos que intervienen en la programación de funcionalidades de aplicaciones web y en el manejo de bases de datos",
        image: "/images/skills/skill_3/level_1.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true,
        modifier: {
          name: "Insanity",
          value: 5
        }
      },
      {
        description: "Programa de manera eficaz y eficiente las funcionalidades de aplicaciones web y maneja bases de datos",
        image: "/images/skills/skill_3/level_2.webp",
        epicName: "Whispering Soul",
        exp: 1000,
        gold: 1000,
        unique: false,
        active: false,
        modifier: {
          name: "Strength",
          value: 5
        }
      },
      {
        description: "Analiza y evalúa programaciones de funcionalidades de aplicaciones web incluídas bases de datos proponiendo mejoras" ,
        image: "/images/skills/skill_3/level_3.webp",
        epicName: "Whispering Soul",
        exp: 1500,
        gold: 1500,
        unique: false,
        active: false,
        modifier: {
          name: "Dexterity",
          value: 10
        }
      }
    ]
  },
  {
    id: "kaotikal",
    epicName: "Keeper of Deployed Realms",
    description: "Maneja los recursos necesarios de servidor para implementar aplicaciones web y publicarlas.",
    image: "/images/skills/skill_4/skill_4_bg.webp",
    levels: [
      {
        description: "Conoce los recursos de servidor necesarios para implementar aplicaciones web y publicarlas",
        image: "/images/skills/skill_4/level_1.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true,
        modifier: {
          name: "Insanity",
          value: 5
        }
      },
      {
        description: "Maneja de manera eficaz y eficiente los recursos necesarios de servidor para implementar y publicar aplicaciones web",
        image: "/images/skills/skill_4/level_2.webp",
        epicName: "Whispering Soul",
        exp: 1000,
        gold: 1000,
        unique: false,
        active: true,
        modifier: {
          name: "Insanity",
          value: 5
        }
      },
      {
        description: "Analiza y evalúa implementaciones y publicaciones web proponiendo mejoras" ,
        image: "/images/skills/skill_4/level_3.webp",
        epicName: "Whispering Soul",
        exp: 1500,
        gold: 1500,
        unique: false,
        active: false,
        modifier: {
          name: "Insanity",
          value: 5
        }
      }
    ]
  },
  {
    id: "morfdfti",
    epicName: "Brotherhood of Code Trials",
    description: "Trabaja en equipo con metodologías ágiles, sistemas de control de versiones e implementa tests unitarios.",
    image: "/images/skills/skill_5/skill_5_bg.webp",
    levels: [
      {
        description: "Conoce los elementos que intervienen en el trabajo en equipo con metodologías ágiles y sistemas de control de versiones",
        image: "/images/skills/skill_5/level_1.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true,
        modifier: {
          name: "Insanity",
          value: 5
        }
      },
      {
        description: "Trabaja en equipo de manera eficaz y eficiente con metodologías ágiles y sistemas de control de versiones",
        image: "/images/skills/skill_5/level_2.webp",
        epicName: "Whispering Soul",
        exp: 1000,
        gold: 1000,
        unique: false,
        active: true,
        modifier: {
          name: "Insanity",
          value: 5
        }
      },
      {
        description: "Analiza y evalúa trabajo en equipo con metodologías ágiles y sistemas de control de versiones proponiendo mejoras" ,
        image: "/images/skills/skill_5/level_3.webp",
        epicName: "Whispering Soul",
        exp: 1500,
        gold: 1500,
        unique: false,
        active: false,
        modifier: {
          name: "Insanity",
          value: 5
        }
      }
    ]
  },
  {
    id: "mortdsfdsi",
    epicName: "Path of the Resolute",
    description: "Persevera en la tarea superando dificultades con autonomía y completando las metas comprometidas.",
    image: "/images/skills/skill_6/skill_6_bg.webp",
    levels: [
      {
        description: "Conoce las acciones necesarias para perseverar en la tarea",
        image: "/images/skills/skill_6/level_1.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true,
        modifier: {
          name: "Insanity",
          value: 5
        }
      },
      {
        description: "Mantiene el esfuerzo para alcanzar metas",
        image: "/images/skills/skill_6/level_2.webp",
        epicName: "Whispering Soul",
        exp: 1000,
        gold: 1000,
        unique: false,
        active: true
      },
      {
        description: "Analiza y evalúa procesos que ayudan o dificultan conseguir metas proponiendo mejoras" ,
        image: "/images/skills/skill_6/level_3.webp",
        epicName: "Whispering Soul",
        exp: 1500,
        gold: 1500,
        unique: false,
        active: false,
        modifier: {
          name: "Insanity",
          value: 5
        }
      }
    ]
  },
  {
    id: "morsdfdsfti",
    epicName: "Tongue of the Guilds",
    description: "Maneja documentación técnica y se comunica con fluidez de forma oral y escrita con clientes y proveedores en idioma Euskera, Inglés y Castellano.",
    image: "/images/skills/skill_7/skill_7_bg.webp",
    levels: [
      {
        description: "Comprende los conceptos clave relacionados con la documentación técnica y la comunicación en idioma Euskera, Inglés y Castellano.",
        image: "/images/skills/skill_7/level_1.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true,
        modifier: {
          name: "Insanity",
          value: 5
        }
      },
      {
        description: "Utiliza la comprensión de los conceptos clave para aplicarlos en situaciones prácticas de comunicación en idioma Euskera, Inglés y Castellano. ",
        image: "/images/skills/skill_7/level_2.webp",
        epicName: "Whispering Soul",
        exp: 1000,
        gold: 1000,
        unique: false,
        active: true,
        modifier: {
          name: "Insanity",
          value: 5
        }
      },
      {
        description: "Evalúa y crea soluciones innovadoras en situaciones prácticas de documentación técnica y comunicación en idioma Euskera, Inglés y Castellano." ,
        image: "/images/skills/skill_7/level_3.webp",
        epicName: "Whispering Soul",
        exp: 1500,
        gold: 1500,
        unique: false,
        active: true,
        modifier: {
          name: "Insanity",
          value: 5
        }
      }
    ]
  },
  {
    id: "msfdorti",
    epicName: "Arquitectura de Portales Arcanos",
    description: "Comprende los riesgos laborales, su prevención y la gestión de la prevención y los primeros auxilios en la empresa.",
    image: "/images/skills/skill_8/skill_8_bg.webp",
    levels: [
      {
        description: "Conoce los riesgos laborales.",
        image: "/images/skills/skill_8/level_1.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true,
        modifier: {
          name: "Strength",
          value: 5
        }
      },
      {
        description: "Aplica las herramientas de prevención de riesgos laborales.",
        image: "/images/skills/skill_8/level_2.webp",
        epicName: "Whispering Soul",
        exp: 1000,
        gold: 1000,
        unique: false,
        active: true,
        modifier: {
          name: "Charisma",
          value: 10
        }
      },
      {
        description: "Gestiona la prevención de riesgos laborales y primeros auxilios." ,
        image: "/images/skills/skill_8/level_3.webp",
        epicName: "Whispering Soul",
        exp: 1500,
        gold: 1500,
        unique: false,
        active: false,
        modifier: {
          name: "Insanity",
          value: 5
        }
      }
    ]
  },
];

const canClick = (position: number, skill: Skill) => {
  if(position === 0 && !skill.levels[position].active || position > 0 && skill.levels[position - 1].active) {
    return true;
  }
  return false;
}

const handleClick = (position: number, skill: Skill, selectedStudent: string) => {
  if(canClick(position, skill)) {
    console.log(selectedStudent)
    console.log(skill.id);
    console.log(skill.levels[position].description);
    console.log(position);
  }
}

const Skills = () => {
  const { data: session } = useSession();
 // const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  //const [loading, setLoading] = useState<boolean>(false);
	//const [students, setStudents] = useState<Student[]>([]);
  const [currentSkillsForSelectedStudent, setCurrentSkillsForSelectedStudent] = useState<Student>();
  //const [error, setError] = useState<string | null>(null);
 // const [currentSkills, setCurrentSkills] = useState<Skill[] | null>(null);
  //const [isMentor, setIsMentor] = useState<boolean>(false);


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
    error : skillsError
  } = useStudentSkills(selectedStudent);

  const isLoading = sessionLoading || studentsLoading || skillsLoading;
  /* useEffect(() => {
    
    if (!session?.user?.email) return;

    const isMentorUser = session.user.email.endsWith(MENTOR_EMAIL);
    setIsMentor(isMentorUser); 

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
      
    const fetchPlayerSkills = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/player/skills/email?email=${session?.user?.email}`);
        if (res.status === 200) {
          const response = await res.json();
          console.log(response.data)
          setCurrentSkills(response.data);
          
        } else if (res.status === 404) {
          const response = await res.json();
          setError(response);
        } else {
          setError('An error occurred while checking skills');
        }
      } catch (error) {
        setError('An error occurred while checking skills');
      } finally {
        setLoading(false);
      }
    }

    if (isMentorUser) {
      console.log("User is mentor: fetching courses");
      fetchCourses();
    } else {
      console.log("User is not mentor: fetching skills");
      fetchPlayerSkills();
    }
  }, [session]);

  useEffect(() => {
    if (!session || !selectedCourse) return;

    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/classroom/courses/${selectedCourse}/students`);
        const data = await res.json();
        
        console.log(data.students)
        const classroomStudents = data.students;
        setStudents(classroomStudents);
  
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedCourse]);

  useEffect(() => {
    if (!session || !selectedStudent) return;

    const fetchStudentSkillsByClassroomId = async (classroomId: string) => {
      try {
        setLoading(true);
        const student = await fetch(`/api/player/by-classroom-id/${classroomId}`);
        const data = await student.json();
        
        console.log(data);
        setCurrentSkillsForSelectedStudent(data);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStudentSkillsByClassroomId(selectedStudent);
  }, [selectedStudent]); */

  

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudent(studentId);
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Layout>
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
          <SkillGrid
            skills={fakeSkills}
            selectedStudent={selectedStudent}
            canClick={canClick}
            handleClick={handleClick}
          />
        )}
        {!isMentor && (
          fakeSkills.map((skill) => (
            <div
              key={skill.id}
              className="w-2/3 mb-12 relative bg-gray-900 rounded-2xl shadow-lg border-2 border-yellow-700 overflow-hidden"
            >

              <div className="absolute inset-0">
                <img
                  src={skill.image}
                  alt={skill.epicName}
                  className="object-cover w-full h-full opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              </div>
          
              <div className="relative z-10 p-6 w-full">
                <h2 className="text-3xl text-center text-yellow-300  mb-2">
                  {skill.epicName}
                </h2>
                <p className="text-2xl text-medievalSepia text-center  mb-6">{skill.description}</p>
                         
                <div className="flex flex-col md:flex-row gap-6 w-full">
                  {skill.levels.map((level, index) => {
                    const isActive = level.active;
                    return (
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
                            <div className="text-3xl text-medievalGold">
                              <p>✦ Exp: <span className="text-medievalSepia">{level.exp}</span></p>
                               <p>✦ Gold: <span className="text-medievalSepia">{level.gold}</span></p>
                               <p>✦ <span className="text-medievalSepia">{level.modifier?.name} + {level.modifier?.value}</span></p>
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
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
    	</div>
		</Layout>
  )
}
export default Skills;