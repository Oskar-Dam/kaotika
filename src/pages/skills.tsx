import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Course } from '@/_common/interfaces/Course';
import { Student } from '@/_common/interfaces/Student';

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
        active: true
      },
      {
        description: "Diseña de manera eficaz y eficiente la arquitectura de aplicaciones web",
        image: "/images/skills/skill_1/level_2.webp",
        epicName: "Silent Adept",
        exp: 1000,
        gold: 500,
        unique: false,
        active: true
      },
      {
        description: "Analiza y evalúa arquitecturas de aplicaciones web proponiendo mejoras",
        image: "/images/skills/skill_1/level_3.webp",
        epicName: "Arcane Master",
        exp: 1500,
        gold: 500,
        unique: false,
        active: false
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
        active: true
      },
      {
        description: "Desarrolla interfaces web de manera eficaz y eficiente",
        image: "/images/skills/skill_2/level_2.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: false
      },
      {
        description: "Analiza y evalúa interfaces web proponiendo mejoras",
        image: "/images/skills/skill_2/level_3.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: false
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
        active: true
      },
      {
        description: "Programa de manera eficaz y eficiente las funcionalidades de aplicaciones web y maneja bases de datos",
        image: "/images/skills/skill_3/level_2.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true
      },
      {
        description: "Analiza y evalúa programaciones de funcionalidades de aplicaciones web incluídas bases de datos proponiendo mejoras" ,
        image: "/images/skills/skill_3/level_3.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true
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
        active: true
      },
      {
        description: "Maneja de manera eficaz y eficiente los recursos necesarios de servidor para implementar y publicar aplicaciones web",
        image: "/images/skills/skill_4/level_2.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true
      },
      {
        description: "Analiza y evalúa implementaciones y publicaciones web proponiendo mejoras" ,
        image: "/images/skills/skill_4/level_3.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true
      }
    ]
  },
  {
    id: "morti",
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
        active: true
      },
      {
        description: "Trabaja en equipo de manera eficaz y eficiente con metodologías ágiles y sistemas de control de versiones",
        image: "/images/skills/skill_5/level_2.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true
      },
      {
        description: "Analiza y evalúa trabajo en equipo con metodologías ágiles y sistemas de control de versiones proponiendo mejoras" ,
        image: "/images/skills/skill_5/level_3.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true
      }
    ]
  },
  {
    id: "morti",
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
        active: true
      },
      {
        description: "Mantiene el esfuerzo para alcanzar metas",
        image: "/images/skills/skill_6/level_2.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true
      },
      {
        description: "Analiza y evalúa procesos que ayudan o dificultan conseguir metas proponiendo mejoras" ,
        image: "/images/skills/skill_6/level_3.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true
      }
    ]
  },
  {
    id: "morti",
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
        active: true
      },
      {
        description: "Utiliza la comprensión de los conceptos clave para aplicarlos en situaciones prácticas de comunicación en idioma Euskera, Inglés y Castellano. ",
        image: "/images/skills/skill_7/level_2.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true
      },
      {
        description: "Evalúa y crea soluciones innovadoras en situaciones prácticas de documentación técnica y comunicación en idioma Euskera, Inglés y Castellano." ,
        image: "/images/skills/skill_7/level_3.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true
      }
    ]
  },
  {
    id: "morti",
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
        active: true
      },
      {
        description: "Aplica las herramientas de prevención de riesgos laborales.",
        image: "/images/skills/skill_8/level_2.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true
      },
      {
        description: "Gestiona la prevención de riesgos laborales y primeros auxilios." ,
        image: "/images/skills/skill_8/level_3.webp",
        epicName: "Whispering Soul",
        exp: 500,
        gold: 500,
        unique: false,
        active: true
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

interface Level {
  description: string;
  image: string;
  epicName: string;
  exp: number;
  gold: number;
  unique: boolean;
  active: boolean;
}
interface Skill {
  id: string,
  epicName: string,
  description: string,
  image: string,
  levels: Level[]
}

interface IconLevelProps {
  unlock: boolean;
  position: number;
  handleClick: (pos: number, item: Skill, selectedStudent: string) => void;
  canClick: (pos: number, item: Skill) => boolean;
  skill: Skill;
  selectedStudent: string;
}

const IconLevel: React.FC<IconLevelProps> = ({unlock , position, handleClick, canClick, skill, selectedStudent}) => {
  if (unlock) {
    return (
      <motion.div
        className="text-green-300 border-1 rounded-full border-sepia bg-black/70"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image 
          src={skill.levels[position].image}
          width={300}
          height={300}
          alt="Unlocked book"
          className="w-16 h-16 rounded-full" 
        />
      </motion.div>
    );
  } else {
    return (
      <div className={canClick(position, skill) ? 'cursor-pointer' : ''} onClick={() => handleClick(position, skill, selectedStudent)}>
        <div className="relative w-16 h-16">
          <motion.div
            className="text-green-300"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            
            <Image 
              src="/images/skills/lock.webp"
              width={300}
              height={300}
              alt="Locked"
              className="sepia  w-16 h-16" 
            />
          </motion.div>
        </div>
      </div>
    )
    
  }
};

const Skills = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
	const [students, setStudents] = useState<Student[]>([]);
  const [currentSkillsForSelectedStudent, setCurrentSkillsForSelectedStudent] = useState<Student>()
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
  }, [selectedStudent]);

  

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudent(studentId);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Layout>
    	<div className="flex flex-col items-center space-y-6 w-full px-4">
				{!selectedCourse && (
					<div className="relative w-full max-w-3xl">
						<select
							className="block w-full bg-gray-800 text-white border border-gray-800 rounded-md pl-6 pr-10 text-3xl"
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
					</div>)
        }
        {selectedCourse && (
					<div className="relative w-full max-w-3xl">
						<select
							className="block w-full bg-gray-800 text-white border border-gray-800 rounded-md pl-6 pr-10 text-2xl"
							onChange={(e) => handleStudentSelect(e.target.value)}
							value={selectedStudent || ''}
						>
							<option value="" disabled>
								{loading ? 'Loading students...' : 'Select a student'}
							</option>
							{students?.map((student) => (
								<option key={student.userId} value={student.userId}>
									{student.profile.name.fullName.toUpperCase()}
								</option>
							))}
						</select>
					</div>)
        }
				{selectedStudent && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
      {fakeSkills.map((skill, i) => (
        <div key={i} className="relative border border-sepia bg-black/30 rounded-md p-2 bg-cover bg-center" style={{
          backgroundImage: `url(${skill.image})`,
        }}>
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="relative z-10">
            <div className="flex flex-wrap text-white justify-center gap-2 mb-4">
            <Tooltip
              key={i}
              className="w-auto text-3xl mb-4 border-1 rounded-lg border-sepia bg-black/90"
              placement="top"
              size="sm"
              showArrow={true}
              content={skill.description}
            >
              <div className="bg-black/30 border border-black rounded-md p-2 text-medievalSepia">
                <h2 className="text-3xl p-2">{skill.epicName}</h2>
              </div>
            </Tooltip>
              
            </div>

            <div className="flex gap-4 justify-around m-4">
              {skill.levels.map((level, index) => (
                <Tooltip
                  key={index}
                  className="w-96 text-3xl mb-4 border-1 rounded-lg border-sepia bg-black/90"
                  placement="top"
                  size="sm"
                  showArrow={true}
                  content={level.description}
                >
                  <div className="flex flex-col items-center gap-1 border-1 rounded-lg border-black bg-black/30 p-2">
                    <IconLevel
                      unlock={level.active}
                      position={index}
                      canClick={canClick}
                      handleClick={handleClick}
                      skill={skill}
                      selectedStudent={selectedStudent}
                    />
                    <div className="flex flex-col items-center text-2xl text-medievalSepia">
                      <span className={!level.active ? "text-gray-800" : ""}>{level.epicName}</span>
                      <span className={!level.active ? "text-gray-800" : ""}>+ {level.exp}  exp</span>
                      <span className={!level.active ? "text-gray-800" : ""}>+ {level.gold}  gold coins</span>
                    </div>
                    
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
    	</div>
		</Layout>
  )
}
export default Skills;