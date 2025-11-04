import { renderHook, waitFor } from "@testing-library/react";
import { useSessionControl } from "@/hooks/useSessionControl";
import { useSession } from "next-auth/react";
import { MENTOR_EMAIL } from "@/constants/constants";
import { STATUS } from "@/constants/classroom";
import { API } from "@/constants/apiRoutes";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

global.fetch = jest.fn();

describe("useSessionControl hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should detect a mentor and fetch active courses", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: `mentor${MENTOR_EMAIL}` } },
    });

    (fetch as jest.Mock).mockImplementation(async (url: string) => {
      if (url === API.COURSES) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            courses: [
              { id: 1, name: "KAOTIKA: DRAVOKAR REVENGE", courseState: STATUS.ACTIVE },
              { id: 2, name: "KAOTIKA: ANGELO ETHAZIUM", courseState: STATUS.ARCHIVED },
            ],
          }),
        });
      }
      throw new Error(`Unexpected URL: ${url}`);
    });

    const { result } = renderHook(() => useSessionControl());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.isMentor).toBe(true);
      expect(fetch).toHaveBeenCalledWith(API.COURSES);
      expect(result.current.courses).toHaveLength(1);
      expect(result.current.courses[0].name).toBe("KAOTIKA: DRAVOKAR REVENGE");
    });
  });

  it("should detect a normal user and fetch player skills", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "jacob@kaotika.com" } },
    });

    (fetch as jest.Mock).mockImplementation(async (url: string) => {
        return Promise.resolve({
          ok: true,
          json: async () => ({ data: [{ epicName: "Arcane recipes" }] }),
        }); 
    });

    const { result } = renderHook(() => useSessionControl());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.isMentor).toBe(false);
      expect(result.current.currentSkills).toHaveLength(1);
      expect(result.current.currentSkills[0].epicName).toBe("Arcane recipes");
      expect(fetch).toHaveBeenCalledWith(API.PLAYER_SKILLS("jacob@kaotika.com"));
    });
  });

  it("should handle fetch errors gracefully", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: `mentor${MENTOR_EMAIL}` } },
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { result } = renderHook(() => useSessionControl());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Failed to fetch data");
  });

  it("should not crash when session is null", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    const { result } = renderHook(() => useSessionControl());
    expect(result.current.isMentor).toBe(false);
    expect(result.current.courses).toEqual([]);
    expect(result.current.currentSkills).toEqual([]);
  });
});