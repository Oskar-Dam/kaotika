export const API = {
  COURSES: 'api/classroom/courses',
  PLAYER_SKILLS: (email: string | null | undefined) => `/api/player/skills/by-email?email=${email}`,
}