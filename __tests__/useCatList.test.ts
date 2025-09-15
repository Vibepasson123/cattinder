import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useCatList } from '../src/hooks/useCatList';

jest.mock('../src/services/CatAPI', () => ({
  catAPI: {
    getCatImages: jest.fn(),
    vote: jest.fn(),
  },
}));

import { catAPI } from '../src/services/CatAPI';
const mockedCatAPI = catAPI as jest.Mocked<typeof catAPI>;

describe('useCatList Hook', () => {
  const mockCatImages = [
    {
      id: 'cat-1',
      url: 'https://example.com/cat1.jpg',
      width: 500,
      height: 500,
      breeds: [
        {
          id: 'breed-1',
          name: 'Test Breed 1',
          origin: 'Test Origin 1',
          adaptability: 4,
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with empty cats array', () => {
    mockedCatAPI.getCatImages.mockResolvedValue(mockCatImages);

    const { result } = renderHook(() => useCatList());

    expect(result.current.cats).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.hasMore).toBe(true);
  });

  it('should fetch cats on mount', async () => {
    mockedCatAPI.getCatImages.mockResolvedValue(mockCatImages);

    const { result } = renderHook(() => useCatList());

    await waitFor(() => {
      expect(result.current.cats).toEqual(mockCatImages);
    });

    expect(result.current.error).toBeNull();
    expect(mockedCatAPI.getCatImages).toHaveBeenCalledWith(10);
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Failed to fetch cats';
    mockedCatAPI.getCatImages.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCatList());

    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
    });

    expect(result.current.cats).toEqual([]);
  });

  it('should like a cat successfully', async () => {
    mockedCatAPI.getCatImages.mockResolvedValue(mockCatImages);
    mockedCatAPI.vote.mockResolvedValue({ message: 'SUCCESS', id: 1 });

    const { result } = renderHook(() => useCatList());

    await waitFor(() => {
      expect(result.current.cats).toEqual(mockCatImages);
    });

    act(() => {
      result.current.likeCat('cat-1');
    });

    expect(mockedCatAPI.vote).toHaveBeenCalledWith({
      image_id: 'cat-1',
      sub_id: 'cat-tinder-user',
      value: 1,
    });
  });

  it('should dislike a cat successfully', async () => {
    mockedCatAPI.getCatImages.mockResolvedValue(mockCatImages);
    mockedCatAPI.vote.mockResolvedValue({ message: 'SUCCESS', id: 1 });

    const { result } = renderHook(() => useCatList());

    await waitFor(() => {
      expect(result.current.cats).toEqual(mockCatImages);
    });

    act(() => {
      result.current.dislikeCat('cat-1');
    });

    expect(mockedCatAPI.vote).toHaveBeenCalledWith({
      image_id: 'cat-1',
      sub_id: 'cat-tinder-user',
      value: -1,
    });
  });
});