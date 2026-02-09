import './style.css'
import { HanokPic } from './hanokPic'

// Initialize Hanok Pic
const hanokPic = new HanokPic('hanok-pic-container');

// Create the main app structure
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="app-container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <img src="/HANOKnew.png" alt="Hanok Grill" class="hero-logo" />
        <h1 class="hero-title">Hanok Grill</h1>
        <p class="hero-subtitle">Authentic Korean Cuisine in Mumbai</p>
        
        <div class="hero-actions">
          <button id="open-hanok-pic" class="btn-hero-primary">
            🍽️ Find Your Perfect Dish
            <span class="ai-badge">Powered by AI</span>
          </button>
          <a href="#menu" class="btn-hero-secondary">View Menu</a>
        </div>
      </div>
    </section>

    <!-- Menu Section -->
    <section id="menu" class="menu-section">
      <div class="container">
        <h2 class="section-title">🍽️ Our Menu</h2>
        
        <div class="menu-category">
          <h3>🍚 Starters & Sides</h3>
          <div class="menu-grid">
            <div class="menu-item">
              <div class="menu-item-header">
                <strong>Gimbap (Korean Sushi Rolls)</strong>
                <span class="price">₹299</span>
              </div>
              <p class="menu-item-desc">Fresh rice rolls with vegetables</p>
            </div>
            <div class="menu-item">
              <div class="menu-item-header">
                <strong>Kimchi Pancakes</strong>
                <span class="price">₹349</span>
              </div>
              <p class="menu-item-desc">Crispy pancakes loaded with kimchi</p>
            </div>
            <div class="menu-item">
              <div class="menu-item-header">
                <strong>Spicy Rice Cakes (Tteokbokki)</strong>
                <span class="price">₹329</span>
              </div>
              <p class="menu-item-desc">Chewy rice cakes in spicy-sweet sauce</p>
            </div>
          </div>
        </div>

        <div class="menu-category">
          <h3>🍛 Mains</h3>
          <div class="menu-grid">
            <div class="menu-item">
              <div class="menu-item-header">
                <strong>Bibimbap</strong>
                <span class="price">₹499</span>
              </div>
              <p class="menu-item-desc">Mixed rice bowl with vegetables</p>
            </div>
            <div class="menu-item">
              <div class="menu-item-header">
                <strong>Spicy Bibimbap (with Chicken)</strong>
                <span class="price">₹599</span>
              </div>
              <p class="menu-item-desc">Fiery version with grilled chicken</p>
            </div>
            <div class="menu-item">
              <div class="menu-item-header">
                <strong>Bulgogi (Marinated Beef BBQ)</strong>
                <span class="price">₹699</span>
              </div>
              <p class="menu-item-desc">Tender marinated beef grilled to perfection</p>
            </div>
          </div>
        </div>

        <div class="menu-category">
          <h3>🍜 Noodles & Soups</h3>
          <div class="menu-grid">
            <div class="menu-item">
              <div class="menu-item-header">
                <strong>Kimchi Ramen</strong>
                <span class="price">₹399</span>
              </div>
              <p class="menu-item-desc">Spicy fermented cabbage broth with egg</p>
            </div>
            <div class="menu-item">
              <div class="menu-item-header">
                <strong>Japchae</strong>
                <span class="price">₹429</span>
              </div>
              <p class="menu-item-desc">Stir-fried glass noodles with vegetables</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Location Section -->
    <section id="location" class="location-section">
      <div class="container">
        <h2 class="section-title">📍 Find Us</h2>
        <p class="location-subtitle">Visit Hanok Grill – Authentic Korean Flavors in Mumbai</p>
        
        <div class="contact-info">
          <p><strong>📞 +91 98765 43210</strong></p>
          <p><strong>🕒 Open: 11:00 AM – 11:00 PM (Daily)</strong></p>
          <p><strong>📍 Bandra West, Mumbai, Maharashtra</strong></p>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about-section">
      <div class="container">
        <h2 class="section-title">About Hanok Grill</h2>
        <p>Welcome to Hanok Grill, where the rich traditions of Korean cuisine meet the vibrant spirit of Mumbai. Founded with a passion for authentic flavors and warm hospitality, Hanok Grill brings the best of Seoul's culinary culture right to your table in the heart of the city.</p>
        <p>Our chefs carefully craft each dish using fresh, locally sourced ingredients and time-honored recipes. From classic favorites like <b>Bibimbap</b> and <b>Kimchi</b> to sizzling <b>Korean BBQ</b> and innovative fusion creations, every meal at Hanok Grill is a celebration of taste and tradition.</p>
        <p>Thank you for choosing Hanok Grill — your destination for a unique blend of Korean authenticity and Indian warmth!</p>
      </div>
    </section>

    <!-- Hanok Pic Modal Container -->
    <div id="hanok-pic-container"></div>
  </div>
`;

// Event listener for opening Hanok Pic
document.getElementById('open-hanok-pic')?.addEventListener('click', () => {
  hanokPic.open();
});
