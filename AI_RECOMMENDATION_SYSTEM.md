# Hanok Grill AI Recommendation System

## 📋 System Overview

A machine learning-based recommendation engine that provides personalized dish recommendations based on user preferences using feature-based similarity scoring.

---

## 🎯 System Goal

When a user clicks **"Take AI Recommendation"**, the system collects user preferences through 4 questions and recommends the top 3 most suitable dishes using weighted similarity scoring.

---

## 🧠 Feature Encoding

### User Input Questions

1. **Hunger Level**
   - Snack = 0
   - Light Meal = 1
   - Proper Meal = 2
   - Very Hungry = 3

2. **Spice Preference**
   - Mild = 0
   - Medium = 1
   - Spicy = 2

3. **Diet Type**
   - Veg = 0
   - Non-Veg = 1
   - No Preference = 2

4. **Mood**
   - Comfort = 0
   - Energetic = 1
   - Sharing = 2
   - Solo Quiet = 3

---

## 🔬 Matching Algorithm

### Similarity Score Formula

```
Score = 
  0.4 × hunger_difference +
  0.2 × spice_difference +
  0.2 × diet_difference +
  0.2 × mood_difference
```

**Lower score = Better match**

### Weight Distribution
- **Hunger Level**: 40% (most important)
- **Spice Preference**: 20%
- **Diet Type**: 20%
- **Mood**: 20%

### Special Diet Matching Logic
- Perfect match (same diet type): difference = 0
- No preference (either user or dish): difference = 0.5
- Mismatch (veg vs non-veg): difference = 2 (strong penalty)

---

## 📊 System Flow

```
User clicks "Take AI Recommendation"
    ↓
Modal opens with 4 questions
    ↓
User selects preferences
    ↓
Frontend sends POST request to /api/recommendations/get
    ↓
Backend encodes user responses into feature vector
    ↓
Calculate similarity scores for all dishes
    ↓
Sort by score (ascending)
    ↓
Return top 3 recommendations
    ↓
Display results with match percentages
    ↓
User can add to cart or try different preferences
```

---

## 🛠️ Technical Implementation

### Backend Structure

```
backend/
├── data/
│   └── dishDataset.js          # Dish database with AI features
├── services/
│   └── recommendationEngine.js # Core ML algorithm
└── routes/
    └── recommendationRoutes.js # API endpoints
```

### Frontend Structure

```
frontend/src/components/
├── AIRecommendationModal.tsx   # Main modal component
├── AIRecommendationModal.css   # Modal styles
└── Menu3D.tsx                  # Integration point
```

---

## 🌐 API Endpoints

### 1. Get Recommendations

**Endpoint**: `POST /api/recommendations/get`

**Request Body**:
```json
{
  "hunger": "Very Hungry",
  "spice": "Spicy",
  "diet": "Non-Veg",
  "mood": "Energetic"
}
```

**Response**:
```json
{
  "success": true,
  "recommendations": [
    {
      "id": "m10",
      "name": "Korean FC",
      "price": 549,
      "category": "Main",
      "image": "...",
      "subtitle": "Cloud Crunch",
      "description": "Double-fried perfection...",
      "tags": ["Extra Crispy", "Sharing"],
      "matchScore": "0.40",
      "matchPercentage": "87"
    },
    {
      "id": "m6",
      "name": "Bulgogi",
      "price": 699,
      "category": "Main",
      "image": "...",
      "subtitle": "Traditional BBQ",
      "description": "Thinly sliced ribeye...",
      "tags": ["Premium Beef", "20 min prep"],
      "matchScore": "0.60",
      "matchPercentage": "80"
    },
    {
      "id": "m8",
      "name": "Kimchi Jjigae",
      "price": 449,
      "category": "Stews",
      "image": "...",
      "subtitle": "Soul Stew",
      "description": "Traditional spicy soup...",
      "tags": ["Spicy", "Winter Soul"],
      "matchScore": "0.80",
      "matchPercentage": "73"
    }
  ],
  "explanation": "Recommended because you selected Spicy + Very Hungry + Non-Veg + Energetic mood.",
  "userPreferences": {
    "hunger": "Very Hungry",
    "spice": "Spicy",
    "diet": "Non-Veg",
    "mood": "Energetic",
    "encoded": {
      "hunger_level": 3,
      "spice_level": 2,
      "diet_type": 1,
      "mood_category": 1
    }
  }
}
```

### 2. Submit Feedback

**Endpoint**: `POST /api/recommendations/feedback`

**Request Body**:
```json
{
  "dishId": "m6",
  "liked": true,
  "userPreferences": {
    "hunger": "Very Hungry",
    "spice": "Spicy",
    "diet": "Non-Veg",
    "mood": "Energetic"
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Feedback received. Thank you for helping us improve!",
  "data": {
    "dishId": "m6",
    "liked": true,
    "timestamp": "2026-02-15T04:32:57.000Z"
  }
}
```

