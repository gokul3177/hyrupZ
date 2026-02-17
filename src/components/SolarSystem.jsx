import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import hyrupLogo from "../assets/hyruplogo.webp";

export default function SolarSystem() {
    const containerRef = useRef(null);

    useEffect(() => {
        // Removed mouse tilt logic to keep the logo floating only
    }, []);

    return (
        <div className="solar-container" ref={containerRef}>
            <div className="sun floating-logo">
                <img src={hyrupLogo} alt="HYRUP" />
            </div>
        </div>
    );
}
