// Comprehensive Dish Dataset with AI Feature Encoding
// Each dish is encoded with numerical features for ML-based recommendation

const dishDataset = [
    {
        id: 'm1',
        name: 'Gimbap',
        price: 299,
        category: 'Appetizers',
        image: '/gimbab.jpeg',
        subtitle: 'Tradition',
        description: 'Hand-rolled harmony of seasoned rice, vibrant vegetables, and cured beef.',
        tags: ['85°C Serv.', '12 min prep'],
        // AI Feature Encoding
        hunger_level: 0, // Snack
        spice_level: 0,  // Mild
        diet_type: 1,    // Non-Veg
        mood_category: 3 // Solo Quiet
    },
    {
        id: 'm2',
        name: 'Mandu',
        price: 349,
        category: 'Appetizers',
        image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=400',
        subtitle: 'Handmade',
        description: 'Steam-exploded dumplings filled with seasoned pork and spring onions.',
        tags: ['Steamed', 'Juicy'],
        hunger_level: 0, // Snack
        spice_level: 0,  // Mild
        diet_type: 1,    // Non-Veg
        mood_category: 2 // Sharing
    },
    {
        id: 'm3',
        name: 'Tteokbokki',
        price: 329,
        category: 'Appetizers',
        image: '/ricecakes.jpeg',
        subtitle: 'Glow of Seoul',
        description: 'Chewy rice cylinders in a volcanic gochujang and honey glaze.',
        tags: ['Spicy High', '15 min prep'],
        hunger_level: 1, // Light Meal
        spice_level: 2,  // Spicy
        diet_type: 0,    // Veg
        mood_category: 1 // Energetic
    },
    {
        id: 'm4',
        name: 'Ramen',
        price: 399,
        category: 'Main',
        image: '/ramen.jpeg',
        subtitle: 'Aged 48h Broth',
        description: 'Intense bone marrow reduction, house noodles, and aged chili paste.',
        tags: ['Intense', 'Signature'],
        hunger_level: 2, // Proper Meal
        spice_level: 1,  // Medium
        diet_type: 1,    // Non-Veg
        mood_category: 0 // Comfort
    },
    {
        id: 'm5',
        name: 'Bibimbap',
        price: 499,
        category: 'Main',
        image: '/bibimbap.jpeg',
        subtitle: 'The Art of Mix',
        description: 'Sizzling dolsot bowl with colorful vegetables and house gochujang.',
        tags: ['Balanced', 'Popular'],
        verified: true,
        hunger_level: 2, // Proper Meal
        spice_level: 1,  // Medium
        diet_type: 2,    // No Preference (can be veg or non-veg)
        mood_category: 1 // Energetic
    },
    {
        id: 'm6',
        name: 'Bulgogi',
        price: 699,
        category: 'Main',
        image: 'https://images.unsplash.com/photo-1594221708779-948211442050?auto=format&fit=crop&q=80&w=400',
        subtitle: 'Traditional BBQ',
        description: 'Thinly sliced ribeye steeped in a luxury pear and garlic marinade.',
        tags: ['Premium Beef', '20 min prep'],
        hunger_level: 3, // Very Hungry
        spice_level: 0,  // Mild
        diet_type: 1,    // Non-Veg
        mood_category: 2 // Sharing
    },
    {
        id: 'm7',
        name: 'Japchae',
        price: 429,
        category: 'Main',
        image: '/palillos.jpeg',
        subtitle: 'Crystal Harmony',
        description: 'Sweet and savory stir-fried glass noodles with forest mushrooms.',
        tags: ['Savory', 'Festive'],
        hunger_level: 2, // Proper Meal
        spice_level: 0,  // Mild
        diet_type: 0,    // Veg
        mood_category: 2 // Sharing
    },
    {
        id: 'm8',
        name: 'Kimchi Jjigae',
        price: 449,
        category: 'Stews',
        image: '/kimchi.jpeg',
        subtitle: 'Soul Stew',
        description: 'Traditional spicy soup with aged kimchi, silken tofu, and pork belly.',
        tags: ['Spicy', 'Winter Soul'],
        hunger_level: 2, // Proper Meal
        spice_level: 2,  // Spicy
        diet_type: 1,    // Non-Veg
        mood_category: 0 // Comfort
    },
    {
        id: 'm9',
        name: 'Sundubu Jjigae',
        price: 429,
        category: 'Stews',
        image: 'https://images.unsplash.com/photo-1583214731093-1ac19abb022a?auto=format&fit=crop&q=80&w=400',
        subtitle: 'Soft Silken',
        description: 'Cloud-like tofu swirling in a spicy, oceanic broth with fresh seafood.',
        tags: ['Classic Stew', '15 min prep'],
        hunger_level: 2, // Proper Meal
        spice_level: 2,  // Spicy
        diet_type: 1,    // Non-Veg
        mood_category: 0 // Comfort
    },
    {
        id: 'm10',
        name: 'Korean FC',
        price: 549,
        category: 'Main',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400',
        subtitle: 'Cloud Crunch',
        description: 'Double-fried perfection glazed in garlic-soy or spicy gochujang.',
        tags: ['Extra Crispy', 'Sharing'],
        hunger_level: 3, // Very Hungry
        spice_level: 1,  // Medium
        diet_type: 1,    // Non-Veg
        mood_category: 2 // Sharing
    },
    {
        id: 'm11',
        name: 'Pajeon',
        price: 399,
        category: 'Appetizers',
        image: '/pajeon_premium.png',
        subtitle: 'Crispy Rain',
        description: 'Savory pancake with scallions and assorted seafood.',
        tags: ['Crispy', 'Savory'],
        hunger_level: 1, // Light Meal
        spice_level: 0,  // Mild
        diet_type: 1,    // Non-Veg
        mood_category: 2 // Sharing
    },
    {
        id: 'm12',
        name: 'Kimchi Fried Rice',
        price: 479,
        category: 'Main',
        image: '/kimchifriendrice.jpeg',
        subtitle: 'Street Classic',
        description: 'Wok-fired rice with spicy kimchi, spam, and a sunny-side up egg.',
        tags: ['Wok-hei', 'Comfort'],
        hunger_level: 2, // Proper Meal
        spice_level: 2,  // Spicy
        diet_type: 1,    // Non-Veg
        mood_category: 0 // Comfort
    },
    {
        id: 'm13',
        name: 'Soju Original',
        price: 499,
        category: 'Drinks',
        image: 'https://images.unsplash.com/photo-1618392135061-07ee4b72661c?auto=format&fit=crop&q=80&w=400',
        subtitle: 'Spirit of Korea',
        description: 'Crystal clear distilled rice liquor, best served ice cold.',
        tags: ['Chilled', '17% ABV'],
        hunger_level: 0, // Snack
        spice_level: 0,  // Mild
        diet_type: 2,    // No Preference
        mood_category: 2 // Sharing
    },
    {
        id: 'm14',
        name: 'Barley Tea',
        price: 149,
        category: 'Drinks',
        image: 'https://images.unsplash.com/photo-1594631252845-29fc4586216c?auto=format&fit=crop&q=80&w=400',
        subtitle: 'Daily Brew',
        description: 'Roasted barley infusion, nutty and caffeine-free comfort.',
        tags: ['Hot/Cold', 'Healthy'],
        hunger_level: 0, // Snack
        spice_level: 0,  // Mild
        diet_type: 0,    // Veg
        mood_category: 3 // Solo Quiet
    }
];

module.exports = dishDataset;
