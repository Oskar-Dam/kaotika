import { fetchPlayerData } from "../../pages/api/shop/helpers/fetchPlayerData";
import { MOCK_PLAYER } from "../mocks";

jest.mock('../../pages/api/shop/helpers/fetchPlayerData', () => ({
  fetchPlayerData: jest.fn(),
}));

describe('fetchPlayerData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch the given emails user data successfully and return it', async () => {
    (fetchPlayerData as jest.Mock).mockResolvedValue(MOCK_PLAYER);

    const email = 'unai.roca@ikasle.aeg.eus';
    const result = await fetchPlayerData(email);

    expect(fetchPlayerData).toHaveBeenCalledWith(email);
    expect(fetchPlayerData).toHaveBeenCalledTimes(1);
    expect(result).toEqual(MOCK_PLAYER);
  });

  it('should handle errors gracefully', async () => {
    (fetchPlayerData as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await fetchPlayerData('NO_EMAIL');

    expect(result).toBeUndefined();
  });
});