### 3. Test Endpoint

**Endpoint**: `GET /api/recommendations/test`

**Response**:
```json
{
  "success": true,
  "message": "Recommendation system is operational",
  "testCase": {
    "hunger": "Very Hungry",
    "spice": "Spicy",
    "diet": "Non-Veg",
    "mood": "Energetic"
  },
  "recommendations": [
    {
      "name": "Korean FC",
      "score": "0.40"
    },
    {
      "name": "Bulgogi",
      "score": "0.60"
    },
    {
      "name": "Kimchi Jjigae",
      "score": "0.80"
    }
  ]
}
```

---

## 🔄 Advanced Feature: Feedback Loop

The system includes a feedback mechanism for continuous improvement:

### How It Works

1. User provides feedback (liked/disliked) on recommendations
2. System stores feedback with user preferences
3. `updateWeightsFromFeedback()` function adjusts feature weights
4. Future recommendations become more accurate

### Weight Update Logic

```javascript
// If user liked the recommendation
if (feedback.liked) {
    // Increase weights for matching features
    weight += learningRate (0.05)
}

// If user disliked the recommendation
if (!feedback.liked) {
    // Decrease weights for matching features
    weight -= learningRate (0.05)
}

// Normalize weights to sum to 1.0
```

---

## 📈 Example Calculation

### User Input
- Hunger: Very Hungry (3)
- Spice: Spicy (2)
- Diet: Non-Veg (1)
- Mood: Energetic (1)

### Dish: Korean FC
- hunger_level: 3
- spice_level: 1
- diet_type: 1
- mood_category: 2

### Score Calculation
```
hunger_diff = |3 - 3| = 0
spice_diff = |2 - 1| = 1
diet_diff = |1 - 1| = 0
mood_diff = |1 - 2| = 1

Score = 0.4×0 + 0.2×1 + 0.2×0 + 0.2×1
      = 0 + 0.2 + 0 + 0.2
      = 0.4

Match Percentage = (1 - 0.4/3) × 100 = 87%
```

---

## 🚀 Running the System

### Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs on: `http://localhost:4000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Test the API

```bash
# Test endpoint
curl http://localhost:4000/api/recommendations/test

# Get recommendations
curl -X POST http://localhost:4000/api/recommendations/get \
  -H "Content-Type: application/json" \
  -d '{
    "hunger": "Very Hungry",
    "spice": "Spicy",
    "diet": "Non-Veg",
    "mood": "Energetic"
  }'
```

---

## 🎨 User Experience Flow

1. **Trigger**: User clicks "Take AI Recommendation" button in Menu3D
2. **Questions**: Modal opens with 4 interactive question cards
3. **Loading**: Animated loading state with processing steps
4. **Results**: Top 3 recommendations displayed with:
   - Match percentage badge
   - Dish image and details
   - "Add to Order" button
   - Option to retry with different preferences

---

## 🔧 Customization

### Adjust Feature Weights

Edit `backend/services/recommendationEngine.js`:

```javascript
const defaultWeights = {
    hunger: 0.4,  // Change these values
    spice: 0.2,
    diet: 0.2,
    mood: 0.2
};
```

### Add New Dishes

Edit `backend/data/dishDataset.js`:

```javascript
{
    id: 'm15',
    name: 'New Dish',
    price: 599,
    category: 'Main',
    image: '/image.jpg',
    subtitle: 'Subtitle',
    description: 'Description...',
    tags: ['Tag1', 'Tag2'],
    hunger_level: 2,  // Encode features
    spice_level: 1,
    diet_type: 1,
    mood_category: 0
}
```

---

## 📊 Performance Metrics

- **Response Time**: < 100ms for recommendation calculation
- **Accuracy**: Based on user feedback loop
- **Scalability**: O(n) complexity where n = number of dishes
- **Current Dataset**: 14 dishes (12 food items + 2 drinks)

---

## 🔮 Future Enhancements

1. **Persistent Feedback Storage**: Store feedback in MongoDB
2. **User Profiles**: Remember preferences for returning users
3. **Collaborative Filtering**: Recommend based on similar users
4. **Time-Based Recommendations**: Consider time of day, season
5. **Nutritional Scoring**: Add health/calorie preferences
6. **A/B Testing**: Test different weight configurations
7. **Deep Learning**: Upgrade to neural network-based recommendations

---

## 📝 Notes

- Drinks are excluded from main recommendations
- Diet matching has stronger penalty for mismatches
- Match percentage is calculated as: `(1 - score/3) × 100`
- System is stateless by default (can be enhanced with user sessions)

---

## 🤝 Contributing

To add new features or improve the algorithm:

1. Update dish dataset with new features
2. Modify similarity calculation in `recommendationEngine.js`
3. Adjust weights based on user feedback
4. Test with `/api/recommendations/test` endpoint

---

**Built with ❤️ for Hanok Grill**
