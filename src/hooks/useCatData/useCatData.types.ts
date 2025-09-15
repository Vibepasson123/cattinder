import { CatCard } from '../../types/api.types';

export interface UseCatDataReturn {
  currentCat: CatCard | null;
  loading: boolean;
  error: string | null;
  loadNextCat: () => Promise<void>;
  likeCat: (catId: string) => Promise<void>;
  dislikeCat: (catId: string) => Promise<void>;
  likedCats: string[];
  dislikedCats: string[];
}

export interface UseCatDataOptions {
  userId?: string;
  batchSize?: number;
}


