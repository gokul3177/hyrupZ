import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

/**
 * Theme-Aware Neon Orange Arrow & White Meteor Trail
 * - Changes appearance based on Light/Dark mode
 * - Fixed 'yellow' blob by removing blurred background paths
 * - Pure neon orange pointer (Light fill in Light mode, Dark fill in Dark mode)
 * - Smooth white meteor trail that stays behind the arrow
 */
export default function CustomCursor({ dark }) {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Core mouse position
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // High-responsiveness springs for the pointer
    const pX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
    const pY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

    // Trail elements - Short and snappy for a "meteor streak" effect
    const s4X = useSpring(mouseX, { stiffness: 450, damping: 30 });
    const s4Y = useSpring(mouseY, { stiffness: 450, damping: 30 });

    const s5X = useSpring(mouseX, { stiffness: 350, damping: 25 });
    const s5Y = useSpring(mouseY, { stiffness: 350, damping: 25 });

    const s6X = useSpring(mouseX, { stiffness: 250, damping: 20 });
    const s6Y = useSpring(mouseY, { stiffness: 250, damping: 20 });

    const s7X = useSpring(mouseX, { stiffness: 180, damping: 18 });
    const s7Y = useSpring(mouseY, { stiffness: 180, damping: 18 });

    const s8X = useSpring(mouseX, { stiffness: 120, damping: 15 });
    const s8Y = useSpring(mouseY, { stiffness: 120, damping: 15 });

    // White Meteor color palette - Starting from s4 back to keep it behind the tip
    const trailPoints = [
        { x: s4X, y: s4Y, size: 8, opacity: 0.6, color: "#ffffff", blur: "2px" },
        { x: s5X, y: s5Y, size: 16, opacity: 0.4, color: "#f8f9fa", blur: "4px" },
        { x: s6X, y: s6Y, size: 24, opacity: 0.2, color: "#e9ecef", blur: "8px" },
        { x: s7X, y: s7Y, size: 32, opacity: 0.1, color: "#dee2e6", blur: "12px" },
        { x: s8X, y: s8Y, size: 40, opacity: 0.05, color: "#ced4da", blur: "16px" },
    ];

    useEffect(() => {
        const isTouch = window.matchMedia("(pointer: coarse)").matches;
        if (isTouch) return;

        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target.closest("button, a, .stat-card, .feature-card, .btn, .university-box, .ff-register-btn");
            if (target) setIsHovering(true);
        };

        const handleMouseOut = (e) => {
            const target = e.target.closest("button, a, .stat-card, .feature-card, .btn, .university-box, .ff-register-btn");
            if (target) setIsHovering(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseout", handleMouseOut);
        };
    }, [isVisible, mouseX, mouseY]);

    if (!isVisible) return null;

    // Theme-based colors
    const arrowFill = dark ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.9)";
    const arrowBorder = "#ff8a00"; // Distinct orange for both
    const mixMode = dark ? "screen" : "multiply"; // Meteor looks better with mix-blend on dark

    return (
        <div style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 1000000 }}>
            {/* White Meteor Trail - Only renders behind the arrow */}
            {trailPoints.map((p, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        x: p.x,
                        y: p.y,
                        width: p.size,
                        height: p.size,
                        borderRadius: "50%",
                        background: p.color,
                        opacity: p.opacity,
                        translateX: "-50%",
                        translateY: "-50%",
                        filter: `blur(${p.blur})`,
                        mixBlendMode: dark ? "screen" : "normal" // Normal on light mode for better visibility
                    }}
                    animate={{
                        scale: isHovering ? 1.4 : 1,
                    }}
                />
            ))}

            {/* Neon Orange Arrow Pointer - Cleaned up to remove the 'yellow blob' */}
            <motion.div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    x: pX,
                    y: pY,
                    translateX: "0%",
                    translateY: "0%",
                    // Clean drop shadow for glow without blobby artifact
                    filter: `drop-shadow(0 0 5px ${arrowBorder})`,
                }}
                animate={{
                    scale: isHovering ? 1.4 : 1,
                    rotate: isHovering ? -15 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                }}
            >
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Main Arrow Body - Theme-aware fill */}
                    <path
                        d="M10 10L90 50L50 60L40 100L10 10Z"
                        fill={arrowFill}
                        stroke={arrowBorder}
                        strokeWidth="5"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>
        </div>
    );
}
