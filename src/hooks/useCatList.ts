import { useState, useEffect, useCallback } from 'react';
import { CatImage, VoteRequest, FavoriteRequest } from '../types/api.types';
import { catAPI } from '../services/CatAPI';

interface UseCatListReturn {
  cats: CatImage[];
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  likeCat: (catId: string) => Promise<void>;
  dislikeCat: (catId: string) => Promise<void>;
  addToFavorites: (catId: string) => Promise<void>;
}

const PAGE_SIZE = 10;

export const useCatList = (): UseCatListReturn => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadCats = useCallback(async (isRefresh: boolean = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const newCats = await catAPI.getCatImages(PAGE_SIZE);
      
      if (isRefresh) {
        setCats(newCats);
      } else {
        setCats(prev => {
          const updated = [...prev, ...newCats];
          return updated;
        });
      }
      
      setHasMore(newCats.length === PAGE_SIZE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cats');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (!loading && hasMore) {
      await loadCats(false);
    }
  }, [loading, hasMore, loadCats]);

  const refresh = useCallback(async () => {
    await loadCats(true);
  }, [loadCats]);

  const likeCat = useCallback(async (catId: string) => {
    try {
      const voteRequest: VoteRequest = {
        image_id: catId,
        value: 1,
        sub_id: 'cat-tinder-user',
      };
      
      await catAPI.vote(voteRequest);
    } catch (err) {
    }
  }, []);

  const dislikeCat = useCallback(async (catId: string) => {
    try {
      const voteRequest: VoteRequest = {
        image_id: catId,
        value: -1, 
        sub_id: 'cat-tinder-user',
      };
      
      await catAPI.vote(voteRequest);
    } catch (err) {
    }
  }, []);

  const addToFavorites = useCallback(async (catId: string) => {
    try {
      const favoriteRequest: FavoriteRequest = {
        image_id: catId,
        sub_id: 'cat-tinder-user',
      };
      
      await catAPI.addFavorite(favoriteRequest);
    } catch (err) {
    }
  }, []);

  useEffect(() => {
    loadCats(true);
  }, [loadCats]);

  return {
    cats,
    loading,
    error,
    refreshing,
    hasMore,
    loadMore,
    refresh,
    likeCat,
    dislikeCat,
    addToFavorites,
  };
};
