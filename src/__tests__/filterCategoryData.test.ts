
import { filterCategoryData } from "@/helpers/filterCategoryData";
import { MOCK_ARTIFACTS_COLLECTION, MOCK_RINGS_COLLECTION } from "./mocks";
import { Helmet } from "@/_common/interfaces/Helmet";

describe('filterCategoryData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should filter given array data of products category by filtering values (value != 0 and isUnique === false) and return the filtered result', () => {
    const expectedOutput = [{
      "_id": {
        "$oid": "66f3c85ec8cdd090db911da5"
      },
      "name": "Ring of the Eternal Flame",
      "description": "A ring that blazes with unending fire.",
      "type": "ring",
      "image": "/images/equipment/rings/ring_2.png",
      "value": 150,
      "modifiers": {
        "intelligence": 5,
        "dexterity": 2,
        "constitution": 3,
        "insanity": 1,
        "charisma": 4,
        "strength": 3
      },
      "min_lvl": 6,
      "isUnique": false,
      "isActive": true
    }]
    const dataToFilter: any[] = MOCK_RINGS_COLLECTION

    const result = filterCategoryData(dataToFilter)

    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty array when no coincidences', () => {
    const expectedOutput: Helmet[] = []
    const dataToFilter: any[] = MOCK_ARTIFACTS_COLLECTION

    const result = filterCategoryData(dataToFilter)

    expect(result).toEqual(expectedOutput);
  });
});