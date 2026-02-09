import type { UserPreferences, DishRecommendation } from './types';
import { getRecommendations } from './api';

export class HanokPic {
    private container: HTMLElement;
    private currentStep: number = 1;
    private preferences: Partial<UserPreferences> = {};
    private recommendations: DishRecommendation[] = [];

    constructor(containerId: string) {
        const element = document.getElementById(containerId);
        if (!element) {
            throw new Error(`Container with id "${containerId}" not found`);
        }
        this.container = element;
    }

    public open() {
        this.currentStep = 1;
        this.preferences = {};
        this.render();
    }

    public close() {
        this.container.innerHTML = '';
        this.container.style.display = 'none';
    }

    private render() {
        this.container.style.display = 'block';

        switch (this.currentStep) {
            case 1:
                this.renderMoodSelection();
                break;
            case 2:
                this.renderPreferenceSelection();
                break;
            case 3:
                this.renderRecommendations();
                break;
        }
    }

    private renderMoodSelection() {
        const moods = [
            { value: 'comfort', emoji: '😌', label: 'Comfort', description: 'Warm and cozy dishes' },
            { value: 'spicy', emoji: '🔥', label: 'Spicy', description: 'Bring the heat!' },
            { value: 'heavy', emoji: '🥩', label: 'Heavy', description: 'Hearty and filling' },
            { value: 'light', emoji: '🥗', label: 'Light', description: 'Fresh and easy' },
            { value: 'sharing', emoji: '🎉', label: 'Sharing', description: 'Perfect for groups' },
        ];

        this.container.innerHTML = `
      <div class="hanok-pic-modal">
        <div class="hanok-pic-content">
          <button class="close-btn" id="close-hanok-pic">&times;</button>
          
          <div class="hanok-pic-header">
            <h2>🍽️ Hanok Pic</h2>
            <p class="subtitle">Find your perfect Korean dish</p>
            <div class="progress-bar">
              <div class="progress-step active"></div>
              <div class="progress-step"></div>
              <div class="progress-step"></div>
            </div>
          </div>

          <div class="hanok-pic-body">
            <h3>What's your mood?</h3>
            <p class="step-description">Choose the vibe that matches how you're feeling</p>
            
            <div class="mood-grid">
              ${moods.map(mood => `
                <button class="mood-card" data-mood="${mood.value}">
                  <div class="mood-emoji">${mood.emoji}</div>
                  <div class="mood-label">${mood.label}</div>
                  <div class="mood-description">${mood.description}</div>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

        // Event listeners
        document.getElementById('close-hanok-pic')?.addEventListener('click', () => this.close());

        document.querySelectorAll('.mood-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const mood = (e.currentTarget as HTMLElement).dataset.mood;
                if (mood) {
                    this.preferences.mood = mood;
                    this.currentStep = 2;
                    this.render();
                }
            });
        });
    }

    private renderPreferenceSelection() {
        this.container.innerHTML = `
      <div class="hanok-pic-modal">
        <div class="hanok-pic-content">
          <button class="close-btn" id="close-hanok-pic">&times;</button>
          
          <div class="hanok-pic-header">
            <h2>🍽️ Hanok Pic</h2>
            <p class="subtitle">Find your perfect Korean dish</p>
            <div class="progress-bar">
              <div class="progress-step completed"></div>
              <div class="progress-step active"></div>
              <div class="progress-step"></div>
            </div>
          </div>

          <div class="hanok-pic-body">
            <h3>Your preferences</h3>
            <p class="step-description">Help us personalize your recommendations</p>
            
            <div class="preference-section">
              <label class="preference-label">Diet</label>
              <div class="preference-options">
                <button class="preference-btn" data-diet="veg">🥗 Veg</button>
                <button class="preference-btn" data-diet="non-veg">🍖 Non-Veg</button>
                <button class="preference-btn active" data-diet="both">🍽️ Both</button>
              </div>
            </div>

            <div class="preference-section">
              <label class="preference-label">Spice Level</label>
              <div class="preference-options">
                <button class="preference-btn" data-spice="mild">😊 Mild</button>
                <button class="preference-btn active" data-spice="medium">🌶️ Medium</button>
                <button class="preference-btn" data-spice="hot">🔥 Hot</button>
              </div>
            </div>

            <div class="preference-section">
              <label class="preference-label">Group Size</label>
              <div class="preference-options">
                <button class="preference-btn active" data-group="1-2">👤 1-2</button>
                <button class="preference-btn" data-group="3-4">👥 3-4</button>
                <button class="preference-btn" data-group="5+">👨‍👩‍👧‍👦 5+</button>
              </div>
            </div>

            <div class="action-buttons">
              <button class="btn-secondary" id="back-btn">← Back</button>
              <button class="btn-primary" id="get-recommendations">Get Recommendations ✨</button>
            </div>
          </div>
        </div>
      </div>
    `;

        // Set defaults
        this.preferences.diet = 'both';
        this.preferences.spice_level = 'medium';
        this.preferences.group_size = '1-2';

        // Event listeners
        document.getElementById('close-hanok-pic')?.addEventListener('click', () => this.close());
        document.getElementById('back-btn')?.addEventListener('click', () => {
            this.currentStep = 1;
            this.render();
        });

        // Preference selection
        document.querySelectorAll('[data-diet]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                document.querySelectorAll('[data-diet]').forEach(b => b.classList.remove('active'));
                target.classList.add('active');
                this.preferences.diet = target.dataset.diet;
            });
        });

        document.querySelectorAll('[data-spice]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                document.querySelectorAll('[data-spice]').forEach(b => b.classList.remove('active'));
                target.classList.add('active');
                this.preferences.spice_level = target.dataset.spice;
            });
        });

        document.querySelectorAll('[data-group]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                document.querySelectorAll('[data-group]').forEach(b => b.classList.remove('active'));
                target.classList.add('active');
                this.preferences.group_size = target.dataset.group;
            });
        });

        document.getElementById('get-recommendations')?.addEventListener('click', async () => {
            await this.fetchRecommendations();
        });
    }

    private async fetchRecommendations() {
        try {
            const loadingBtn = document.getElementById('get-recommendations');
            if (loadingBtn) {
                loadingBtn.textContent = 'Finding perfect dishes... 🔍';
                (loadingBtn as HTMLButtonElement).disabled = true;
            }

            const response = await getRecommendations(this.preferences as UserPreferences);
            this.recommendations = response.recommendations;
            this.currentStep = 3;
            this.render();
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            alert('Failed to get recommendations. Please try again.');
            if (document.getElementById('get-recommendations')) {
                const btn = document.getElementById('get-recommendations') as HTMLButtonElement;
                btn.textContent = 'Get Recommendations ✨';
                btn.disabled = false;
            }
        }
    }

    private renderRecommendations() {
        const moodEmojis: Record<string, string> = {
            comfort: '😌',
            spicy: '🔥',
            heavy: '🥩',
            light: '🥗',
            sharing: '🎉'
        };

        this.container.innerHTML = `
      <div class="hanok-pic-modal">
        <div class="hanok-pic-content recommendations-view">
          <button class="close-btn" id="close-hanok-pic">&times;</button>
          
          <div class="hanok-pic-header">
            <h2>🍽️ Hanok Pic</h2>
            <p class="subtitle">Your personalized recommendations</p>
            <div class="progress-bar">
              <div class="progress-step completed"></div>
              <div class="progress-step completed"></div>
              <div class="progress-step active"></div>
            </div>
          </div>

          <div class="hanok-pic-body">
            <div class="recommendation-header">
              <div class="mood-badge">${moodEmojis[ this.preferences.mood || 'comfort' ]} ${this.preferences.mood}</div>
              <p class="recommendation-message">Based on your ${this.preferences.mood} mood, here are our top picks!</p>
            </div>
            
            <div class="recommendations-grid">
              ${this.recommendations.map(rec => `
                <div class="recommendation-card">
                  <div class="rec-header">
                    <h4>${rec.dish}</h4>
                    <span class="rec-price">₹${rec.price}</span>
                  </div>
                  <p class="rec-reason">${rec.reason}</p>
                  <div class="rec-tags">
                    ${rec.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                  </div>
                  <button class="btn-add-to-cart" data-dish-id="${rec.dish_id}">
                    Add to Order 🛒
                  </button>
                </div>
              `).join('')}
            </div>

            <div class="action-buttons">
              <button class="btn-secondary" id="try-again">🔁 Try Another Mood</button>
              <button class="btn-primary" id="view-full-menu">📖 View Full Menu</button>
            </div>
          </div>
        </div>
      </div>
    `;

        // Event listeners
        document.getElementById('close-hanok-pic')?.addEventListener('click', () => this.close());
        document.getElementById('try-again')?.addEventListener('click', () => {
            this.currentStep = 1;
            this.preferences = {};
            this.render();
        });

        document.getElementById('view-full-menu')?.addEventListener('click', () => {
            window.location.href = '#menu-section';
            this.close();
        });

        document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const dishId = (e.currentTarget as HTMLElement).dataset.dishId;
                alert(`Added to cart! Dish ID: ${dishId}`);
                // TODO: Implement cart functionality
            });
        });
    }
}
