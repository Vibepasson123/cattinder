import { useState, useEffect, useCallback, useRef } from "react";
import { catAPI } from "../../services/CatAPI";
import { CatImage } from "../../types/api.types";

interface UseLikedCatsOptions {
  userId?: string;
  autoLoad?: boolean;
  pageSize?: number;
}

interface UseLikedCatsReturn {
  likedCats: CatImage[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalCount: number;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  refetch: () => Promise<void>;
}

export const useLikedCats = ({
  userId = "default-user",
  autoLoad = true,
  pageSize = 10,
}: UseLikedCatsOptions = {}): UseLikedCatsReturn => {
  const [likedCats, setLikedCats] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pageCache = useRef<Map<number, CatImage[]>>(new Map());
  const votesCache = useRef<{ data: any[]; timestamp: number } | null>(null);

  const fetchLikedCats = useCallback(
    async (page: number = 0, isRefresh: boolean = false) => {
      try {
        if (!isRefresh && pageCache.current.has(page)) {
          const cachedCats = pageCache.current.get(page)!;

          if (page === 0) {
            setLikedCats(cachedCats);
          } else {
            setLikedCats((prev) => [...prev, ...cachedCats]);
          }
          setCurrentPage(page);
          return;
        }

        setLoading(true);
        setError(null);
        const result = await catAPI.getLikedCats(userId, page, pageSize);
        pageCache.current.set(page, result.cats);

        if (isRefresh || page === 0) {
          setLikedCats(result.cats);
          setCurrentPage(0);
          if (isRefresh) {
            pageCache.current.clear();
            votesCache.current = null;
          }
        } else {
          setLikedCats((prev) => [...prev, ...result.cats]);
        }

        setHasMore(result.hasMore);
        setTotalCount(result.totalCount);
        setCurrentPage(page);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch liked cats";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [userId, pageSize]
  );

  const refresh = useCallback(async () => {
    await fetchLikedCats(0, true);
  }, [fetchLikedCats]);

  const loadMore = useCallback(async () => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1;
      if (pageCache.current.has(nextPage)) {
        const cachedCats = pageCache.current.get(nextPage)!;
        setLikedCats((prev) => [...prev, ...cachedCats]);
        setCurrentPage(nextPage);
        return;
      }
      await fetchLikedCats(nextPage, false);
    }
  }, [hasMore, loading, currentPage, fetchLikedCats]);

  const refetch = useCallback(async () => {
    setLikedCats([]);
    setCurrentPage(0);
    setHasMore(true);
    await fetchLikedCats(0, true);
  }, [fetchLikedCats]);

  useEffect(() => {
    if (autoLoad) {
      fetchLikedCats(0, true);
    }
  }, [autoLoad, fetchLikedCats]);

  return {
    likedCats,
    loading,
    error,
    hasMore,
    totalCount,
    refresh,
    loadMore,
    refetch,
  };
};
