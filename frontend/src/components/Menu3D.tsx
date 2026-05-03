import React, { useRef, useState } from 'react';
import './Menu3D.css';

export interface Menu3DProps {
    onBack: () => void;
    cart: Record<string, number>;
    addToCart: (id: string) => void;
    onOpenTerminal: () => void;
    onOpenAI: () => void;
    onHistory: () => void;
}

const Menu3D: React.FC<Menu3DProps> = ({
    onBack,
    cart,
    addToCart,
    onOpenTerminal,
    onOpenAI,
    onHistory
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [ activeCategory, setActiveCategory ] = useState('All');
    const [ selectedDish, setSelectedDish ] = useState<any>(null);

    const fullMenu = [
        {
            id: 'm1', name: 'Gimbap', price: 299, category: 'Appetizers', image: '/gimbab.jpeg',
            subtitle: 'Tradition', description: 'Hand-rolled harmony of seasoned rice, vibrant vegetables, and cured beef.',
            tags: [ '85°C Serv.', '12 min prep' ], isVeg: false, servingSize: '1 Person', quantity: '8 Pieces'
        },
        {
            id: 'm2', name: 'Mandu', price: 349, category: 'Appetizers', image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=400',
            subtitle: 'Handmade', description: 'Steam-exploded dumplings filled with seasoned pork and spring onions.',
            tags: [ 'Steamed', 'Juicy' ], isVeg: false, servingSize: '1-2 People', quantity: '6 Pieces'
        },
        {
            id: 'm3', name: 'Tteokbokki', price: 329, category: 'Appetizers', image: '/ricecakes.jpeg',
            subtitle: 'Glow of Seoul', description: 'Chewy rice cylinders in a volcanic gochujang and honey glaze.',
            tags: [ 'Spicy High', '15 min prep' ], isVeg: true, servingSize: '1-2 People', quantity: '1 Bowl'
        },
        {
            id: 'm4', name: 'Ramen', price: 399, category: 'Main', image: '/ramen.jpeg',
            subtitle: 'Aged 48h Broth', description: 'Intense bone marrow reduction, house noodles, and aged chili paste.',
            tags: [ 'Intense', 'Signature' ], isVeg: false, servingSize: '1 Person', quantity: '1 Large Bowl'
        },
        {
            id: 'm5', name: 'Bibimbap', price: 499, category: 'Main', image: '/bibimbap.jpeg',
            subtitle: 'The Art of Mix', description: 'Sizzling dolsot bowl with colorful vegetables and house gochujang.',
            tags: [ 'Balanced', 'Popular' ], verified: true, isVeg: true, servingSize: '1 Person', quantity: '1 Stone Bowl'
        },
        {
            id: 'm6', name: 'Bulgogi', price: 699, category: 'Main', image: '/bulgogi.jpg',
            subtitle: 'Traditional BBQ', description: 'Thinly sliced ribeye steeped in a luxury pear and garlic marinade.',
            tags: [ 'Premium Beef', '20 min prep' ], isVeg: false, servingSize: '2 People', quantity: '250g Beef'
        },
        {
            id: 'm7', name: 'Japchae', price: 429, category: 'Main', image: '/palillos.jpeg',
            subtitle: 'Crystal Harmony', description: 'Sweet and savory stir-fried glass noodles with forest mushrooms.',
            tags: [ 'Savory', 'Festive' ], isVeg: true, servingSize: '2 People', quantity: '1 Plate'
        },
        {
            id: 'm8', name: 'Kimchi Jjigae', price: 449, category: 'Stews', image: '/kimchi.jpeg',
            subtitle: 'Soul Stew', description: 'Traditional spicy soup with aged kimchi, silken tofu, and pork belly.',
            tags: [ 'Spicy', 'Winter Soul' ], isVeg: false, servingSize: '1-2 People', quantity: '1 Pot'
        },
        {
            id: 'm9', name: 'Sundubu Jjigae', price: 429, category: 'Stews', image: '/Sundubu-Jjigae.jpg',
            subtitle: 'Soft Silken', description: 'Cloud-like tofu swirling in a spicy, oceanic broth with fresh seafood.',
            tags: [ 'Classic Stew', '15 min prep' ], isVeg: false, servingSize: '1-2 People', quantity: '1 Pot'
        },
        {
            id: 'm10', name: 'Korean FC', price: 549, category: 'Main', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400',
            subtitle: 'Cloud Crunch', description: 'Double-fried perfection glazed in garlic-soy or spicy gochujang.',
            tags: [ 'Extra Crispy', 'Sharing' ], isVeg: false, servingSize: '2 People', quantity: '8 Pieces'
        },
        {
            id: 'm11', name: 'Pajeon', price: 399, category: 'Appetizers', image: '/pajeon.jpg',
            subtitle: 'Crispy Rain', description: 'Savory pancake with scallions and assorted seafood.',
            tags: [ 'Crispy', 'Savory' ], isVeg: false, servingSize: '2 People', quantity: '1 Pancake'
        },
        {
            id: 'm12', name: 'Kimchi Fried Rice', price: 479, category: 'Main', image: '/kimchifriendrice.jpeg',
            subtitle: 'Street Classic', description: 'Wok-fired rice with spicy kimchi, spam, and a sunny-side up egg.',
            tags: [ 'Wok-hei', 'Comfort' ], isVeg: false, servingSize: '1 Person', quantity: '1 Bowl'
        },
        {
            id: 'm13', name: 'Soju Original', price: 499, category: 'Drinks', image: '/soju.jpeg',
            subtitle: 'Spirit of Korea', description: 'Crystal clear distilled rice liquor, best served ice cold.',
            tags: [ 'Chilled', '17% ABV' ], isVeg: true, servingSize: '2-3 People', quantity: '360ml Bottle'
        },
        {
            id: 'm14', name: 'Barley Tea', price: 149, category: 'Drinks', image: '/barley tea.jpg',
            subtitle: 'Daily Brew', description: 'Roasted barley infusion, nutty and caffeine-free comfort.',
            tags: [ 'Hot/Cold', 'Healthy' ], isVeg: true, servingSize: '1 Person', quantity: '1 Cup'
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
        <div ref={wrapperRef} className="menu-3d-wrapper text-white min-h-screen w-full fixed inset-0 z-[100] bg-background-dark font-sans overflow-y-auto no-scrollbar">
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
                {/* Header - Now Sticky */}
                <header className="sticky top-0 z-50 flex items-center justify-between px-10 py-3 border-b border-white/5 backdrop-blur-xl bg-background-dark/80">
                    <div className="flex items-center gap-10">
                        <button
                            onClick={onBack}
                            className="group flex items-center text-white/40 hover:text-primary transition-all"
                        >
                            <span className="material-symbols-outlined text-2xl group-hover:-translate-x-1 transition-transform">keyboard_backspace</span>
                        </button>

                        <div className="flex items-center gap-4 group cursor-pointer" onClick={onBack}>
                            <div className="relative size-5 text-primary fiery-logo-glow">
                                <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M50 5C50 5 35 25 35 45C35 65 50 85 50 85C50 85 65 65 65 45C65 25 50 5 50 5Z" fill="currentColor" fillOpacity="0.2"></path>
                                    <path d="M50 15C50 15 40 30 40 45C40 60 50 75 50 75C50 75 60 60 60 45C60 30 50 15 50 15Z" fill="currentColor" fillOpacity="0.5"></path>
                                    <path d="M50 25C50 25 45 35 45 45C45 55 50 65 50 65C50 65 55 55 55 45C55 35 50 25 50 25Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-white font-display text-sm font-bold tracking-[0.2em] uppercase">Hanok</span>
                                <span className="text-primary font-display text-[7px] tracking-[0.4em] uppercase font-bold">Grill</span>
                            </div>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-12">
                        <a
                            className="text-white/60 hover:text-primary transition-colors text-xs font-bold tracking-[0.2em] uppercase cursor-pointer"
                            onClick={(e) => { e.preventDefault(); document.querySelector('.specials-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                        >
                            Our Specials
                        </a>
                        <a
                            className="text-white/60 hover:text-primary transition-colors text-xs font-bold tracking-[0.2em] uppercase cursor-pointer"
                            onClick={(e) => { e.preventDefault(); document.getElementById('entire-menu')?.scrollIntoView({ behavior: 'smooth' }); }}
                        >
                            Menu
                        </a>
                        <a
                            className="text-white/60 hover:text-primary transition-colors text-xs font-bold tracking-[0.2em] uppercase cursor-pointer"
                            onClick={(e) => { e.preventDefault(); onOpenAI(); }}
                        >
                            AI Recommendations
                        </a>
                        <a className="text-white/60 hover:text-primary transition-colors text-xs font-bold tracking-[0.2em] uppercase cursor-pointer" onClick={(e) => { e.preventDefault(); onHistory(); }}>History</a>
                    </nav>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end mr-2">
                            <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Total Order</span>
                            <span className="text-xl font-bold tracking-tighter text-white">₹{getTotalPrice()}</span>
                        </div>
                        <button
                            onClick={onOpenTerminal}
                            className="group relative flex items-center gap-2 bg-primary text-background-dark px-5 py-1.5 rounded-full hover:bg-white transition-all duration-500 shadow-[0_0_20px_rgba(238,189,43,0.3)]"
                        >
                            <span className="material-symbols-outlined font-bold text-lg">shopping_cart</span>
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Order Terminal</span>
                            {getTotalItems() > 0 && (
                                <span className="absolute -top-1 -right-1 size-5 bg-white border-2 border-primary text-primary text-[9px] font-black rounded-full flex items-center justify-center animate-bounce shadow-xl">
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
                    <div className="relative z-10 w-full mb-32 specials-section">
                        <div className="text-center mb-2">
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
                            className="flex overflow-x-auto no-scrollbar gap-8 pb-20 pt-4 px-12 items-center overflow-y-visible"
                        >
                            {fullMenu.filter(item => item.category !== 'Drinks').map((item) => (
                                <div key={item.id} className="relative flex-none group transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                                    <div className="absolute -inset-12 bg-primary/15 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="w-[220px] group-hover:w-[280px] h-[340px] group-hover:h-[420px] bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-primary/40 flex flex-col items-center p-5 group-hover:pb-5 group-hover:px-6 group-hover:pt-6 transition-all duration-700 shadow-[0_0_50px_rgba(238,189,43,0)] group-hover:shadow-[0_40px_100px_rgba(238,189,43,0.15)] justify-between">
                                        {(item as any).verified && (
                                            <div className="absolute top-5 right-5 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                                                <span className="material-symbols-outlined text-sm font-bold">verified</span>
                                            </div>
                                        )}
                                        {(item as any).star && (
                                            <div className="absolute top-5 right-5 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                                                <span className="material-symbols-outlined text-sm font-bold">star</span>
                                            </div>
                                        )}
                                        <div className="relative w-full h-[120px] group-hover:h-[150px] mb-3 flex items-center justify-center transition-all duration-700 overflow-hidden rounded-full flex-shrink-0">
                                            <img
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.9)] ring-4 ring-white/5 group-hover:ring-primary/25 scale-110 group-hover:scale-125 transition-all duration-700"
                                                src={item.image}
                                            />
                                        </div>
                                        <div className="text-center w-full flex flex-col items-center flex-1">
                                            <p className="text-[8px] text-primary font-black tracking-[0.4em] uppercase mb-1 opacity-60 group-hover:opacity-100 transition-opacity">{(item as any).subtitle}</p>
                                            <h4 className="text-lg group-hover:text-xl font-bold mb-1 italic font-display transition-all duration-700 leading-tight">{item.name}</h4>
                                            <p className="text-white/50 group-hover:text-white/80 text-[9px] group-hover:text-[10px] leading-relaxed mb-auto font-light transition-all duration-700 max-w-[90%]">{(item as any).description}</p>
                                            <div className="flex justify-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity pt-3 w-full">
                                                {(item as any).tags?.map((tag: string) => (
                                                    <div key={tag} className="text-[7px] text-white/50 border border-white/10 px-1.5 py-1 uppercase font-bold tracking-[0.2em] whitespace-nowrap">{tag}</div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Price and Action Buttons for Specials */}
                                        <div className="flex-shrink-0 w-full pt-3 flex flex-col gap-2 mt-auto">
                                            <div className="flex items-center justify-between px-1">
                                                <span className="text-xl font-black text-primary">₹{item.price}</span>
                                                <div className="flex gap-1">
                                                    {(item as any).tags?.slice(0, 1).map((tag: string) => (
                                                        <div key={tag} className="text-[7px] text-white/40 border border-white/10 px-1.5 py-0.5 uppercase font-bold tracking-[0.2em]">{tag}</div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center bg-white/10 rounded-xl border border-primary/20 overflow-hidden shadow-xl shadow-black/20">
                                                <button
                                                    onClick={() => addToCart(item.id)}
                                                    className="flex-[1.5] bg-primary hover:bg-white text-background-dark py-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 border-r border-background-dark/20"
                                                >
                                                    <span className="material-symbols-outlined text-sm">add</span>
                                                    Add {cart[ item.id ] > 0 && <span className="bg-background-dark text-white size-4 rounded-full flex items-center justify-center text-[8px] ml-0.5">{cart[ item.id ]}</span>}
                                                </button>
                                                <button
                                                    onClick={() => setSelectedDish(item)}
                                                    className="flex-1 text-white/80 hover:bg-white/10 hover:text-white py-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center"
                                                >
                                                    Detail
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
                        <span className="text-[10px] uppercase tracking-[0.6em] text-white font-bold">scroll to view menu..</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent animate-bounce"></div>
                    </div>

                    {/* Entire Menu Section with AI Sidebar */}
                    <div id="entire-menu" className="relative z-10 w-full px-4 lg:px-2 pt-12 pb-32 bg-background-dark/50 backdrop-blur-2xl border-t border-white/5 mt-6">
                        <div className="w-full mx-auto">
                            <div className="flex flex-col lg:flex-row gap-16">

                                {/* Left: Main Menu Grid */}
                                <div className="flex-1">
                                    <div className="flex flex-col lg:flex-row lg:items-end justify-start mb-10 gap-6 lg:gap-4">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={onBack}
                                                className="size-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary transition-all group"
                                                title="Back to Home"
                                            >
                                                <span className="material-symbols-outlined text-3xl group-hover:-translate-x-1 transition-transform">keyboard_backspace</span>
                                            </button>
                                            <button
                                                onClick={() => wrapperRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                                                className="size-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary transition-all group"
                                                title="Jump to Top"
                                            >
                                                <span className="material-symbols-outlined text-3xl group-hover:-translate-y-1 transition-transform">keyboard_arrow_up</span>
                                            </button>
                                            <div>
                                                <span className="text-primary font-black text-[10px] tracking-[0.5em] uppercase mb-4 block">Selection</span>
                                                <h3 className="text-6xl font-bold font-display text-white/90">THE MENU</h3>
                                            </div>
                                        </div>
                                        <div className="flex gap-6 border-b border-white/10 pb-2 flex-nowrap overflow-x-auto no-scrollbar scroll-smooth">
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

                                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mt-6">
                                        {filteredMenu.map((item) => (
                                            <div key={item.id} className="group relative bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 border-b-2 hover:border-b-primary hover:border-primary/30 rounded-xl p-3 transition-all duration-500 flex flex-col gap-3">
                                                <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform duration-500 ring-1 ring-white/10 group-hover:ring-primary/50">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" onClick={() => addToCart(item.id)}>
                                                        <span className="material-symbols-outlined text-white text-base">add</span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 flex flex-col gap-2">
                                                    <div className="flex items-start justify-between gap-1.5">
                                                        <h4 className="text-[12px] font-bold text-white/90 group-hover:text-primary transition-colors leading-tight min-h-[2em]">{item.name}</h4>
                                                        <div className={`border ${(item as any).isVeg ? 'border-green-500' : 'border-red-500'} size-2.5 p-[0.5px] flex items-center justify-center rounded-[1px] flex-none mt-0.5`}>
                                                            <div className={`size-1 rounded-full ${(item as any).isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[11px] font-black text-primary">₹{item.price}</span>
                                                        <span className="text-[7px] text-white/30 uppercase tracking-widest">{item.category}</span>
                                                    </div>
                                                    <div className="mt-auto flex items-center bg-white/10 rounded-lg border border-primary/20 overflow-hidden relative z-10 w-full shadow-lg shadow-black/20">
                                                        <button
                                                            onClick={() => addToCart(item.id)}
                                                            className="flex-[1.2] flex items-center justify-center gap-1.5 px-2 py-2 text-[8px] font-black uppercase tracking-tighter bg-primary text-background-dark hover:brightness-110 active:scale-95 transition-all border-r border-background-dark/20"
                                                        >
                                                            <span className="material-symbols-outlined text-[14px]">add</span>
                                                            Add {cart[ item.id ] > 0 && <span className="bg-background-dark text-white px-1 rounded-full text-[7px] ml-0.5">{cart[ item.id ]}</span>}
                                                        </button>
                                                        <button
                                                            onClick={() => setSelectedDish(item)}
                                                            className="flex-1 px-2 py-2 text-[8px] font-black uppercase tracking-widest text-white/80 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center"
                                                        >
                                                            Detail
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: AI Recommendation Sidebar */}
                                <div className="w-full lg:w-[320px] flex flex-col gap-8">
                                    {/* AI Recommendation Widget */}
                                    <div className="bg-primary/10 border-2 border-primary/40 rounded-2xl p-5 relative overflow-hidden group cursor-pointer hover:bg-primary/20 transition-all duration-500 shadow-[0_20px_50px_rgba(238,189,43,0.1)]" onClick={() => onOpenAI()}>
                                        <div className="absolute top-0 right-0 p-3">
                                            <span className="flex size-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                <span className="relative inline-flex rounded-full size-2.5 bg-primary"></span>
                                            </span>
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Neural Concierge</span>
                                            </div>
                                            <div className="mb-6">
                                                <h5 className="text-xl font-bold text-white mb-2 font-display italic tracking-wide">GET PERSONALIZED PICKS</h5>
                                                <p className="text-[11px] text-white/70 leading-relaxed">Answer 4 quick questions and let our AI recommend the perfect dishes.</p>
                                            </div>
                                            <button
                                                className="w-full bg-primary text-background-dark hover:bg-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/30"
                                            >
                                                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                                                Sync Interface
                                            </button>
                                        </div>
                                        <div className="absolute bottom-[-10%] right-[-10%] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                                            <span className="material-symbols-outlined text-[180px]">cognition</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Simplified Footer */}
                <footer className="h-24 lg:h-32 mt-auto flex flex-col items-center justify-center gap-4">

                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                </footer>
            </div>

            {/* Dish Details Modal */}
            {
                selectedDish && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedDish(null)}>
                        <div className="bg-background-dark/95 border border-white/10 rounded-3xl max-w-lg w-full p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.5)] transform animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setSelectedDish(null)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-2xl">close</span>
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="relative size-40 rounded-full mb-6 p-1 bg-gradient-to-br from-white/10 to-white/0">
                                    <img src={selectedDish.image} alt={selectedDish.name} className="w-full h-full object-cover rounded-full shadow-2xl" />
                                </div>

                                <h3 className="text-4xl font-display font-bold text-white mb-2 italic">{selectedDish.name}</h3>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-primary font-black text-xl">₹{selectedDish.price}</span>
                                    <span className="text-white/20">|</span>
                                    <span className="text-white/60 text-xs uppercase tracking-widest">{selectedDish.category}</span>
                                </div>

                                <p className="text-white/70 text-base leading-relaxed mb-8 max-w-sm">{selectedDish.description}</p>

                                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center group hover:bg-white/10 transition-colors">
                                        <div className="mb-2 text-white/40 group-hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">group</span>
                                        </div>
                                        <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-1">Serving Size</span>
                                        <span className="text-white font-bold">{selectedDish.servingSize}</span>
                                    </div>
                                    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center group hover:bg-white/10 transition-colors">
                                        <div className="mb-2 text-white/40 group-hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">restaurant</span>
                                        </div>
                                        <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-1">Quantity/Portion</span>
                                        <span className="text-white font-bold">{selectedDish.quantity}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => { addToCart(selectedDish.id); setSelectedDish(null); }}
                                    className="w-full bg-primary hover:bg-white text-background-dark font-black py-4 rounded-xl uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(238,189,43,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                                >
                                    <span className="material-symbols-outlined">add_shopping_cart</span>
                                    Add to Order
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Menu3D;
