export interface UserPreferences {
    mood: string;
    diet: string;
    spice_level: string;
    group_size: string;
}

export interface DishRecommendation {
    dish: string;
    price: number;
    reason: string;
    tags: string[];
    dish_id: number;
}

export interface RecommendationResponse {
    recommendations: DishRecommendation[];
    message: string;
}

export interface MenuItem {
    id: number;
    name: string;
    price: number;
    diet: string;
    spice_level: string;
    type: string;
    mood_tags: string[];
    group_size: string;
    description: string;
    tags: string[];
}
