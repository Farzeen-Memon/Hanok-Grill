import React, { useState } from 'react';
import './AIRecommendationModal.css';

interface Recommendation {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    subtitle: string;
    description: string;
    tags: string[];
    matchScore: string;
    matchPercentage: string;
}

interface AIRecommendationModalProps {
    onClose: () => void;
    onAddToCart: (id: string) => void;
}

const AIRecommendationModal: React.FC<AIRecommendationModalProps> = ({ onClose, onAddToCart }) => {
    const [ step, setStep ] = useState<'questions' | 'loading' | 'results'>('questions');
    const [ hunger, setHunger ] = useState('');
    const [ spice, setSpice ] = useState('');
    const [ diet, setDiet ] = useState('');
    const [ mood, setMood ] = useState('');
    const [ recommendations, setRecommendations ] = useState<Recommendation[]>([]);
    const [ explanation, setExplanation ] = useState('');

    const handleSubmit = async () => {
        if (!hunger || !spice || !diet || !mood) {
            alert('Please answer all questions');
            return;
        }

        setStep('loading');

        try {
            const response = await fetch('http://localhost:4000/api/recommendations/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hunger, spice, diet, mood }),
            });

            const data = await response.json();

            if (data.success) {
                setRecommendations(data.recommendations);
                setExplanation(data.explanation);
                setTimeout(() => setStep('results'), 1500);
            } else {
                alert('Failed to get recommendations');
                setStep('questions');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to recommendation service');
            setStep('questions');
        }
    };

    const handleFeedback = async (dishId: string, liked: boolean) => {
        try {
            await fetch('http://localhost:4000/api/recommendations/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dishId,
                    liked,
                    userPreferences: { hunger, spice, diet, mood }
                }),
            });
        } catch (error) {
            console.error('Feedback error:', error);
        }
    };

    return (
        <div className="ai-modal-overlay" onClick={onClose}>
            <div className="ai-modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="ai-modal-close" onClick={onClose}>
                    <span className="material-symbols-outlined hidden md:block">close</span>
                    <span className="material-symbols-outlined md:hidden">arrow_back</span>
                </button>

                {step === 'questions' && (
                    <div className="ai-modal-content">
                        <div className="ai-modal-header">

                            <h2 className="ai-modal-title">HANOK AI PICKS</h2>
                            <p className="ai-modal-subtitle">Answer 4 quick questions for personalized recommendations</p>
                        </div>

                        <div className="ai-questions-grid">
                            {/* Question 1: Hunger Level */}
                            <div className="ai-question-block">
                                <label className="ai-question-label">
                                    <span className="material-symbols-outlined">restaurant</span>
                                    How hungry are you?
                                </label>
                                <div className="ai-options-grid">
                                    {[ 'Snack', 'Light', 'Proper Meal', 'Very Hungry' ].map((option) => (
                                        <button
                                            key={option}
                                            className={`ai-option-btn ${hunger === option ? 'active' : ''}`}
                                            onClick={() => setHunger(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Question 2: Spice Preference */}
                            <div className="ai-question-block">
                                <label className="ai-question-label">
                                    <span className="material-symbols-outlined">local_fire_department</span>
                                    Spice preference?
                                </label>
                                <div className="ai-options-grid">
                                    {[ 'Mild', 'Medium', 'Spicy' ].map((option) => (
                                        <button
                                            key={option}
                                            className={`ai-option-btn ${spice === option ? 'active' : ''}`}
                                            onClick={() => setSpice(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Question 3: Diet Type */}
                            <div className="ai-question-block">
                                <label className="ai-question-label">
                                    <span className="material-symbols-outlined">eco</span>
                                    Diet preference?
                                </label>
                                <div className="ai-options-grid">
                                    {[ 'Veg', 'Non-Veg', 'No Preference' ].map((option) => (
                                        <button
                                            key={option}
                                            className={`ai-option-btn ${diet === option ? 'active' : ''}`}
                                            onClick={() => setDiet(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Question 4: Mood */}
                            <div className="ai-question-block">
                                <label className="ai-question-label">
                                    <span className="material-symbols-outlined">mood</span>
                                    What's your mood?
                                </label>
                                <div className="ai-options-grid">
                                    {[ 'Comfort', 'Energetic', 'Sharing', 'Solo' ].map((option) => (
                                        <button
                                            key={option}
                                            className={`ai-option-btn ${mood === option ? 'active' : ''}`}
                                            onClick={() => setMood(option)}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="ai-action-container">
                            <button className="ai-action-btn-inline" onClick={handleSubmit}>
                                <div className="ai-action-btn-content">
                                    <span className="material-symbols-outlined ai-action-icon">auto_awesome</span>
                                    <div className="ai-action-text">
                                        <span className="ai-action-tag">Sync Interface</span>
                                        <span className="ai-action-main">Get AI Recommendations</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {step === 'loading' && (
                    <div className="ai-loading-state">
                        <div className="ai-loading-spinner"></div>
                        <h3 className="ai-loading-title">Analyzing Your Preferences...</h3>
                        <div className="ai-loading-steps">
                            <p className="ai-loading-step">→ Processing taste clusters...</p>
                            <p className="ai-loading-step">→ Matching flavor profiles...</p>
                            <p className="ai-loading-step">→ Calculating similarity scores...</p>
                            <p className="ai-loading-step">→ Generating recommendations...</p>
                        </div>
                    </div>
                )}

                {step === 'results' && (
                    <div className="ai-results-content">
                        <div className="ai-results-header">
                            <div className="ai-icon-success">
                                <span className="material-symbols-outlined">check_circle</span>
                            </div>
                            <h2 className="ai-results-title">YOUR PERFECT MATCHES</h2>
                            <p className="ai-results-explanation">{explanation}</p>
                        </div>

                        <div className="ai-results-grid">
                            {recommendations.map((dish, index) => (
                                <div key={dish.id} className="ai-result-card">
                                    <div className="ai-result-badge">#{index + 1} MATCH</div>
                                    <div className="ai-result-match-score">
                                        <div className="ai-result-match-circle">
                                            <span className="ai-result-match-percentage">{dish.matchPercentage}%</span>
                                        </div>
                                    </div>
                                    <div className="ai-result-image-wrapper">
                                        <img src={dish.image} alt={dish.name} className="ai-result-image" />
                                    </div>
                                    <div className="ai-result-info">
                                        <p className="ai-result-subtitle">{dish.subtitle}</p>
                                        <h3 className="ai-result-name">{dish.name}</h3>
                                        <p className="ai-result-description">{dish.description}</p>
                                        <div className="ai-result-tags">
                                            {dish.tags.map((tag) => (
                                                <span key={tag} className="ai-result-tag">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="ai-result-footer">
                                            <span className="ai-result-price">₹{dish.price}</span>
                                            <div className="ai-result-actions">
                                                <button
                                                    className="ai-result-btn-add"
                                                    onClick={() => {
                                                        onAddToCart(dish.id);
                                                        handleFeedback(dish.id, true);
                                                    }}
                                                >
                                                    <span className="material-symbols-outlined">add_shopping_cart</span>
                                                    Add to Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="ai-results-footer">
                            <button className="ai-retry-btn" onClick={() => setStep('questions')}>
                                <span className="material-symbols-outlined">refresh</span>
                                Try Different Preferences
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIRecommendationModal;
