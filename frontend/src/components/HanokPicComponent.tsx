import { useEffect, useRef } from 'react';
import { HanokPic } from '../hanokPic';

interface HanokPicComponentProps {
    onClose: () => void;
}

export default function HanokPicComponent({ onClose }: HanokPicComponentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const hanokPicRef = useRef<HanokPic | null>(null);

    useEffect(() => {
        if (!hanokPicRef.current) {
            hanokPicRef.current = new HanokPic({ onClose });
        }
        hanokPicRef.current.open();

        return () => {
            // Cleanup if necessary, but HanokPic handles its own container
        };
    }, [ onClose ]);

    return <div ref={containerRef} id="hanok-pic-container-inner"></div>;
}
