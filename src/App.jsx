import "./App.css";
import { motion } from "framer-motion";
import logo from "./assets/hyruplogo.webp";
import { useState, useRef, useEffect, Fragment } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SpaceBackground from "./components/SpaceBackground";
import CustomCursor from "./components/CustomCursor";
import Magnetic from "./components/Magnetic";
import SolarSystem from "./components/SolarSystem";

// College Logos
import sastraLogo from "./assets/colleges/sastra.png";
import jeppiarLogo from "./assets/colleges/jeppiar.png";
import pecLogo from "./assets/colleges/pec.jpg";
import manipurLogo from "./assets/colleges/manipuruniv.png";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [dark, setDark] = useState(false);
  const toggleDark = () => setDark(!dark);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  const containerRef = useRef();
  const navRef = useRef();

  useGSAP(() => {
    // 1. Navbar and Hero Entrance
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      clearProps: "all"
    })
      .from(".hero h1 .word", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
      }, "-=0.8")
      .from(".hero p", {
        y: 30,
        opacity: 0,
        duration: 1
      }, "-=0.6")
      .from(".hero-btns .btn-wrapper", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8
      }, "-=0.4");

    // 2. Section Reveals with ScrollTrigger
    // We'll only animate specific elements to avoid double-hiding content
    gsap.utils.toArray("section:not(.hero):not(.features)").forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    });


    // 4. Feature Cards Animation
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      clearProps: "all" // Ensure styles are cleared after animation
    });


    // 6. University Grid Animation
    gsap.from(".university-box", {
      scrollTrigger: {
        trigger: ".university-grid",
        start: "top 85%",
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      clearProps: "all"
    });

    // 7. Free Banner Animation
    gsap.from(".free-banner", {
      scrollTrigger: {
        trigger: ".free-banner-section",
        start: "top 85%",
      },
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      clearProps: "all"
    });

  }, { scope: containerRef });

  return (
    <div className={dark ? "app dark" : "app"} ref={containerRef}>
      <CustomCursor dark={dark} />
      <SpaceBackground dark={dark} />
      <SolarSystem />

      <nav className="navbar" ref={navRef}>
        <div className="logo">
          <img src={logo} alt="HYRUP" className="logo-img" />
          <span>HYRUP</span>
        </div>

        <div className="nav-btns">
          <button className="btn red">FIX FORWARD</button>
          <button className="btn">CAREERS</button>
          <button className="btn red">JOIN NOW</button>

          <button className="btn dark" onClick={toggleDark}>
            {dark ? "☀" : "🌙"}
          </button>
        </div>
      </nav>

      <section className="hero">
        <h1>
          {["Get", "Hired", "For", "Your"].map((w, i) => (
            <span key={i} className="word-wrapper">
              <span className="word">{w}</span>
              <span className="space">&nbsp;</span>
            </span>
          ))}
          <span className="word-wrapper">
            <span className="word text-primary">Skills</span>
          </span>,
          <br />
          {["Not", "Your", "Degree"].map((w, i) => (
            <span key={i} className="word-wrapper">
              <span className="word">{w}</span>
              <span className="space">&nbsp;</span>
            </span>
          ))}
        </h1>
        <p>
          The student career launchpad where your abilities matter more
          than your college name.
        </p>

        <div className="hero-btns">
          <div className="btn-wrapper">
            <button className="btn red">
              <a href="https://students.hyrup.in/">GET STARTED FREE →</a>
            </button>
          </div>
          <div className="btn-wrapper">
            <button className="btn black">
              <a href="https://www.hyrup.in/#features">EXPLORE FEATURES</a>
            </button>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="about-container">
          <p className="about-eyebrow">[ ABOUT HYRUP ]</p>
          <h2>
            We're Fixing The <span className="text-primary">Broken System</span>
          </h2>
          <p>
            Built by students, for students. We're tired of LinkedIn DMs that go nowhere, job
            applications that disappear into black holes, and a system that values college
            names over actual skills.
          </p>

          <div className="about-grid">
            <div className="about-card problem">
              <div className="card-tag">
                <span className="tag-dot"></span> THE PROBLEM
              </div>
              <h3>Your Resume Gets Ignored</h3>
              <p>
                Cold emails, endless scrolling, zero responses. The
                traditional job hunt is broken. Your tier-3 college
                name shouldn't decide your career.
              </p>
            </div>

            <div className="about-card solution">
              <div className="card-tag">
                <span className="tag-dot red"></span> <span className="text-primary">THE SOLUTION</span>
              </div>
              <h3>Skills Over Degrees</h3>
              <p>
                HYRUP matches you with opportunities based on what
                you can actually do. Real mentors. Real skills.
                Real jobs. No gatekeeping.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        {/* Background Decor */}
        <div className="features-decor">
          <div className="decor-shape shape-1">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <path d="M100 0L200 100L100 200L0 100Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
              <path d="M100 20L180 100L100 180L20 100Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
            </svg>
          </div>
          <div className="decor-shape shape-2">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
              <circle cx="120" cy="120" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
              <circle cx="80" cy="80" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
            </svg>
          </div>
          <div className="decor-shape shape-3">
            <div className="concentric-squares">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div className="decor-dot dot-1"></div>
          <div className="decor-dot dot-2"></div>
          <div className="decor-dot dot-3"></div>
        </div>

        <div className="features-container">
          <p className="features-eyebrow">[ PLATFORM FEATURES ]</p>
          <h2>Everything You Need To <span className="text-primary">Launch Your Career</span></h2>

          <div className="features-grid">
            {/* Card 1 */}
            <div className="feature-card">
              <div className="icon-box orange"></div>
              <h3>Skill-Based Profiles</h3>
              <p>Showcase what you can actually do, not where you studied. Build a portfolio that proves your worth.</p>
            </div>

            {/* Card 2 */}
            <div className="feature-card">
              <div className="icon-box orange"></div>
              <h3>5-Minute Skill Proof</h3>
              <p>Quick assessments that showcase your abilities to employers. No more endless coding marathons.</p>
            </div>

            {/* Card 3 */}
            <div className="feature-card">
              <div className="icon-box orange"></div>
              <h3>Smart Job Matching</h3>
              <p>AI-powered connections that actually fit your skills and goals. Context, not just keywords.</p>
            </div>

            {/* Card 4 */}
            <div className="feature-card">
              <div className="icon-box orange"></div>
              <h3>Mentor-Led Communities</h3>
              <p>Join exclusive communities led by industry experts. Learn from people who've been there.</p>
            </div>

            {/* Card 5 */}
            <div className="feature-card">
              <div className="icon-box orange"></div>
              <h3>Early Access Jobs</h3>
              <p>See new opportunities before they go public. The early bird advantage, automated.</p>
            </div>

            {/* Card 6 */}
            <div className="feature-card">
              <div className="icon-box orange"></div>
              <h3>Direct Connections</h3>
              <p>Skip the cold DMs. Connect directly with recruiters and mentors who want to meet you.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="fix-forward">
        <div className="fix-forward-container">
          <div className="fix-forward-header">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="presents-tag"
            >
              HYRUP PRESENTS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-primary">FIX FORWARD</span> Challenge
            </motion.h2>
            <motion.p
              className="fix-forward-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Healthcare's broken? Fix it. Education system outdated? Rebuild it. Climate crisis? Solve it. See something broken in your world? Don't just complain — fix it and pass it forward.
            </motion.p>
          </div>

          <div className="ff-grid">
            <motion.div
              className="ff-card left"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3>The Meaning Behind FixForward</h3>
              <div className="ff-meaning-text">
                <p>There's a saying — when someone helps you, you don't just thank them. You help someone else in need. The cycle continues.</p>
                <p>FixForward is built on the same idea. You see something broken in society? Fix it. Not just for yourself, but for the next generation. Forward the fix.</p>
                <p>We're looking for problem-solvers who see issues in their daily lives and have the courage to create solutions that ripple forward.</p>
              </div>
            </motion.div>

            <motion.div
              className="ff-card right"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <h3>Why Join?</h3>
              <p className="ff-meaning-text">Stop building todo apps. Start solving actual problems. Your skills deserve a better stage. This is where your code stops being homework and starts being a portfolio piece recruiters actually want to see.</p>

              <button className="ff-register-btn">REGISTER FOR FIX FORWARD →</button>
            </motion.div>
          </div>

          <div className="universities-collaboration">
            <p className="community-eyebrow">[ UNIVERSITY PARTNERS ]</p>
            <h2>Our collaboration with <span className="text-primary">Universities</span></h2>

            <div className="university-grid">
              {[
                { name: "SASTRA University", count: "834 students", percent: 90, icon: sastraLogo },
                { name: "Jeppiaar Institute", count: "676 students", percent: 75, icon: jeppiarLogo },
                { name: "PEC", count: "559 students", percent: 60, icon: pecLogo },
                { name: "Manipur University", count: "350 students", percent: 40, icon: manipurLogo }
              ].map((col, i) => (
                <div key={i} className="university-box">
                  <div className="university-logo">
                    <img src={col.icon} alt={col.name} />
                  </div>
                  <h3>{col.name}</h3>
                  <p>{col.count}</p>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${col.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="free-banner-section">
        <div className="free-banner">
          <h2>100% Free. Forever.</h2>
          <p>Join 3,154+ students who are already using HYRUP to build their careers. No hidden fees, no premium plans, no credit card required.</p>

          <div className="growth-strip-banner-wrapper">
            <div className="growth-strip">
              {[
                { label: "Total Active Students", val: "3,154", trend: "+12% this month" },
                { label: "Participating Colleges", val: "4", accent: "top colleges" },
                { label: "Partner Companies", val: "500+", accent: "hiring now" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="growth-segment"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  onHoverEnd={() => {
                    const strip = document.querySelector('.free-banner .growth-strip');
                    if (strip) {
                      strip.classList.add('rope-wiggle');
                      setTimeout(() => strip.classList.remove('rope-wiggle'), 1000);
                    }
                  }}
                >
                  <div className="segment-content">
                    <div className="growth-num">
                      {item.val}
                      {item.trend && <span className="trend">{item.trend}</span>}
                      {item.accent && <span className="accent">{item.accent}</span>}
                    </div>
                    <p>{item.label}</p>
                  </div>
                  {i < 2 && <div className="segment-divider" />}
                </motion.div>
              ))}
            </div>
          </div>


          <button className="btn red">START FOR FREE →</button>
        </div>
      </section>

      <section className="cta">
        <h2>Ready To Launch Your <span className="text-primary">Career?</span></h2>
        <button className="btn red">
          <a href="https://students.hyrup.in/">JOIN HYRUP NOW →</a>
        </button>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="logo">
                <img src={logo} alt="HYRUP" className="logo-img" />
                <span>HYRUP</span>
              </div>
              <p className="footer-tagline">
                Built by students, for students. Get hired for your skills, not your degree.
              </p>
              <div className="social-links">
                <a href="#" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44-1.44-.645-1.44-1.44.645-1.44 1.441-1.44z" />
                  </svg>
                </a>
                <a href="#" className="social-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <div className="link-column">
                <h4>PRODUCT</h4>
                <a href="#">For Students</a>
                <a href="#">Features</a>
                <a href="#">Find Jobs</a>
                <a href="#">Find Mentors</a>
              </div>
              <div className="link-column">
                <h4>COMPANY</h4>
                <a href="#">About Us</a>
                <a href="#">Fix Forward</a>
                <a href="#">Blog</a>
                <a href="#">Careers</a>
              </div>
              <div className="link-column">
                <h4>SUPPORT</h4>
                <a href="#">Contact Us</a>
                <a href="#">Help Center</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>

          <div className="footer-line"></div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              © 2026 HYRUP. All rights reserved.
            </div>
            <div className="footer-secondary-links">
              <a href="#">Careers</a>
              <span className="made-with">Made with <span className="heart">❤</span> by students, for students</span>
              <a href="#">Admin</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
