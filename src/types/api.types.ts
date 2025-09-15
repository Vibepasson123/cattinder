
export interface CatBreed {
  id: string;
  name: string;
  origin: string;
  temperament?: string;
  description?: string;
  life_span?: string;
  weight?: {
    imperial: string;
    metric: string;
  };
  adaptability?: number;
  affection_level?: number;
  child_friendly?: number;
  dog_friendly?: number;
  energy_level?: number;
  grooming?: number;
  health_issues?: number;
  intelligence?: number;
  shedding_level?: number;
  social_needs?: number;
  stranger_friendly?: number;
  vocalisation?: number;
  reference_image_id?: string;
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: CatBreed[];
}

export interface Vote {
  id: number;
  image_id: string;
  value: number; // 1 for like, 0 for dislike
  sub_id?: string;
  created_at: string;
}

export interface Favorite {
  id: number;
  image_id: string;
  sub_id?: string;
  created_at: string;
  image: {
    id: string;
    url: string;
  };
}

export interface VoteRequest {
  image_id: string;
  value: number;
  sub_id?: string;
}

export interface FavoriteRequest {
  image_id: string;
  sub_id?: string;
}

export interface CatCard {
  image: CatImage;
  breed: CatBreed;
}

export interface UserPreferences {
  userId: string;
  likedCats: string[];
  dislikedCats: string[];
  favoriteCats: string[];
}

