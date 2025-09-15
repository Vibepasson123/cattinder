import axios, { AxiosInstance } from 'axios';
import { 
  CatBreed, 
  CatImage, 
  Vote, 
  Favorite, 
  VoteRequest, 
  FavoriteRequest 
} from '../types/api.types';

class CatAPIService {
  private api: AxiosInstance;
  private apiKey: string;
  private votesCache: Map<string, { data: Vote[]; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(apiKey: string = 'demo') {
    this.apiKey = apiKey;
    this.api = axios.create({
      baseURL: 'https://api.thecatapi.com/v1',
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

  }

  async getBreeds(): Promise<CatBreed[]> {
    try {
      const response = await this.api.get('/breeds');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch cat breeds');
    }
  }

  async getImages(params: {
    limit?: number;
    breed_ids?: string;
    size?: 'small' | 'med' | 'full';
    mime_types?: string;
    has_breeds?: boolean;
    format?: string;
    order?: string;
    page?: number;
  } = {}): Promise<CatImage[]> {
    try {
      const response = await this.api.get('/images/search', { params });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch cat images');
    }
  }

  async getCatImages(limit: number = 10): Promise<CatImage[]> {
    const params = {
      size: 'med' as 'med',
      mime_types: 'jpg',
      format: 'json',
      has_breeds: true,
      order: 'RANDOM',
      page: 0,
      limit,
    };

    const result = await this.getImages(params);
    return result;
  }

  async getCatImageById(imageId: string): Promise<CatImage> {
    try {
      const response = await this.api.get(`/images/${imageId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch cat image');
    }
  }

  async searchBreeds(query: string): Promise<CatBreed[]> {
    try {
      const response = await this.api.get(`/breeds/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to search breeds');
    }
  }

  async vote(voteData: VoteRequest): Promise<{ message: string; id: number }> {
    try {
      const response = await this.api.post('/votes', voteData);
      const cacheKey = voteData.sub_id || 'default';
      this.votesCache.delete(cacheKey);
      
      return response.data;
    } catch (error) {
      throw new Error('Failed to submit vote');
    }
  }
  async getVotes(subId?: string): Promise<Vote[]> {
    try {
      const cacheKey = subId || 'default';
      const now = Date.now();

      if (this.votesCache.has(cacheKey)) {
        const cached = this.votesCache.get(cacheKey)!;
        if (now - cached.timestamp < this.CACHE_DURATION) {
          return cached.data;
        } else {
          this.votesCache.delete(cacheKey);
        }
      }

      const params = subId ? { sub_id: subId } : {};
      const response = await this.api.get('/votes', { params });
      this.votesCache.set(cacheKey, {
        data: response.data,
        timestamp: now
      });
      
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch votes');
    }
  }

  async getLikedCats(subId?: string, page: number = 0, limit: number = 10): Promise<{
    cats: CatImage[];
    hasMore: boolean;
    totalCount: number;
  }> {
    try {
      const votes = await this.getVotes(subId);
      const likedVotes = votes.filter(vote => vote.value === 1);
      
      if (likedVotes.length === 0) {
        return { cats: [], hasMore: false, totalCount: 0 };
      }
 
      const startIndex = page * limit;
      const endIndex = startIndex + limit;
      const paginatedVotes = likedVotes.slice(startIndex, endIndex);
      
      if (paginatedVotes.length === 0) {
        return { cats: [], hasMore: false, totalCount: likedVotes.length };
      }

      const imageIds = paginatedVotes.map(vote => vote.image_id);
      const imagePromises = imageIds.map(imageId => 
        this.getCatImageById(imageId).catch(() => {
          return null;
        })
      );

      const images = await Promise.all(imagePromises);
      const validImages = images.filter((image): image is CatImage => image !== null);
      const hasMore = endIndex < likedVotes.length;
      
      return { 
        cats: validImages, 
        hasMore, 
        totalCount: likedVotes.length 
      };
    } catch (error) {
      throw new Error('Failed to fetch liked cats');
    }
  }
  async addFavorite(favoriteData: FavoriteRequest): Promise<{ message: string; id: number }> {
    try {
      const response = await this.api.post('/favourites', favoriteData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add favorite');
    }
  }
  async getFavorites(subId?: string): Promise<Favorite[]> {
    try {
      const params = subId ? { sub_id: subId } : {};
      const response = await this.api.get('/favourites', { params });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch favorites');
    }
  }
  async removeFavorite(favoriteId: number): Promise<{ message: string }> {
    try {
      const response = await this.api.delete(`/favourites/${favoriteId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to remove favorite');
    }
  }
}

export const catAPI = new CatAPIService('live_4ZBivqRxtuAw516brYbMGHcAxLjH1pHtHkgSL0pwKRuseHxtbByB2E0sg9nNdamP');
export default catAPI;
