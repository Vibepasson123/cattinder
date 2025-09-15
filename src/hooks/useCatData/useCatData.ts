import { useState, useEffect, useCallback } from 'react';
import { catAPI } from '../../services/CatAPI';
import { CatCard, CatBreed } from '../../types/api.types';
import { UseCatDataReturn, UseCatDataOptions } from './useCatData.types';

export const useCatData = (options: UseCatDataOptions = {}): UseCatDataReturn => {
  const { userId = 'user123', batchSize = 20 } = options;
  
  const [currentCat, setCurrentCat] = useState<CatCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedCats, setLikedCats] = useState<string[]>([]);
  const [dislikedCats, setDislikedCats] = useState<string[]>([]);
  const [catQueue, setCatQueue] = useState<CatCard[]>([]);
  const [breeds, setBreeds] = useState<CatBreed[]>([]);

  useEffect(() => {
    loadBreeds();
  }, []);

  useEffect(() => {
    if (breeds.length > 0 && catQueue.length === 0) {
      loadCatBatch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breeds]);

  useEffect(() => {
    if (catQueue.length > 0 && !currentCat) {
      setCurrentCat(catQueue[0]);
      setCatQueue(prev => prev.slice(1));
    }
  }, [catQueue, currentCat]);

  const loadBreeds = async () => {
    try {
      const breedsData = await catAPI.getBreeds();
      setBreeds(breedsData);
    } catch (err) {
      setError('Failed to load cat breeds');
    }
  };

  const loadCatBatch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const images = await catAPI.getImages({
        size: 'med',
        mime_types: 'jpg',
        format: 'json',
        has_breeds: true,
        order: 'RANDOM',
        page: 0,
        limit: batchSize,
      });


      const catCards: CatCard[] = images.map(image => {
        const breedInfo = image.breeds?.[0] || 
          breeds.find(breed => breed.reference_image_id === image.id) ||
          breeds[Math.floor(Math.random() * breeds.length)]; 
        return {
          image,
          breed: breedInfo,
        };
      });
      setCatQueue(prev => [...prev, ...catCards]);
    } catch (err) {
      setError('Failed to load cat images');
    } finally {
      setLoading(false);
    }
  };

  const loadNextCat = useCallback(async () => {
    setCurrentCat(null);
    if (catQueue.length <= 5) {
      await loadCatBatch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catQueue.length]);

  const likeCat = useCallback(async (catId: string) => {
    try {
      setLikedCats(prev => [...prev, catId]);
      await catAPI.vote({
        image_id: catId,
        value: 1,
        sub_id: userId,
      });
      await catAPI.addFavorite({
        image_id: catId,
        sub_id: userId,
      });

      await loadNextCat();
    } catch (err) {
      setLikedCats(prev => prev.filter(id => id !== catId));
    }
  }, [userId, loadNextCat]);

  const dislikeCat = useCallback(async (catId: string) => {
    try {
      setDislikedCats(prev => [...prev, catId]);
      
      // As told not to vote just move to next cat if disliked
    /* await catAPI.vote({
        image_id: catId,
        value: 0,
        sub_id: userId,
      }); */
      await loadNextCat();
    } catch (err) {
      setDislikedCats(prev => prev.filter(id => id !== catId));
    }
  }, [loadNextCat]);

  return {
    currentCat,
    loading,
    error,
    loadNextCat,
    likeCat,
    dislikeCat,
    likedCats,
    dislikedCats,
  };
};

