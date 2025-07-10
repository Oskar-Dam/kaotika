import { Topic } from "@/_common/interfaces/Topic";

export const getStudentClassrooms = async (token: string) => {
  try {
    const res = await fetch("https://classroom.googleapis.com/v1/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch classrooms: ${res.statusText}`);
    }

    const data = await res.json();
    return data.courses || [];
  } catch (error) {
    console.error("Error fetching student classrooms:", error);
    throw error;
  }
};

export const getCourseTopics = async (token: string, courseId: string): Promise<Topic[]>  => {
  const res = await fetch(`https://classroom.googleapis.com/v1/courses/${courseId}/topics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch topics");
  }

  const data = await res.json();
  return data.topic || [];
};

export const getOpenTasksFromClassroom = async (token: string, courseId: string) => {
  try {
    const res = await fetch(
      `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const courseWorks = await res.json();
    if (!res.ok) {
      throw new Error(`Failed to fetch course work: ${res.statusText}`);
    }

    /* const data = await res.json();
    const courseWork = data.courseWork || [];

    const openTasks = [];

    for (const task of courseWork) {
      const submissionsRes = await fetch(
        `https://classroom.googleapis.com/v1/courses/${courseId}/courseWork/${task.id}/studentSubmissions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!submissionsRes.ok) {
        console.warn(
          `Failed to fetch submissions for task ${task.id}: ${submissionsRes.statusText}`
        );
        continue;
      }

      const submissionsData = await submissionsRes.json();
      const submissions = submissionsData.studentSubmissions || [];

      const isCompleted = submissions.every(
        (s: any) => s.state === "TURNED_IN" || s.state === "RETURNED"
      );

      if (!isCompleted) {
        openTasks.push(task);
      }
    }
*/
    return courseWorks; 
  } catch (error) {
    console.error("Error fetching open tasks:", error);
    throw error;
  }
};