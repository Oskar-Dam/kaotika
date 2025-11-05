import { renderHook, act } from '@testing-library/react';
import { useApplySkill } from '@/hooks/useApplySkill';
import { API } from '@/constants/apiRoutes';
import { ERROR } from '@/constants/errors';

describe('useApplySkill hook', () => {
  const mockParams = { classroomId: "123", skillId: "1", skillDescription: 'fireball', skillPosition: 2 };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call the API successfully and trigger onSuccess', async () => {
    
    (fetch as jest.Mock) = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const onSuccess = jest.fn();

    const { result } = renderHook(() => useApplySkill(onSuccess));

    await act(async () => {
      const response = await result.current.applySkill(mockParams);
      expect(response).toEqual({ success: true });
    });

    expect(fetch).toHaveBeenCalledWith(API.APPLY_SKILL, expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockParams),
    }));

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle API error', async () => {
    (fetch as jest.Mock) = jest.fn().mockResolvedValueOnce({
      ok: false,
      text: async () => ERROR.APPLY_SKILL,
    });

    const { result } = renderHook(() => useApplySkill());

    await act(async () => {
      await expect(result.current.applySkill(mockParams)).rejects.toThrow(ERROR.APPLY_SKILL);
    });

    expect(result.current.error).toBe(ERROR.APPLY_SKILL);
    expect(result.current.loading).toBe(false);
  });

});