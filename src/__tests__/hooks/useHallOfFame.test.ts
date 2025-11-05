import { renderHook, waitFor } from "@testing-library/react";
import { useHallOfFame } from '@/hooks/useHallOfFame'
import { API } from "@/constants/apiRoutes";
import player from "../../data/player.json"; 
import { useSession } from "next-auth/react";
import { MENTOR_EMAIL } from "@/constants/constants";

global.fetch = jest.fn();

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("useHallOfFame hook", () => {

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should get the hall of fame", async () => {
      
      (useSession as jest.Mock).mockReturnValue({
        data: { user: { email: `mentor${MENTOR_EMAIL}` } },
      });
      (fetch as jest.Mock).mockImplementation(async (url: string) => {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            data: [
              player
            ],
          }),
        });
      });

      const { result } = renderHook(() => useHallOfFame())
    
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(fetch).toHaveBeenCalledWith(API.HALL_OF_FAME);
        expect(result.current.players).toHaveLength(1);
        expect(result.current.players[0].nickname).toBe("Mortimer");
      });   
    });
});