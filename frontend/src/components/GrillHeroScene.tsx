import React from 'react';
import './GrillHeroScene.css';


const GrillHeroScene: React.FC = () => {
    // Petals strictly on the far right moon-side (65% to 105% of width)
    // Avoiding the center and text area entirely
    const petals = Array.from({ length: 35 }).map((_, i) => {
        const startLeft = 65 + Math.random() * 40; // Concentrated on moon-side
        const xDrift = -2 + Math.random() * -8; // Tighter drift to stay on the moon side
        const shades = [ '#B21F2D', '#9A1B28', '#D43F4D', '#7A1018', '#630D14' ]; // Varied deep muted reds
        const randomShade = shades[ Math.floor(Math.random() * shades.length) ];

        return (
            <div
                key={i}
                className="drifting-petal"
                style={{
                    left: `${startLeft}%`,
                    top: `${-20 + Math.random() * 30}%`,
                    animationDelay: `${Math.random() * 25}s`,
                    animationDuration: `${22 + Math.random() * 15}s`,
                    '--x-drift': `${xDrift}vw`,
                    '--petal-shade': randomShade,
                    transform: `rotate(${Math.random() * 360}deg) scale(${0.25 + Math.random() * 1.25})`
                } as React.CSSProperties}
            />
        );
    });

    return (
        <div className="grillhero-root moon-night">
            {/* Deep charcoal night sky gradient */}
            <div className="night-sky" aria-hidden="true" />

            {/* Moon — large, luminous ivory-gold, positioned on the right */}
            <div className="hero-moon-wrap" aria-hidden="true">
                <div className="hero-moon">
                    <div className="moon-texture" />
                    <div className="moon-glow-inner" />
                </div>

                {/* Cherry Blossom Image Layer */}
                <div className="cherry-blossom-layer">
                    <img src="/cherry blossom.png" alt="" className="cherry-blossom-img" />
                </div>
            </div>

            {/* Very subtle drifting petals */}
            <div className="petals-container" aria-hidden="true">
                {petals}
            </div>

            {/* Soft edge vignette — darkened left side to balance moon weight */}
            <div className="hero-vignette" aria-hidden="true" />
        </div>
    );
};

export default GrillHeroScene;
