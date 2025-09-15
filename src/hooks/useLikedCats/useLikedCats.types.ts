import { CatImage } from '../../types/api.types';

export interface UseLikedCatsOptions {
  userId?: string;
  autoLoad?: boolean;
  pageSize?: number;
}

export interface UseLikedCatsReturn {
  likedCats: CatImage[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalCount: number;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  refetch: () => Promise<void>;
}

