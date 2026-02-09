from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json

app = FastAPI(title="Hanok Pic AI Service")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Menu database with metadata
MENU_ITEMS = [
    {
        "id": 1,
        "name": "Bibimbap",
        "price": 499,
        "diet": "both",
        "spice_level": "mild",
        "type": "rice",
        "mood_tags": ["comfort", "light", "healthy"],
        "group_size": "1-2",
        "description": "Mixed rice bowl with vegetables and your choice of protein",
        "tags": ["🍚 Rice", "🥗 Healthy", "🌈 Colorful"]
    },
    {
        "id": 2,
        "name": "Spicy Bibimbap (with Chicken)",
        "price": 599,
        "diet": "non-veg",
        "spice_level": "hot",
        "type": "rice",
        "mood_tags": ["spicy", "comfort", "heavy"],
        "group_size": "1-2",
        "description": "Fiery version of our classic bibimbap with grilled chicken",
        "tags": ["🍚 Rice", "🔥 Spicy", "🍗 Chicken"]
    },
    {
        "id": 3,
        "name": "Bulgogi (Marinated Beef BBQ)",
        "price": 699,
        "diet": "non-veg",
        "spice_level": "mild",
        "type": "bbq",
        "mood_tags": ["heavy", "sharing", "comfort"],
        "group_size": "3-4",
        "description": "Tender marinated beef grilled to perfection",
        "tags": ["🥩 BBQ", "🍖 Beef", "👥 Sharing"]
    },
    {
        "id": 4,
        "name": "Dakgalbi (Spicy Grilled Chicken)",
        "price": 599,
        "diet": "non-veg",
        "spice_level": "hot",
        "type": "bbq",
        "mood_tags": ["spicy", "heavy", "sharing"],
        "group_size": "3-4",
        "description": "Spicy stir-fried chicken with vegetables",
        "tags": ["🔥 Spicy", "🍗 Chicken", "👥 Sharing"]
    },
    {
        "id": 5,
        "name": "Kimchi Ramen",
        "price": 399,
        "diet": "both",
        "spice_level": "medium",
        "type": "noodles",
        "mood_tags": ["comfort", "spicy", "light"],
        "group_size": "1-2",
        "description": "Spicy fermented cabbage broth with egg and veggies",
        "tags": ["🍜 Noodles", "🌶️ Medium Spicy", "🍲 Soup"]
    },
    {
        "id": 6,
        "name": "Japchae",
        "price": 429,
        "diet": "veg",
        "spice_level": "mild",
        "type": "noodles",
        "mood_tags": ["light", "healthy", "sharing"],
        "group_size": "1-2",
        "description": "Stir-fried glass noodles with vegetables",
        "tags": ["🍜 Noodles", "🥗 Veg", "✨ Light"]
    },
    {
        "id": 7,
        "name": "Gimbap (Korean Sushi Rolls)",
        "price": 299,
        "diet": "both",
        "spice_level": "mild",
        "type": "starter",
        "mood_tags": ["light", "sharing", "healthy"],
        "group_size": "1-2",
        "description": "Fresh rice rolls with vegetables and your choice of filling",
        "tags": ["🍱 Rolls", "🥗 Fresh", "👥 Sharing"]
    },
    {
        "id": 8,
        "name": "Spicy Korean Fried Rice Cakes (Tteokbokki)",
        "price": 329,
        "diet": "veg",
        "spice_level": "hot",
        "type": "starter",
        "mood_tags": ["spicy", "comfort", "sharing"],
        "group_size": "3-4",
        "description": "Chewy rice cakes in spicy-sweet sauce",
        "tags": ["🔥 Spicy", "🍡 Rice Cakes", "👥 Sharing"]
    },
    {
        "id": 9,
        "name": "Korean Corn Cheese",
        "price": 249,
        "diet": "veg",
        "spice_level": "mild",
        "type": "starter",
        "mood_tags": ["comfort", "sharing", "heavy"],
        "group_size": "3-4",
        "description": "Sweet corn baked with mozzarella cheese",
        "tags": ["🧀 Cheese", "🌽 Corn", "👥 Sharing"]
    },
    {
        "id": 10,
        "name": "Kimchi Pancakes (Kimchijeon)",
        "price": 349,
        "diet": "veg",
        "spice_level": "medium",
        "type": "starter",
        "mood_tags": ["spicy", "comfort", "sharing"],
        "group_size": "3-4",
        "description": "Crispy pancakes loaded with kimchi",
        "tags": ["🥞 Pancake", "🌶️ Medium Spicy", "👥 Sharing"]
    }
]

