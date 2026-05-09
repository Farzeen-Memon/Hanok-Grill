import React from 'react';
import GrillHeroScene from './GrillHeroScene';
import './HomePage.css';

interface HomePageProps {
    onMenu: () => void;
    onReservations: () => void;
    onAI?: () => void;
    initialScrollSection?: string | null;
}

const HomePage: React.FC<HomePageProps> = ({ onMenu, onReservations, onAI, initialScrollSection }) => {
    const [ isScrolled, setIsScrolled ] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        if (initialScrollSection) {
            setTimeout(() => {
                const element = document.getElementById(initialScrollSection);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [ initialScrollSection ]);

    return (
        <div className="bg-[#050505] overflow-y-auto no-scrollbar scroll-smooth">
            <header className="relative w-screen h-screen flex flex-col overflow-hidden bg-[#050505] home-cinematic">
                {/* Background Layer - 3D Cinematic Grill Scene */}
                <GrillHeroScene />

                {/* Navigation Bar - Increased z-index and opacity control */}
                <nav className={`fixed top-0 left-0 w-full z-[1000] px-4 md:px-8 py-3 flex items-center justify-between border-b border-white/5 transition-all duration-500 ${isScrolled ? 'bg-[#080808]/95 backdrop-blur-3xl py-2' : 'glassmorphism'}`}>
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="relative size-6 text-[#eebd2b] opacity-90 transition-opacity group-hover:opacity-100">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 5C50 5 35 25 35 45C35 65 50 85 50 85C50 85 65 65 65 45C65 25 50 5 50 5Z" fill="currentColor" fillOpacity="0.15"></path>
                                <path d="M50 15C50 15 40 30 40 45C40 60 50 75 50 75C50 75 60 60 60 45C60 30 50 15 50 15Z" fill="currentColor" fillOpacity="0.4"></path>
                                <path d="M50 25C50 25 45 35 45 45C45 55 50 65 50 65C50 65 55 55 55 45C55 35 50 25 50 25Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-[#FAD14D] font-display text-base font-bold tracking-[0.35em] uppercase">Hanok</span>
                            <span className="text-white/60 font-display text-[8px] tracking-[0.8em] uppercase font-bold mt-1">Grill</span>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-16">
                        <button className="text-xs uppercase tracking-[0.3em] font-bold text-white/80 hover:text-primary transition-all hover:tracking-[0.4em] cursor-pointer bg-transparent border-none" onClick={onMenu}>Our Specials</button>
                        <button className="text-xs uppercase tracking-[0.3em] font-bold text-white/80 hover:text-primary transition-all hover:tracking-[0.4em] cursor-pointer bg-transparent border-none" onClick={onMenu}>Menu</button>
                        <button className="text-xs uppercase tracking-[0.3em] font-bold text-white/80 hover:text-primary transition-all hover:tracking-[0.4em] cursor-pointer bg-transparent border-none" onClick={onAI}>
                            AI Recommendations
                        </button>
                        <button className="text-xs uppercase tracking-[0.3em] font-bold text-white/80 hover:text-primary transition-all hover:tracking-[0.4em] cursor-pointer bg-transparent border-none"
                            onClick={(e) => { e.preventDefault(); document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' }); }}>History</button>
                    </div>

                    <div className="flex items-center gap-6">

                        <button
                            className="bg-primary hover:bg-white text-background-dark px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-black transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(179,139,47,0.3)]"
                            onClick={onReservations}
                        >
                            Book Table
                        </button>
                    </div>
                </nav>

                {/* Main Content — Now Aligned Left in the black space */}
                <main className="relative z-20 flex-1 flex flex-col justify-center items-start text-left px-6 md:px-[10vw] pt-[10vh] md:pt-[12vh] pb-16 w-full md:max-w-[80%]">
                    <div className="space-y-6">
                        <p style={{ fontSize: '0.65rem', letterSpacing: '0.7em', color: '#A89C85', textTransform: 'uppercase', fontWeight: 600 }}>
                            Seoul · Established 1826
                        </p>
                        <h1
                            className="font-display font-medium leading-tight uppercase"
                            style={{
                                fontSize: 'clamp(3rem, 7vw, 7.5rem)',
                                color: '#FAD14D', /* Brighter gold for better visibility */
                                letterSpacing: '0.35em',
                                textShadow: '0 0 30px rgba(250, 209, 77, 0.2)', /* Subtle glow for clarity */
                                opacity: 1
                            }}
                        >
                            Hanok<br />
                            <span className="grill-text">
                                Grill
                            </span>
                        </h1>
                        <div className="flex flex-col gap-4 mt-10">
                            <p style={{ fontSize: '0.7rem', letterSpacing: '0.6em', color: '#A89C85', textTransform: 'uppercase', fontWeight: 300 }}>
                                Mastery of Traditional Fire
                            </p>
                            <p className="font-display italic" style={{ fontSize: '0.9rem', letterSpacing: '0.15em', color: '#B8A890', opacity: 0.8, marginTop: '0.5rem' }}>
                                “An ember of heritage, alive in every dish.”
                            </p>
                        </div>
                    </div>

                    <div style={{ marginTop: '5.5rem' }}>
                        <button
                            onClick={onMenu}
                            className="luxury-button"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                border: '1px solid rgba(250, 209, 77, 0.4)',
                                padding: '0.9rem 2rem',
                                background: 'transparent',
                                color: '#FAD14D',
                                fontSize: '0.65rem',
                                letterSpacing: '0.4em',
                                textTransform: 'uppercase',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                            }}
                        >
                            <span>Explore Menu</span>
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem', opacity: 0.8 }}>east</span>
                        </button>
                    </div>
                </main>

                {/* Footer */}

                <footer className="relative z-20 w-full px-6 md:px-12 pb-12 flex items-end justify-between">
                    <div className="hidden lg:flex flex-col gap-6 text-white/30">
                        <a className="hover:text-primary transition-colors flex items-center gap-3 text-[10px] uppercase tracking-widest" href="#">
                            <span className="material-symbols-outlined text-lg">public</span>
                            <span>Web</span>
                        </a>
                        <a className="hover:text-primary transition-colors flex items-center gap-3 text-[10px] uppercase tracking-widest" href="#">
                            <span className="material-symbols-outlined text-lg">camera</span>
                            <span>Instagram</span>
                        </a>
                        <div className="h-16 w-[1px] bg-gradient-to-b from-primary/40 to-transparent ml-[9px]"></div>
                    </div>
                    <div className="flex flex-col items-center gap-4 mx-auto cursor-pointer group" onClick={() => document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' })}>
                        <span className="text-[10px] uppercase tracking-[0.6em] text-primary/80 font-bold group-hover:text-primary transition-colors">Scroll</span>
                        <div className="scroll-line group-hover:h-24 transition-all duration-500"></div>
                    </div>
                    <div className="hidden lg:flex flex-col items-end gap-3 text-right">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">Seoul Historic District</span>
                        </div>
                        <div className="text-[10px] text-white/40 uppercase tracking-[0.25em]">Flagship Store | Open 18:00 - 04:00</div>
                    </div>
                </footer>

                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 pointer-events-none z-10"></div>
            </header>

            {/* History Section */}
            <section id="history" className="relative min-h-screen w-full bg-[#050505] home-cinematic py-20 md:py-32 px-6 md:px-12 overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[20%] right-[-10%] writing-vertical-rl text-[120px] font-black tracking-[1em] text-white">우리 역사</div>
                    <div className="absolute bottom-[10%] left-[5%] writing-vertical-rl text-[80px] font-black tracking-[0.5em] text-primary/30">한옥 그릴</div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
                    <div className="space-y-8 md:space-y-12">
                        <div className="space-y-4">
                            <span className="text-primary font-black text-xs tracking-[0.6em] uppercase block">Our Heritage</span>
                            <h2 className="text-4xl md:text-8xl font-bold font-display text-white/90 leading-tight">
                                The Spirit of <br />
                                <span className="text-primary italic">Hanok</span>
                            </h2>
                        </div>

                        <div className="space-y-8 text-white/60 text-lg leading-relaxed font-light">
                            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                                Founded in the heart of Seoul's historic district, Hanok Grill was born from a singular vision: to preserve the soul of traditional Korean architecture while pushing the boundaries of modern gastronomy.
                            </p>
                            <p>
                                Our journey began in a meticulously restored 19th-century Hanok, where the scent of aged pine and glowing charcoal created a sanctuary for those seeking more than just a meal. Today, we bring that same reverence for tradition to a cyberpunk future, where every dish is a bridge between eras.
                            </p>
                        </div>

                        <div className="flex items-center gap-12 pt-8">
                            <div className="text-center">
                                <span className="block text-4xl font-bold text-primary mb-1">198</span>
                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">Heritage Years</span>
                            </div>
                            <div className="w-[1px] h-12 bg-white/10"></div>
                            <div className="text-center">
                                <span className="block text-4xl font-bold text-primary mb-1">24</span>
                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">Global Awards</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/5] rounded-none border border-white/10 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[#0a0a0a]">
                                <img
                                    src="/history.jpg"
                                    alt="Traditional Hanok Architecture"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                            <div className="absolute bottom-10 left-10 right-10">
                                <h3 className="text-2xl font-bold text-white mb-2">Heritage Sanctuary</h3>
                                <p className="text-xs text-white/50 uppercase tracking-widest leading-loose">Meticulously restored pine timber & stone foundations, where time slows down.</p>
                            </div>
                        </div>

                        <div className="absolute -bottom-12 -right-12 size-48 border border-primary/20 backdrop-blur-3xl hidden xl:flex items-center justify-center p-8 bg-black/40">
                            <span className="text-[10px] text-primary font-black uppercase tracking-[0.4em] leading-relaxed text-center">Preserving the soul of Korea since 1826</span>
                        </div>
                    </div>
                </div>

                {/* Decorative Grid Lines */}
                <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none"></div>
            </section>
        </div>
    );
};

export default HomePage;
