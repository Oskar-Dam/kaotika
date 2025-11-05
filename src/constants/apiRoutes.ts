export const API = {
  COURSES: 'api/classroom/courses',
  STUDENTS_FROM_COURSE: (selectedCourse: string | null) => `/api/classroom/courses/${selectedCourse}/students`,
  APPLY_SKILL: '/api/player/skills/apply-skill',
  PLAYER_SKILLS: (email: string | null | undefined) => `/api/player/skills/by-email?email=${email}`,
}