# Request/Response models
class UserPreferences(BaseModel):
    mood: str  # comfort, spicy, heavy, light, sharing
    diet: str  # veg, non-veg, both
    spice_level: str  # mild, medium, hot
    group_size: str  # 1-2, 3-4, 5+

class DishRecommendation(BaseModel):
    dish: str
    price: int
    reason: str
    tags: List[str]
    dish_id: int

class RecommendationResponse(BaseModel):
    recommendations: List[DishRecommendation]
    message: str

@app.get("/")
def read_root():
    return {"message": "Hanok Pic AI Service is running!", "version": "1.0"}

@app.post("/api/recommend", response_model=RecommendationResponse)
def get_recommendations(preferences: UserPreferences):
    """
    Hanok Pic recommendation engine
    Step 1: Rule-based filtering
    Step 2: AI-like reasoning (simulated with smart logic)
    """
    
    # Step 1: Rule-based filtering
    filtered_dishes = []
    
    for dish in MENU_ITEMS:
        # Diet filter
        if preferences.diet == "veg" and dish["diet"] == "non-veg":
            continue
        if preferences.diet == "non-veg" and dish["diet"] == "veg":
            continue
            
        # Spice level filter (allow same or lower)
        spice_order = {"mild": 0, "medium": 1, "hot": 2}
        user_spice = spice_order.get(preferences.spice_level, 2)
        dish_spice = spice_order.get(dish["spice_level"], 0)
        
        if dish_spice > user_spice:
            continue
            
        # Mood matching
        if preferences.mood.lower() in dish["mood_tags"]:
            filtered_dishes.append(dish)
    
    # If no exact mood match, relax the filter
    if len(filtered_dishes) < 2:
        filtered_dishes = [
            dish for dish in MENU_ITEMS
            if (preferences.diet == "both" or dish["diet"] in [preferences.diet, "both"])
            and spice_order.get(dish["spice_level"], 0) <= user_spice
        ]
    
    # Step 2: AI-like reasoning (scoring and ranking)
    scored_dishes = []
    for dish in filtered_dishes:
        score = 0
        
        # Mood match bonus
        if preferences.mood.lower() in dish["mood_tags"]:
            score += 10
            
        # Group size match
        if dish["group_size"] == preferences.group_size or "sharing" in dish["mood_tags"]:
            score += 5
            
        # Exact spice match
        if dish["spice_level"] == preferences.spice_level:
            score += 3
            
        scored_dishes.append((dish, score))
    
    # Sort by score and take top 3
    scored_dishes.sort(key=lambda x: x[1], reverse=True)
    top_dishes = scored_dishes[:3]
    
    # Generate recommendations with reasons
    recommendations = []
    mood_reasons = {
        "comfort": "Perfect comfort food to warm your soul",
        "spicy": "Brings the heat you're craving",
        "heavy": "Hearty and filling, just what you need",
        "light": "Light and refreshing, easy on the stomach",
        "sharing": "Great for sharing with friends and family"
    }
    
    for dish, score in top_dishes:
        reason = mood_reasons.get(preferences.mood.lower(), "A delicious choice")
        
        # Add specific details
        if preferences.group_size in ["3-4", "5+"]:
            if "sharing" in dish["mood_tags"]:
                reason += " and perfect for groups"
        
        if dish["spice_level"] == preferences.spice_level:
            reason += f" with {preferences.spice_level} spice level"
        
        recommendations.append(DishRecommendation(
            dish=dish["name"],
            price=dish["price"],
            reason=reason,
            tags=dish["tags"],
            dish_id=dish["id"]
        ))
    
    # Generate personalized message
    message = f"Based on your {preferences.mood} mood, here are our top picks for you!"
    
    return RecommendationResponse(
        recommendations=recommendations,
        message=message
    )

@app.get("/api/menu")
def get_menu():
    """Get all menu items"""
    return {"menu": MENU_ITEMS}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
