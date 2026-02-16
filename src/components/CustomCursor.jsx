import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from "framer-motion";

/**
 * Super Visible Highlighter Cursor
 * - Simplified SVG path for maximum compatibility
 * - Direct DOM manipulation for zero lag
 */
export default function CustomCursor({ dark }) {
    const [isHovering, setIsHovering] = useState(false);
    const pathRef = useRef(null);
    const pointsRef = useRef([]);

    // Mouse coordinates
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth movement for the cursor container
    const smoothX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
    const smoothY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

    // Track velocities for stretching
    const velX = useVelocity(mouseX);
    const velY = useVelocity(mouseY);
    const velocity = useMotionValue(0);
    const rotation = useMotionValue(0);

    // Dynamic stretch based on speed
    const scaleX = useTransform(velocity, [0, 1000, 3000], [1, 2.5, 4.5]);
    const scaleY = useTransform(velocity, [0, 1000, 3000], [1, 0.8, 0.6]);

    useEffect(() => {
        const updateVelocity = () => {
            const vx = velX.get();
            const vy = velY.get();
            const speed = Math.sqrt(vx * vx + vy * vy);
            velocity.set(speed);

            if (speed > 50) {
                const angle = Math.atan2(vy, vx) * (180 / Math.PI);
                rotation.set(angle);
            }
        };

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            mouseX.set(clientX);
            mouseY.set(clientY);
            updateVelocity();

            // Add new point
            pointsRef.current.unshift({ x: clientX, y: clientY, time: Date.now() });
            if (pointsRef.current.length > 60) pointsRef.current.pop();
        };

        let raf;
        const tick = () => {
            const now = Date.now();
            // Decay points (stay alive for 400ms)
            pointsRef.current = pointsRef.current.filter(p => now - p.time < 400);

            if (pathRef.current) {
                const pts = pointsRef.current;
                if (pts.length > 1) {
                    const d = `M ${pts[0].x} ${pts[0].y} ` + pts.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ");
                    pathRef.current.setAttribute("d", d);
                } else {
                    pathRef.current.setAttribute("d", "");
                }
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        const handleMouseOver = (e) => {
            const target = e.target.closest("button, a, .stat-card, .feature-card, .btn");
            if (target) setIsHovering(true);
        };

        const handleMouseOut = (e) => {
            const target = e.target.closest("button, a, .stat-card, .feature-card, .btn");
            if (target) setIsHovering(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseout", handleMouseOut);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <svg
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: 999999,
                    overflow: "visible"
                }}
            >
                <path
                    ref={pathRef}
                    fill="none"
                    stroke="#ff5c4d"
                    strokeWidth="20" // Thicker for visibility
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.5" // More opaque for visibility
                />
            </svg>

            <motion.div
                className="cursor-pill-container"
                style={{
                    x: smoothX,
                    y: smoothY,
                    rotate: rotation,
                    translateX: "-50%",
                    translateY: "-50%",
                    zIndex: 1000000,
                }}
            >
                <motion.div
                    className="cursor-pill"
                    animate={{
                        width: isHovering ? 4 : 12,
                        height: isHovering ? 28 : 12,
                        borderRadius: isHovering ? 4 : 100,
                        scaleX: isHovering ? 1 : scaleX,
                        scaleY: isHovering ? 1 : scaleY,
                        backgroundColor: "#ff5c4d",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
            </motion.div>
        </>
    );
}
