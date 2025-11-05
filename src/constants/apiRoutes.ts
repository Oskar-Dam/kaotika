export const API = {
  COURSES: 'api/classroom/courses',
  APPLY_SKILL: '/api/player/skills/apply-skill',
  PLAYER_SKILLS: (email: string | null | undefined) => `/api/player/skills/by-email?email=${email}`,
}