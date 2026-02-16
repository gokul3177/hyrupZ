import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import hyrupLogo from "../assets/hyruplogo.webp";

export default function SolarSystem() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // 🔵 3D MOUSE TILT
            const handleMouseMove = (e) => {
                const { innerWidth, innerHeight } = window;
                const x = (e.clientX - innerWidth / 2) / 40;
                const y = (e.clientY - innerHeight / 2) / 40;

                gsap.to(containerRef.current, {
                    rotationY: x,
                    rotationX: -y,
                    transformPerspective: 1000,
                    transformOrigin: "center",
                    ease: "power2.out",
                    duration: 0.5
                });
            };

            window.addEventListener("mousemove", handleMouseMove);
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="solar-container" ref={containerRef}>
            <div className="sun floating-logo">
                <img src={hyrupLogo} alt="HYRUP" />
            </div>
        </div>
    );
}
