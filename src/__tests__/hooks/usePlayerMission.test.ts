import { renderHook, waitFor } from "@testing-library/react";
import { usePlayerMissions } from "@/hooks/usePlayerMissions";
import { getStudentClassrooms,getCourseTopics } from "@/services/googleClassroom/googleClassroom";
import { CLASSROOM_CONFIG } from "@/config/classroom";
import { MAP_POINTS } from "@/config/mapPoints";
import { ERROR } from "@/constants/errors";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@/services/googleClassroom/googleClassroom", () => ({
  getStudentClassrooms: jest.fn(),
  getCourseTopics: jest.fn()
}));

jest.mock("@/config/mapPoints", () => ({
  MAP_POINTS: [
    { id: 1, mapPointName: 'forest' },
    { id: 2, mapPointName: 'castle' },
  ],
}))

describe("usePlayerMisions hook", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should get all player missions", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { accessToken: 'valid-token' },
    });

    (getStudentClassrooms as jest.Mock).mockResolvedValue([
      { id: CLASSROOM_CONFIG.currentAdventure , name: 'Kaotika Adventure' },
    ]);
    (getCourseTopics as jest.Mock).mockResolvedValue([
      { name: 'Forest of Doom' },
      { name: 'Dark Castle' },
    ]);

    const { result } = renderHook(() => usePlayerMissions());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(getStudentClassrooms).toHaveBeenCalledWith('valid-token');
    expect(getCourseTopics).toHaveBeenCalledWith('valid-token', CLASSROOM_CONFIG.currentAdventure);
    expect(result.current.mapPoints).toHaveLength(2);
    expect(result.current.error).toBeNull();
    
  });


})