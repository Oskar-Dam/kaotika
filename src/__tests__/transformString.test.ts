import { transformString } from "@/helpers/transformString";

describe('transformString', () => {
  it('should transform string correctly', () => {
    const input = 'lesser_increase_hit_points';
    const result = transformString(input);
    expect(result).toBe('Lesser increase hit points');
  });

  it('should handle single word strings', () => {
    const input = 'greater';
    const result = transformString(input);
    expect(result).toBe('Greater');
  });

  it('should handle empty strings', () => {
    const input = '';
    const result = transformString(input);
    expect(result).toBe('');
  });

  it('should handle strings with no underscores', () => {
    const input = 'legends of Kaotika';
    const result = transformString(input);
    expect(result).toBe('Legends of Kaotika');
  });
});