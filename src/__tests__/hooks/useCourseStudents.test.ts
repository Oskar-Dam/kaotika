import { renderHook, waitFor } from "@testing-library/react";
import { useCourseStudents } from "@/hooks/useCourseStudents";
import { API } from "@/constants/apiRoutes";
import { ERROR } from "@/constants/errors";

global.fetch = jest.fn();

const selectedCourse = "KAOTIKA";

describe("useCourseStudents hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get the students from a course", async () => {

    (fetch as jest.Mock).mockImplementation(async (url: string) => {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          students: [
            {
              courseId: "1234",
              profile: {
                id: "1234",
                name: {
                  familyName: "Mort",
                  fullName: "Imer",
                  givenName: "Mortimer",
                }
              },
              userId: "1234"
            },
          ],
        }),
      });
    });

    const { result } = renderHook(() => useCourseStudents(selectedCourse));

    await waitFor(() => {
      expect(result.current.studentsLoading).toBe(false);
      expect(fetch).toHaveBeenCalledWith(API.STUDENTS_FROM_COURSE(selectedCourse));
      expect(result.current.students).toHaveLength(1);
      expect(result.current.students[0].profile.name.givenName).toBe("Mortimer");
    });
  });

  it("should handle fetch errors gracefully", async () => {

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useCourseStudents(selectedCourse));

    await waitFor(() => {
      expect(result.current.studentsLoading).toBe(false);
      expect(fetch).toHaveBeenCalledWith(API.STUDENTS_FROM_COURSE(selectedCourse));
      expect(result.current.error).toBe(ERROR.FETCH_STUDENTS);
    });
  });

});