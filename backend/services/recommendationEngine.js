/**
 * AI Recommendation Engine for Hanok Grill
 * 
 * This module implements a feature-based similarity scoring algorithm
 * to recommend dishes based on user preferences.
 * 
 * Feature Encoding:
 * - Hunger Level: Snack=0, Light=1, Proper=2, Very Hungry=3
 * - Spice Level: Mild=0, Medium=1, Spicy=2
 * - Diet Type: Veg=0, Non-Veg=1, No Preference=2
 * - Mood: Comfort=0, Energetic=1, Sharing=2, Solo=3
 */

const dishDataset = require('../data/dishDataset');

/**
 * Calculate weighted similarity score between user preferences and a dish
 * Lower score = better match
 * 
 * @param {Object} userPreferences - User's encoded preferences
 * @param {Object} dish - Dish with encoded features
 * @param {Object} weights - Feature weights (default: balanced)
 * @returns {number} Similarity score
 */
function calculateSimilarityScore(userPreferences, dish, weights = null) {
    // Default weights: hunger is most important, others equally weighted
    const defaultWeights = {
        hunger: 0.4,
        spice: 0.2,
        diet: 0.2,
        mood: 0.2
    };

    const w = weights || defaultWeights;

    // Calculate absolute differences for each feature
    const hungerDiff = Math.abs(userPreferences.hunger_level - dish.hunger_level);
    const spiceDiff = Math.abs(userPreferences.spice_level - dish.spice_level);

    // Diet matching: perfect match = 0, mismatch = 1, no preference = 0.5
    let dietDiff;
    if (userPreferences.diet_type === 2 || dish.diet_type === 2) {
        dietDiff = 0.5; // No preference gets medium score
    } else if (userPreferences.diet_type === dish.diet_type) {
        dietDiff = 0; // Perfect match
    } else {
        dietDiff = 2; // Strong mismatch penalty
    }

    const moodDiff = Math.abs(userPreferences.mood_category - dish.mood_category);

    // Weighted score calculation
    const score =
        w.hunger * hungerDiff +
        w.spice * spiceDiff +
        w.diet * dietDiff +
        w.mood * moodDiff;

    return score;
}

/**
 * Get top N dish recommendations based on user preferences
 * 
 * @param {Object} userPreferences - User's encoded preferences
 * @param {number} topN - Number of recommendations to return (default: 3)
 * @param {Object} weights - Optional custom weights
 * @returns {Array} Array of recommended dishes with scores
 */
function getRecommendations(userPreferences, topN = 3, weights = null) {
    // Calculate scores for all dishes
    const scoredDishes = dishDataset
        .filter(dish => dish.category !== 'Drinks') // Exclude drinks from main recommendations
        .map(dish => ({
            ...dish,
            score: calculateSimilarityScore(userPreferences, dish, weights)
        }));

    // Sort by score (ascending - lower is better)
    scoredDishes.sort((a, b) => a.score - b.score);

    // Return top N recommendations
    return scoredDishes.slice(0, topN);
}

/**
 * Generate human-readable explanation for recommendations
 * 
 * @param {Object} userPreferences - User's encoded preferences
 * @returns {string} Explanation text
 */
function generateExplanation(userPreferences) {
    const hungerMap = ['Snack', 'Light Meal', 'Proper Meal', 'Very Hungry'];
    const spiceMap = ['Mild', 'Medium', 'Spicy'];
    const dietMap = ['Veg', 'Non-Veg', 'No Preference'];
    const moodMap = ['Comfort', 'Energetic', 'Sharing', 'Solo Quiet'];

    const hunger = hungerMap[userPreferences.hunger_level] || 'Unknown';
    const spice = spiceMap[userPreferences.spice_level] || 'Unknown';
    const diet = dietMap[userPreferences.diet_type] || 'Unknown';
    const mood = moodMap[userPreferences.mood_category] || 'Unknown';

    return `Recommended because you selected ${spice} + ${hunger} + ${diet} + ${mood} mood.`;
}

/**
 * Encode user responses into numerical feature vector
 * 
 * @param {Object} responses - User's text responses
 * @returns {Object} Encoded preferences
 */
function encodeUserPreferences(responses) {
    const hungerMap = {
        'snack': 0,
        'light': 1,
        'proper': 2,
        'very hungry': 3
    };

    const spiceMap = {
        'mild': 0,
        'medium': 1,
        'spicy': 2
    };

    const dietMap = {
        'veg': 0,
        'non-veg': 1,
        'no preference': 2
    };

    const moodMap = {
        'comfort': 0,
        'energetic': 1,
        'sharing': 2,
        'solo': 3
    };

    return {
        hunger_level: hungerMap[responses.hunger.toLowerCase()] ?? 2,
        spice_level: spiceMap[responses.spice.toLowerCase()] ?? 1,
        diet_type: dietMap[responses.diet.toLowerCase()] ?? 2,
        mood_category: moodMap[responses.mood.toLowerCase()] ?? 0
    };
}

/**
 * Update weights based on user feedback (for future enhancement)
 * This implements a simple feedback loop for continuous improvement
 * 
 * @param {Object} currentWeights - Current weight configuration
 * @param {Object} feedback - User feedback data
 * @returns {Object} Updated weights
 */
function updateWeightsFromFeedback(currentWeights, feedback) {
    // Simple learning rate
    const learningRate = 0.05;

    // If user liked the recommendation, increase weight of matching features
    // If user disliked it, decrease weight of matching features
    const updatedWeights = { ...currentWeights };

    if (feedback.liked) {
        // Increase weights slightly for features that matched
        Object.keys(updatedWeights).forEach(key => {
            if (feedback.matchedFeatures.includes(key)) {
                updatedWeights[key] = Math.min(1, updatedWeights[key] + learningRate);
            }
        });
    } else {
        // Decrease weights for features that matched but user didn't like
        Object.keys(updatedWeights).forEach(key => {
            if (feedback.matchedFeatures.includes(key)) {
                updatedWeights[key] = Math.max(0.1, updatedWeights[key] - learningRate);
            }
        });
    }

    // Normalize weights to sum to 1
    const sum = Object.values(updatedWeights).reduce((a, b) => a + b, 0);
    Object.keys(updatedWeights).forEach(key => {
        updatedWeights[key] /= sum;
    });

    return updatedWeights;
}

module.exports = {
    getRecommendations,
    encodeUserPreferences,
    generateExplanation,
    calculateSimilarityScore,
    updateWeightsFromFeedback
};
