import React from 'react';
import GrillHeroScene from './GrillHeroScene';

interface HomePageProps {
    onOrderNow: () => void;
    onMenu: () => void;
    onReservations: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOrderNow, onMenu, onReservations }) => {
    return (
        <header className="relative w-screen h-screen flex flex-col overflow-hidden bg-[#050505] home-cinematic">
            {/* Background Layer - 3D Cinematic Grill Scene */}
            <GrillHeroScene />

            {/* Navigation Bar - Now Fullscreen/Full-width */}
            <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between border-b border-white/5 glassmorphism">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="relative size-12 text-primary fiery-logo-glow">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 5C50 5 35 25 35 45C35 65 50 85 50 85C50 85 65 65 65 45C65 25 50 5 50 5Z" fill="currentColor" fillOpacity="0.2"></path>
                            <path d="M50 15C50 15 40 30 40 45C40 60 50 75 50 75C50 75 60 60 60 45C60 30 50 15 50 15Z" fill="currentColor" fillOpacity="0.5"></path>
                            <path d="M50 25C50 25 45 35 45 45C45 55 50 65 50 65C50 65 55 55 55 45C55 35 50 25 50 25Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-white font-display text-2xl font-bold tracking-[0.25em] uppercase">Hanok</span>
                        <span className="text-primary font-display text-xs tracking-[0.5em] uppercase font-bold">Grill</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-12">
                    <a className="text-xs uppercase tracking-[0.3em] font-bold text-white/80 hover:text-primary transition-all hover:tracking-[0.4em] cursor-pointer" onClick={onOrderNow}>Order Now</a>
                    <a className="text-xs uppercase tracking-[0.3em] font-bold text-white/80 hover:text-primary transition-all hover:tracking-[0.4em] cursor-pointer" onClick={onMenu}>Menu</a>
                    <a className="text-xs uppercase tracking-[0.3em] font-bold text-white/80 hover:text-primary transition-all hover:tracking-[0.4em] cursor-pointer" href="#">Private Dining</a>
                    <a className="text-xs uppercase tracking-[0.3em] font-bold text-white/80 hover:text-primary transition-all hover:tracking-[0.4em] cursor-pointer" href="#">Locations</a>
                </div>

                <div className="flex items-center gap-6">
                    <button className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-white/90 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">account_circle</span>
                        Login
                    </button>
                    <button
                        className="bg-primary hover:bg-white text-background-dark px-10 py-3 rounded-none text-xs uppercase tracking-[0.2em] font-black transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(238,189,43,0.4)]"
                        onClick={onReservations}
                    >
                        Book Table
                    </button>
                </div>
            </nav>

            {/* Main Content - Buttons only, typography is in 3D */}
            <main className="relative z-20 flex-1 flex flex-col items-center justify-end text-center px-4 pb-32">
                <div className="space-y-8 max-w-4xl">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <button
                            className="group flex items-center gap-6 bg-black/40 backdrop-blur-md border-2 border-primary shadow-[0_0_30px_rgba(238,189,43,0.3)] hover:shadow-[0_0_50px_rgba(238,189,43,0.5)] px-16 py-4 rounded transition-all transform hover:-translate-y-1"
                            onClick={onMenu}
                        >
                            <span className="text-xl uppercase tracking-[0.4em] font-black text-primary transition-colors">Order Now</span>
                            <span className="material-symbols-outlined text-primary group-hover:translate-x-3 transition-transform text-3xl font-bold">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-20 w-full px-12 pb-12 flex items-end justify-between">
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
                <div className="flex flex-col items-center gap-4 mx-auto">
                    <span className="text-[10px] uppercase tracking-[0.6em] text-primary/80 font-bold">Scroll</span>
                    <div className="scroll-line"></div>
                </div>
                <div className="hidden lg:flex flex-col items-end gap-3 text-right">
                    <div className="flex items-center gap-2 text-primary">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Seoul Cyberpunk District</span>
                    </div>
                    <div className="text-[10px] text-white/40 uppercase tracking-[0.25em]">Flagship Store | Open 18:00 - 04:00</div>
                </div>
            </footer>

            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 pointer-events-none z-10"></div>
        </header >
    );
};

export default HomePage;
