import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useLikedCats } from '../src/hooks/useLikedCats';

jest.mock('../src/services/CatAPI', () => ({
  catAPI: {
    getVotes: jest.fn(),
    getCatImageById: jest.fn(),
    getLikedCats: jest.fn(),
  },
}));

import { catAPI } from '../src/services/CatAPI';
const mockedCatAPI = catAPI as jest.Mocked<typeof catAPI>;

describe('useLikedCats Hook', () => {
  const mockLikedCats = [
    {
      id: 'liked-cat-1',
      url: 'https://example.com/liked-cat1.jpg',
      width: 500,
      height: 500,
      breeds: [],
    },
  ];

  const mockLikedCatsResponse = {
    cats: mockLikedCats,
    hasMore: false,
    totalCount: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useLikedCats({ autoLoad: false }));

    expect(result.current.likedCats).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hasMore).toBe(true);
    expect(result.current.totalCount).toBe(0);
  });

  it('should fetch liked cats on mount when autoLoad is true', async () => {
    mockedCatAPI.getLikedCats.mockResolvedValue(mockLikedCatsResponse);

    const { result } = renderHook(() => useLikedCats({ userId: 'test-user' }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.likedCats).toEqual(mockLikedCats);
    expect(result.current.totalCount).toBe(1);
    expect(result.current.hasMore).toBe(false);
  });

  it('should not fetch on mount when autoLoad is false', () => {
    renderHook(() => useLikedCats({ autoLoad: false }));

    expect(mockedCatAPI.getLikedCats).not.toHaveBeenCalled();
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Failed to fetch liked cats';
    mockedCatAPI.getLikedCats.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useLikedCats({ userId: 'test-user' }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.likedCats).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should refresh liked cats', async () => {
    mockedCatAPI.getLikedCats.mockResolvedValue(mockLikedCatsResponse);

    const { result } = renderHook(() => useLikedCats({ autoLoad: false }));

    act(() => {
      result.current.refresh();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.likedCats).toEqual(mockLikedCats);
    expect(mockedCatAPI.getLikedCats).toHaveBeenCalledWith('default-user', 0, 10);
  });
});