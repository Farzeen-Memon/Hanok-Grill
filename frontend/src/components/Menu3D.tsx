import React, { useRef, useState } from 'react';
import './Menu3D.css';

export interface Menu3DProps {
    onBack: () => void;
    cart: Record<string, number>;
    addToCart: (id: string) => void;
    onOpenTerminal: () => void;
}

const Menu3D: React.FC<Menu3DProps> = ({ onBack, cart, addToCart, onOpenTerminal }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const [ activeCategory, setActiveCategory ] = useState('All');

    const fullMenu = [
        {
            id: 'm1', name: 'Gimbap', price: 299, category: 'Appetizers', image: '/gimbab.jpeg',
            subtitle: 'Tradition', description: 'Hand-rolled harmony of seasoned rice, vibrant vegetables, and cured beef.',
            tags: [ '85°C Serv.', '12 min prep' ]
        },
        {
            id: 'm2', name: 'Mandu', price: 349, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=400',
            subtitle: 'Handmade', description: 'Steam-exploded dumplings filled with seasoned pork and spring onions.',
            tags: [ 'Steamed', 'Juicy' ]
        },
        {
            id: 'm3', name: 'Tteokbokki', price: 329, category: 'Appetizers', image: '/ricecakes.jpeg',
            subtitle: 'Glow of Seoul', description: 'Chewy rice cylinders in a volcanic gochujang and honey glaze.',
            tags: [ 'Spicy High', '15 min prep' ]
        },
        {
            id: 'm4', name: 'Ramen', price: 399, category: 'Main', image: '/ramen.jpeg',
            subtitle: 'Aged 48h Broth', description: 'Intense bone marrow reduction, house noodles, and aged chili paste.',
            tags: [ 'Intense', 'Signature' ]
        },
        {
            id: 'm5', name: 'Bibimbap', price: 499, category: 'Main', image: '/bibimbap.jpeg',
            subtitle: 'The Art of Mix', description: 'Sizzling dolsot bowl with colorful vegetables and house gochujang.',
            tags: [ 'Balanced', 'Popular' ], verified: true
        },
        {
            id: 'm6', name: 'Bulgogi', price: 699, category: 'Main', image: 'https://images.unsplash.com/photo-1594221708779-948211442050?auto=format&fit=crop&q=80&w=400',
            subtitle: 'Traditional BBQ', description: 'Thinly sliced ribeye steeped in a luxury pear and garlic marinade.',
            tags: [ 'Premium Beef', '20 min prep' ]
        },
        {
            id: 'm7', name: 'Japchae', price: 429, category: 'Main', image: '/palillos.jpeg',
            subtitle: 'Crystal Harmony', description: 'Sweet and savory stir-fried glass noodles with forest mushrooms.',
            tags: [ 'Savory', 'Festive' ]
        },
        {
            id: 'm8', name: 'Kimchi Jjigae', price: 449, category: 'Stews', image: '/kimchi.jpeg',
            subtitle: 'Soul Stew', description: 'Traditional spicy soup with aged kimchi, silken tofu, and pork belly.',
            tags: [ 'Spicy', 'Winter Soul' ]
        },
        {
            id: 'm9', name: 'Sundubu Jjigae', price: 429, category: 'Stews', image: 'https://images.unsplash.com/photo-1583214731093-1ac19abb022a?auto=format&fit=crop&q=80&w=400',
            subtitle: 'Soft Silken', description: 'Cloud-like tofu swirling in a spicy, oceanic broth with fresh seafood.',
            tags: [ 'Classic Stew', '15 min prep' ]
        },
        {
            id: 'm10', name: 'Korean FC', price: 549, category: 'Main', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400',
            subtitle: 'Cloud Crunch', description: 'Double-fried perfection glazed in garlic-soy or spicy gochujang.',
            tags: [ 'Extra Crispy', 'Sharing' ]
        },
        {
            id: 'm11', name: 'Pajeon', price: 399, category: 'Appetizers', image: '/pajeon_premium.png',
            subtitle: 'Crispy Rain', description: 'Savory pancake with scallions and assorted seafood.',
            tags: [ 'Crispy', 'Savory' ]
        },
        {
            id: 'm12', name: 'Kimchi Fried Rice', price: 479, category: 'Main', image: '/kimchifriendrice.jpeg',
            subtitle: 'Street Classic', description: 'Wok-fired rice with spicy kimchi, spam, and a sunny-side up egg.',
            tags: [ 'Wok-hei', 'Comfort' ]
        },
        {
            id: 'm13', name: 'Soju Original', price: 499, category: 'Drinks', image: 'https://images.unsplash.com/photo-1618392135061-07ee4b72661c?auto=format&fit=crop&q=80&w=400',
            subtitle: 'Spirit of Korea', description: 'Crystal clear distilled rice liquor, best served ice cold.',
            tags: [ 'Chilled', '17% ABV' ]
        },
        {
            id: 'm14', name: 'Barley Tea', price: 149, category: 'Drinks', image: 'https://images.unsplash.com/photo-1594631252845-29fc4586216c?auto=format&fit=crop&q=80&w=400',
            subtitle: 'Daily Brew', description: 'Roasted barley infusion, nutty and caffeine-free comfort.',
            tags: [ 'Hot/Cold', 'Healthy' ]
        },
    ];

    const aiRecommendations = fullMenu.filter(item => item.id === 'm6' || item.id === 'm5' || item.id === 'm10');

    const filteredMenu = activeCategory === 'AI Recommendations'
        ? aiRecommendations
        : activeCategory === 'All'
            ? fullMenu
            : fullMenu.filter(item => item.category === activeCategory);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft } = scrollRef.current;
            const scrollAmount = 500; // Adjust for card width + gap
            const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const getTotalItems = () => Object.values(cart).reduce((a, b) => a + b, 0);
    const getTotalPrice = () => fullMenu.reduce((total, item) => total + (item.price * (cart[ item.id ] || 0)), 0);

    return (
        <div className="menu-3d-wrapper text-white min-h-screen w-full fixed inset-0 z-[100] bg-background-dark font-sans overflow-y-auto no-scrollbar">
            {/* Background Layer */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[#0a0906]"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1543326175-3b608882416c?auto=format&fit=crop&q=80&w=2560')] bg-cover bg-center grayscale brightness-50"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0906] via-transparent to-[#0a0906]/80"></div>
                <div className="absolute inset-0 cyber-grid-precise"></div>
                <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-3xl transform rotate-12"></div>
                </div>
            </div>

            {/* Main Container */}
            <div className="relative z-10 flex flex-col h-screen">
                {/* Header */}
                <header className="flex items-center justify-between px-10 py-6 border-b border-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={onBack}>
                        <div className="relative size-10 text-primary fiery-logo-glow">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 5C50 5 35 25 35 45C35 65 50 85 50 85C50 85 65 65 65 45C65 25 50 5 50 5Z" fill="currentColor" fillOpacity="0.2"></path>
                                <path d="M50 15C50 15 40 30 40 45C40 60 50 75 50 75C50 75 60 60 60 45C60 30 50 15 50 15Z" fill="currentColor" fillOpacity="0.5"></path>
                                <path d="M50 25C50 25 45 35 45 45C45 55 50 65 50 65C50 65 55 55 55 45C55 35 50 25 50 25Z" fill="currentColor"></path>
                                <path d="M30 40C25 55 35 75 50 85" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
                                <path d="M70 40C75 55 65 75 50 85" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-white font-display text-lg font-bold tracking-[0.2em] uppercase">Hanok</span>
                            <span className="text-primary font-display text-[10px] tracking-[0.4em] uppercase font-bold">Grill</span>
                        </div>
                    </div>
                    <nav className="hidden md:flex items-center gap-10">
                        <a className="text-white/60 hover:text-primary transition-colors text-xs font-bold tracking-[0.2em] uppercase" href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>Home</a>
                        <a className="text-white/60 hover:text-primary transition-colors text-xs font-bold tracking-[0.2em] uppercase" href="#">The Vault</a>
                        <a className="text-white/60 hover:text-primary transition-colors text-xs font-bold tracking-[0.2em] uppercase" href="#">Sensory Room</a>
                        <a className="text-primary text-xs font-bold tracking-[0.2em] uppercase border-b-2 border-primary pb-1" href="#">3D Menu</a>
                        <a className="text-white/60 hover:text-primary transition-colors text-xs font-bold tracking-[0.2em] uppercase" href="#">History</a>
                    </nav>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end mr-2">
                            <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Total Order</span>
                            <span className="text-xl font-bold tracking-tighter text-white">₹{getTotalPrice()}</span>
                        </div>
                        <button
                            onClick={onOpenTerminal}
                            className="group relative flex items-center gap-4 bg-primary text-background-dark px-10 py-2.5 rounded-full hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(238,189,43,0.4)]"
                        >
                            <span className="material-symbols-outlined font-bold text-xl">shopping_cart</span>
                            <span className="text-sm font-black tracking-[0.2em] uppercase">Order Terminal</span>
                            {getTotalItems() > 0 && (
                                <span className="absolute -top-1 -right-1 size-7 bg-white border-2 border-primary text-primary text-[11px] font-black rounded-full flex items-center justify-center animate-bounce shadow-xl">
                                    {getTotalItems()}
                                </span>
                            )}
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 relative z-10 pt-6">
                    {/* Vertical Korean Text Background */}
                    <div className="absolute left-10 top-[20%] pointer-events-none opacity-5 select-none z-0">
                        <div className="writing-vertical-rl text-[120px] font-black tracking-[1em] text-white">전통적인 그릴</div>
                    </div>

                    {/* Specials Section */}
                    <div className="relative z-10 w-full mb-32">
                        <div className="text-center mb-8">
                            <span className="text-primary font-black text-[12px] tracking-[0.5em] uppercase mb-2 block font-display">Premium Curation</span>
                            <h2 className="text-5xl font-bold font-display tracking-tight text-white/90">OUR SPECIALS</h2>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="absolute top-[60%] -translate-y-1/2 left-4 z-30">
                            <button
                                onClick={() => scroll('left')}
                                className="size-14 rounded-full border border-white/10 bg-background-dark/40 backdrop-blur-md flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 group"
                            >
                                <span className="material-symbols-outlined text-2xl group-active:scale-90 transition-transform">west</span>
                            </button>
                        </div>
                        <div className="absolute top-[60%] -translate-y-1/2 right-4 z-30">
                            <button
                                onClick={() => scroll('right')}
                                className="size-14 rounded-full border border-white/10 bg-background-dark/40 backdrop-blur-md flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300 group"
                            >
                                <span className="material-symbols-outlined text-2xl group-active:scale-90 transition-transform">east</span>
                            </button>
                        </div>

                        <div
                            ref={scrollRef}
                            className="flex overflow-x-auto no-scrollbar gap-16 pb-20 pt-10 px-12 items-center overflow-y-visible"
                        >
                            {fullMenu.filter(item => item.category !== 'Drinks').map((item) => (
                                <div key={item.id} className="relative flex-none group transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                    <div className="absolute -inset-12 bg-primary/15 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="w-[340px] group-hover:w-[480px] h-[550px] group-hover:h-[650px] bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-primary/40 flex flex-col items-center p-10 group-hover:p-14 transition-all duration-700 shadow-[0_0_50px_rgba(238,189,43,0)] group-hover:shadow-[0_40px_100px_rgba(238,189,43,0.15)] overflow-hidden">
                                        {(item as any).verified && (
                                            <div className="absolute top-10 right-10 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                                                <span className="material-symbols-outlined text-base font-bold">verified</span>
                                            </div>
                                        )}
                                        {(item as any).star && (
                                            <div className="absolute top-10 right-10 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                                                <span className="material-symbols-outlined text-base font-bold">star</span>
                                            </div>
                                        )}
                                        <div className="relative w-full h-[220px] group-hover:h-[300px] mb-8 flex items-center justify-center transition-all duration-700">
                                            <img
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.9)] ring-4 ring-white/5 group-hover:ring-12 group-hover:ring-primary/25 scale-110 group-hover:scale-125 transition-all duration-700"
                                                src={item.image}
                                            />
                                        </div>
                                        <div className="text-center w-full flex flex-col items-center flex-1">
                                            <p className="text-[10px] text-primary font-black tracking-[0.4em] uppercase mb-2 opacity-60 group-hover:opacity-100 transition-opacity">{(item as any).subtitle}</p>
                                            <h4 className="text-4xl group-hover:text-5xl font-bold mb-4 italic font-display transition-all duration-700 leading-tight">{item.name}</h4>
                                            <p className="text-white/50 group-hover:text-white/80 text-xs group-hover:text-sm leading-relaxed mb-auto font-light transition-all duration-700 max-w-[90%]">{(item as any).description}</p>
                                            <div className="flex justify-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity pt-6 w-full">
                                                {(item as any).tags?.map((tag: string) => (
                                                    <div key={tag} className="text-[9px] text-white/50 border border-white/10 px-3 py-1.5 uppercase font-bold tracking-[0.2em] whitespace-nowrap">{tag}</div>
                                                ))}
                                            </div>

                                            {/* Add to Order Button for Specials */}
                                            <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 w-full px-4">
                                                <button
                                                    onClick={() => addToCart(item.id)}
                                                    className="w-full bg-primary hover:bg-white text-background-dark py-3.5 rounded-xl text-sm font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3"
                                                >
                                                    <span className="material-symbols-outlined text-base">add_shopping_cart</span>
                                                    Add to Order {cart[ item.id ] > 0 && <span className="bg-background-dark text-white size-6 rounded-full flex items-center justify-center text-[9px]">{cart[ item.id ]}</span>}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll to View indicator */}
                    <div
                        className="flex flex-col items-center justify-center -mt-10 mb-20 gap-4 opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-pointer group"
                        onClick={() => document.getElementById('entire-menu')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span className="text-[10px] uppercase tracking-[0.6em] text-white font-bold">scroll to view entire menu..</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent animate-bounce"></div>
                    </div>

                    {/* Entire Menu Section with AI Sidebar */}
                    <div id="entire-menu" className="relative z-10 w-full px-6 lg:px-12 py-32 bg-background-dark/50 backdrop-blur-2xl border-t border-white/5 mt-20">
                        <div className="max-w-[1600px] mx-auto">
                            <div className="flex flex-col lg:flex-row gap-16">

                                {/* Left: Main Menu Grid */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                                        <div>
                                            <span className="text-primary font-black text-[10px] tracking-[0.5em] uppercase mb-4 block">Selection</span>
                                            <h3 className="text-6xl font-bold font-display text-white/90">THE ENTIRE MENU</h3>
                                        </div>
                                        <div className="flex gap-4 border-b border-white/10 pb-2 flex-wrap">
                                            {[ 'All', 'Appetizers', 'Main', 'Stews', 'Drinks' ].map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setActiveCategory(cat)}
                                                    className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all pb-2 ${activeCategory === cat ? 'text-primary border-b-2 border-primary' : 'text-white/40 hover:text-white'}`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {filteredMenu.map((item) => (
                                            <div key={item.id} className="group relative bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 border-l-4 hover:border-l-primary hover:border-primary/30 rounded-r-2xl rounded-l-none p-5 transition-all duration-500">
                                                <div className="flex items-center gap-5">
                                                    <div className="relative size-20 flex-none rounded-xl overflow-hidden shadow-2xl group-hover:scale-110 transition-transform duration-500 ring-1 ring-white/10 group-hover:ring-primary/50">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" onClick={() => addToCart(item.id)}>
                                                            <span className="material-symbols-outlined text-white text-xl">add_shopping_cart</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1 gap-2">
                                                            <h4 className="text-base font-bold text-white/90 group-hover:text-primary transition-colors truncate">{item.name}</h4>
                                                            <span className="text-sm font-black text-primary flex-none">₹{item.price}</span>
                                                        </div>
                                                        <p className="text-[9px] text-white/40 uppercase tracking-widest mb-2">{item.category}</p>
                                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
                                                            <button
                                                                onClick={() => addToCart(item.id)}
                                                                className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tighter bg-primary text-background-dark px-3 py-1 rounded-sm hover:brightness-110 active:scale-95 transition-all"
                                                            >
                                                                Add {cart[ item.id ] > 0 && <span className="bg-background-dark text-white px-1.5 rounded-full ml-1">{cart[ item.id ]}</span>}
                                                            </button>
                                                            <button className="text-[8px] font-black uppercase tracking-tighter border border-white/10 text-white/60 px-2 py-1 rounded-sm hover:bg-white/10 transition-colors">Details</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: AI & Hanok Sidebar */}
                                <div className="w-full lg:w-[400px] flex flex-col gap-10">
                                    {/* AI Prediction Widget */}
                                    <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4">
                                            <span className="flex size-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                <span className="relative inline-flex rounded-full size-3 bg-primary"></span>
                                            </span>
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="material-symbols-outlined text-primary text-2xl">neurology</span>
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Neural Recommendation</span>
                                            </div>
                                            <div className="flex gap-4 items-center mb-6">
                                                <div className="size-24 rounded-full border-4 border-primary/30 p-1">
                                                    <img src="https://images.unsplash.com/photo-1594221708779-948211442050?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover rounded-full" alt="Rec" />
                                                </div>
                                                <div>
                                                    <h5 className="text-xl font-bold text-white italic">Bulgogi Ribeye</h5>
                                                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">98% Match for your taste</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => addToCart('m6')}
                                                className="w-full bg-primary/10 border border-primary/30 hover:bg-primary hover:text-background-dark text-primary py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all"
                                            >
                                                Accept Recommendation
                                            </button>
                                        </div>
                                        <div className="absolute bottom-[-20%] right-[-10%] opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                                            <span className="material-symbols-outlined text-[200px]">cognition</span>
                                        </div>
                                    </div>

                                    {/* Hanok Visual Vault */}
                                    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-white/60 text-xl">camera_outdoor</span>
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Hanok Visual Vault</span>
                                            </div>
                                            <span className="text-[9px] text-primary font-bold uppercase tracking-widest px-2 py-1 bg-primary/10 rounded">LIVE_FEED</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="aspect-square bg-white/5 rounded-xl overflow-hidden group cursor-pointer">
                                                <img src="https://images.unsplash.com/photo-1543326175-3b608882416c?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-500 scale-110 group-hover:scale-100" />
                                            </div>
                                            <div className="aspect-square bg-white/5 rounded-xl overflow-hidden group cursor-pointer">
                                                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-500 scale-110 group-hover:scale-100" />
                                            </div>
                                            <div className="aspect-square bg-white/5 rounded-xl overflow-hidden group cursor-pointer">
                                                <img src="https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-500 scale-110 group-hover:scale-100" />
                                            </div>
                                            <div className="aspect-square bg-white/5 rounded-xl overflow-hidden group cursor-pointer flex items-center justify-center border border-dashed border-white/20 hover:border-primary/50 transition-colors">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-primary transition-colors">Full Gallery</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ML Model Diagnostic */}
                                    <div className="border border-white/5 rounded-3xl p-8 bg-black/40">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="material-symbols-outlined text-primary text-xl animate-pulse">analytics</span>
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">ML Engine Diagnostic</span>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-white/5 h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full w-[85%] animate-[pulse_2s_infinite]"></div>
                                            </div>
                                            <div className="flex justify-between text-[9px] font-bold text-white/30 uppercase tracking-widest">
                                                <span>Sensory Accuracy</span>
                                                <span className="text-primary">85.4%</span>
                                            </div>
                                            <div className="pt-4 border-t border-white/5">
                                                <p className="text-[8px] font-mono text-primary/60 leading-relaxed uppercase">
                                                    &gt; Processing taste clusters...<br />
                                                    &gt; analyzing user sentiment...<br />
                                                    &gt; updating preference matrix...<br />
                                                    &gt; neural sync complete.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Simplified Footer */}
                <footer className="h-24 lg:h-32 mt-auto flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-col items-center gap-2 animate-pulse">
                        <span className="text-[13px] text-white/40 font-black tracking-[0.4em] uppercase">Scroll to view Full Menu</span>
                        <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"></div>
                    </div>
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                </footer>
            </div>
        </div>
    );
};

export default Menu3D;
