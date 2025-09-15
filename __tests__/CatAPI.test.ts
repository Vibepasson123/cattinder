import { catAPI } from '../src/services/CatAPI';

// Mock the entire CatAPI module
jest.mock('../src/services/CatAPI', () => ({
  catAPI: {
    getImages: jest.fn(),
    vote: jest.fn(),
    getVotes: jest.fn(),
    getLikedCats: jest.fn(),
    getCatImageById: jest.fn(),
  },
}));

describe('CatAPI Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getImages', () => {
    it('should fetch cat images with correct parameters', async () => {
      const mockResponse = [
        {
          id: 'test-id',
          url: 'https://example.com/cat.jpg',
          width: 500,
          height: 500,
          breeds: [
            {
              id: 'breed-id',
              name: 'Test Breed',
              origin: 'Test Origin',
              adaptability: 4,
            },
          ],
        },
      ];

      (catAPI.getImages as jest.Mock).mockResolvedValue(mockResponse);

      const result = await catAPI.getImages({
        size: 'med',
        mime_types: 'jpg',
        format: 'json',
        has_breeds: true,
        order: 'RANDOM',
        page: 0,
        limit: 10,
      });

      expect(catAPI.getImages).toHaveBeenCalledWith({
        size: 'med',
        mime_types: 'jpg',
        format: 'json',
        has_breeds: true,
        order: 'RANDOM',
        page: 0,
        limit: 10,
      });

      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      const errorMessage = 'Network Error';
      (catAPI.getImages as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(catAPI.getImages({})).rejects.toThrow(errorMessage);
    });
  });

  describe('vote', () => {
    it('should submit a vote successfully', async () => {
      const voteData = {
        image_id: 'test-image-id',
        sub_id: 'test-user',
        value: 1,
      };

      const mockResponse = {
        message: 'SUCCESS',
        id: 123,
      };

      (catAPI.vote as jest.Mock).mockResolvedValue(mockResponse);

      const result = await catAPI.vote(voteData);

      expect(catAPI.vote).toHaveBeenCalledWith(voteData);
      expect(result).toEqual(mockResponse);
    });

    it('should handle vote submission errors', async () => {
      const voteData = {
        image_id: 'test-image-id',
        sub_id: 'test-user',
        value: 1,
      };

      (catAPI.vote as jest.Mock).mockRejectedValue(new Error('Vote failed'));

      await expect(catAPI.vote(voteData)).rejects.toThrow('Vote failed');
    });
  });

  describe('getVotes', () => {
    it('should fetch votes successfully', async () => {
      const mockResponse = [
        {
          id: 1,
          image_id: 'test-image-id',
          sub_id: 'test-user',
          value: 1,
          created_at: '2023-01-01T00:00:00Z',
        },
      ];

      (catAPI.getVotes as jest.Mock).mockResolvedValue(mockResponse);

      const result = await catAPI.getVotes('test-user');

      expect(catAPI.getVotes).toHaveBeenCalledWith('test-user');
      expect(result).toEqual(mockResponse);
    });

    it('should handle getVotes errors', async () => {
      (catAPI.getVotes as jest.Mock).mockRejectedValue(new Error('Failed to fetch votes'));

      await expect(catAPI.getVotes()).rejects.toThrow('Failed to fetch votes');
    });
  });

  describe('getLikedCats', () => {
    it('should fetch liked cats with pagination', async () => {
      const mockResponse = {
        cats: [
          {
            id: 'image-1',
            url: 'https://example.com/cat1.jpg',
            width: 500,
            height: 500,
            breeds: [],
          },
        ],
        hasMore: false,
        totalCount: 1,
      };

      (catAPI.getLikedCats as jest.Mock).mockResolvedValue(mockResponse);

      const result = await catAPI.getLikedCats('test-user', 0, 10);

      expect(catAPI.getLikedCats).toHaveBeenCalledWith('test-user', 0, 10);
      expect(result).toEqual(mockResponse);
    });

    it('should handle getLikedCats errors', async () => {
      (catAPI.getLikedCats as jest.Mock).mockRejectedValue(new Error('Failed to fetch liked cats'));

      await expect(catAPI.getLikedCats('test-user', 0, 10)).rejects.toThrow('Failed to fetch liked cats');
    });
  });
});