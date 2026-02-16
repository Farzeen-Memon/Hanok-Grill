/**
 * AI Recommendation Routes
 * API endpoints for the Hanok Grill recommendation system
 */

const express = require('express');
const router = express.Router();
const {
    getRecommendations,
    encodeUserPreferences,
    generateExplanation
} = require('../services/recommendationEngine');

/**
 * POST /api/recommendations/get
 * Get personalized dish recommendations based on user preferences
 * 
 * Request Body:
 * {
 *   "hunger": "Very Hungry" | "Proper Meal" | "Light" | "Snack",
 *   "spice": "Spicy" | "Medium" | "Mild",
 *   "diet": "Veg" | "Non-Veg" | "No Preference",
 *   "mood": "Comfort" | "Energetic" | "Sharing" | "Solo"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "recommendations": [...],
 *   "explanation": "...",
 *   "userPreferences": {...}
 * }
 */
router.post('/get', (req, res) => {
    try {
        const { hunger, spice, diet, mood } = req.body;

        // Validate input
        if (!hunger || !spice || !diet || !mood) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: hunger, spice, diet, mood'
            });
        }

        // Encode user preferences
        const encodedPreferences = encodeUserPreferences({
            hunger,
            spice,
            diet,
            mood
        });

        // Get top 3 recommendations
        const recommendations = getRecommendations(encodedPreferences, 3);

        // Generate explanation
        const explanation = generateExplanation(encodedPreferences);

        // Return response
        res.json({
            success: true,
            recommendations: recommendations.map(dish => ({
                id: dish.id,
                name: dish.name,
                price: dish.price,
                category: dish.category,
                image: dish.image,
                subtitle: dish.subtitle,
                description: dish.description,
                tags: dish.tags,
                matchScore: dish.score.toFixed(2),
                matchPercentage: Math.max(0, Math.min(100, (1 - dish.score / 3) * 100)).toFixed(0)
            })),
            explanation,
            userPreferences: {
                hunger,
                spice,
                diet,
                mood,
                encoded: encodedPreferences
            }
        });

    } catch (error) {
        console.error('Recommendation error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
});

/**
 * POST /api/recommendations/feedback
 * Submit user feedback on recommendations (for future ML improvements)
 * 
 * Request Body:
 * {
 *   "dishId": "m6",
 *   "liked": true,
 *   "userPreferences": {...}
 * }
 */
router.post('/feedback', (req, res) => {
    try {
        const { dishId, liked, userPreferences } = req.body;

        // In a production system, this would:
        // 1. Store feedback in database
        // 2. Update ML model weights
        // 3. Improve future recommendations

        // For now, just acknowledge receipt
        res.json({
            success: true,
            message: 'Feedback received. Thank you for helping us improve!',
            data: {
                dishId,
                liked,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Feedback error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

/**
 * GET /api/recommendations/test
 * Test endpoint to verify the recommendation system is working
 */
router.get('/test', (req, res) => {
    try {
        // Test with sample preferences
        const testPreferences = encodeUserPreferences({
            hunger: 'Very Hungry',
            spice: 'Spicy',
            diet: 'Non-Veg',
            mood: 'Energetic'
        });

        const recommendations = getRecommendations(testPreferences, 3);

        res.json({
            success: true,
            message: 'Recommendation system is operational',
            testCase: {
                hunger: 'Very Hungry',
                spice: 'Spicy',
                diet: 'Non-Veg',
                mood: 'Energetic'
            },
            recommendations: recommendations.map(d => ({
                name: d.name,
                score: d.score.toFixed(2)
            }))
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
