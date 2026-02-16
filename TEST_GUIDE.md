# AI Recommendation System - Quick Test Guide

## 🚀 Quick Start

### 1. Start Backend
```bash
cd backend
node server.js
```
Expected output: `Server running on port 4000`

### 2. Test API
```bash
curl http://localhost:4000/api/recommendations/test
```

### 3. Test Recommendation
```bash
curl -X POST http://localhost:4000/api/recommendations/get \
  -H "Content-Type: application/json" \
  -d "{\"hunger\":\"Very Hungry\",\"spice\":\"Spicy\",\"diet\":\"Non-Veg\",\"mood\":\"Energetic\"}"
```

## 📝 Test Scenarios

### Scenario 1: Hungry Spice Lover
```json
{
  "hunger": "Very Hungry",
  "spice": "Spicy",
  "diet": "Non-Veg",
  "mood": "Energetic"
}
```
**Expected Top Recommendations**: Korean FC, Bulgogi, Kimchi Jjigae

### Scenario 2: Light Vegetarian
```json
{
  "hunger": "Light",
  "spice": "Mild",
  "diet": "Veg",
  "mood": "Solo"
}
```
**Expected Top Recommendations**: Japchae, Tteokbokki, Barley Tea

### Scenario 3: Comfort Food Seeker
```json
{
  "hunger": "Proper Meal",
  "spice": "Medium",
  "diet": "No Preference",
  "mood": "Comfort"
}
```
**Expected Top Recommendations**: Ramen, Bibimbap, Kimchi Fried Rice

### Scenario 4: Sharing Mood
```json
{
  "hunger": "Very Hungry",
  "spice": "Mild",
  "diet": "Non-Veg",
  "mood": "Sharing"
}
```
**Expected Top Recommendations**: Bulgogi, Korean FC, Pajeon

## 🎯 Frontend Testing

1. Navigate to Menu3D page
2. Scroll to "Entire Menu" section
3. Look for "Hanok AI Picks" widget on the right sidebar
4. Click "Take AI Recommendation" button
5. Answer the 4 questions
6. Click "Get AI Recommendations"
7. View top 3 personalized recommendations
8. Test "Add to Order" functionality
9. Try "Try Different Preferences" to restart

## ✅ Validation Checklist

- [ ] Backend server starts without errors
- [ ] Test endpoint returns success
- [ ] Recommendation endpoint returns 3 dishes
- [ ] Match percentages are between 0-100%
- [ ] Explanation text is generated correctly
- [ ] Frontend modal opens on button click
- [ ] All 4 questions are interactive
- [ ] Loading animation displays
- [ ] Results show 3 recommendations
- [ ] Add to cart works from modal
- [ ] Retry button resets to questions

## 🐛 Common Issues

### Issue: "Failed to connect to recommendation service"
**Solution**: Ensure backend is running on port 4000

### Issue: "Missing required fields" error
**Solution**: Ensure all 4 questions are answered

### Issue: Modal doesn't open
**Solution**: Check browser console for errors, ensure AIRecommendationModal.tsx is imported

### Issue: CORS error
**Solution**: Backend already has CORS enabled, check if both servers are running

## 📊 Expected Response Format

```json
{
  "success": true,
  "recommendations": [
    {
      "id": "m10",
      "name": "Korean FC",
      "matchScore": "0.40",
      "matchPercentage": "87"
    }
  ],
  "explanation": "Recommended because you selected...",
  "userPreferences": {...}
}
```

## 🔍 Debugging

### Check Backend Logs
```bash
# In backend terminal
# Look for: "Server running on port 4000"
# Look for: "MongoDB connected"
```

### Check Frontend Network Tab
1. Open browser DevTools (F12)
2. Go to Network tab
3. Click "Take AI Recommendation"
4. Look for POST request to `/api/recommendations/get`
5. Check request payload and response

### Test Individual Functions
```javascript
// In Node.js REPL or test file
const { encodeUserPreferences } = require('./backend/services/recommendationEngine');

const encoded = encodeUserPreferences({
    hunger: 'Very Hungry',
    spice: 'Spicy',
    diet: 'Non-Veg',
    mood: 'Energetic'
});

console.log(encoded);
// Expected: { hunger_level: 3, spice_level: 2, diet_type: 1, mood_category: 1 }
```

## 🎨 UI/UX Validation

- [ ] Modal has smooth fade-in animation
- [ ] Questions have hover effects
- [ ] Active selections are highlighted in gold
- [ ] Loading spinner rotates smoothly
- [ ] Loading steps appear sequentially
- [ ] Results cards have hover effects
- [ ] Match percentage badges are visible
- [ ] Images load correctly
- [ ] Buttons have hover/active states
- [ ] Modal closes on X button or backdrop click

## 📈 Performance Checks

- [ ] API response time < 200ms
- [ ] Modal opens instantly
- [ ] No lag when selecting options
- [ ] Smooth transitions between states
- [ ] Images load without delay

---

**Last Updated**: 2026-02-15
