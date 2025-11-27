import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroAnimation from "@/components/IntroAnimation";
import Header from "@/components/Header";
import ScrollSection from "@/components/ScrollSection";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";

// --- Asset Imports (ALL REQUIRED PATHS RESTORED) ---
import forestHero from "@/assets/forest-hero.jpg"; // <-- FIX: This was missing!
import oceanTransport from "@/assets/ocean-transport.jpg";
import forestCanopy from "@/assets/forest-canopy.jpg";
import plantGrowth from "@/assets/plant-growth.jpg"; // Not used but included for completeness
import renewableEnergy from "@/assets/renewable-energy.jpg";
import handsLeaves from "@/assets/hands-leaves.jpg"; // Not used but included for completeness

const Index = () => {
    const [showIntro, setShowIntro] = useState(true);
    const [showContent, setShowContent] = useState(false);
    
    const [currentNarrativeStep, setCurrentNarrativeStep] = useState(0); 
    
    const currentSectionIndex = Math.min(2, Math.floor(currentNarrativeStep / 3));
    const currentDescIndex = currentNarrativeStep % 3;
    const TOTAL_NARRATIVE_STEPS = 9; 

    const handleIntroComplete = () => {
        setShowIntro(false);
        setTimeout(() => setShowContent(true), 100);
    };

    // --- ENTIRE NARRATIVE DATA with descriptions for 9 steps (Unchanged) ---
    const FULL_NARRATIVE_DATA = useMemo(() => ([
        // Section 1: Ocean Transport (Steps 0, 1, 2)
        { centralImage: oceanTransport, title: "Ocean Transport Initiatives", 
            descriptions: [
                "1.1: Our advanced shipping design significantly cuts carbon emissions by 40%.",
                "1.2: We use innovative sail-assist technology to reduce dependency on fossil fuels.",
                "1.3: This transition leads to lower operating costs and a greener supply chain."
            ],
        },
        // Section 2: Forest Conservation (Steps 3, 4, 5)
        { centralImage: forestCanopy, title: "Global Reforestation Commitment",
            descriptions: [
                "2.1: We invest 10% of revenue into verifiable global reforestation projects.",
                "2.2: Each project focuses on native species, restoring local biodiversity and ecosystems.",
                "2.3: These efforts actively combat climate change by sequestering atmospheric CO2."
            ],
        },
        // Section 3: Clean Energy (Steps 6, 7, 8)
        { centralImage: renewableEnergy, title: "Future Energy Solutions",
            descriptions: [
                "3.1: Our goal is 100% renewable energy use across all ground operations by 2030.",
                "3.2: We deploy modular solar and wind units for independent, clean power generation.",
                "3.3: Investing in clean energy is essential to achieving our net-zero targets globally."
            ],
        },
    ]), []);

    // --- SCROLL LOGIC (Unchanged) ---
    useEffect(() => {
        if (!showContent) return;
        
        const handleScroll = () => {
            const sections = document.querySelectorAll('.scroll-section');
            if (sections.length < 2) return;

            const viewportHeight = window.innerHeight;
            let newNarrativeStep = currentNarrativeStep;
            
            const mainScrollSection = sections[1] as HTMLElement; 
            const rect = mainScrollSection.getBoundingClientRect();
            
            if (rect.top <= viewportHeight && rect.bottom >= 0) {
                
                const totalScrollHeight = mainScrollSection.scrollHeight - viewportHeight; 
                const scrollPastSticky = Math.abs(rect.top); 
                const stepHeight = totalScrollHeight / TOTAL_NARRATIVE_STEPS; 
                
                const step = Math.min(TOTAL_NARRATIVE_STEPS - 1, Math.floor(scrollPastSticky / stepHeight));
                
                newNarrativeStep = step;
            } else if (rect.top > viewportHeight) {
                 newNarrativeStep = 0;
            } else if (rect.bottom < 0) {
                 newNarrativeStep = TOTAL_NARRATIVE_STEPS - 1;
            }

            if (newNarrativeStep !== currentNarrativeStep) {
                setCurrentNarrativeStep(newNarrativeStep);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showContent, currentNarrativeStep]); 

    const currentSectionData = FULL_NARRATIVE_DATA[currentSectionIndex];
    
    return (
        <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
            <AnimatePresence>
                {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
            </AnimatePresence>

            {showContent && (
                <>
                    <Header />

                    {/* 1. HERO SECTION (Scrolls away normally) */}
                    <section 
                        id="home" 
                        className="scroll-section min-h-screen flex items-center justify-center relative overflow-hidden snap-start" 
                        style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95)), url(${forestHero})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                        {/* HERO CONTENT: Deepwoods Green Initiatives text */}
                        <motion.div
                            className="text-center px-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin text-foreground mb-6 leading-tight">
                                Deepwoods Green 
                                <br />
                                <span className="text-primary">Initiatives</span>
                            </h1>
                            <p className="text-xl md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
                                Cultivating a sustainable future through innovative green solutions
                            </p>
                        </motion.div>
                    </section>

                    {/* 2. SCROLL SECTION (Starts BELOW the Hero) */}
                    <div className="snap-y snap-mandatory" id="services">
                        <ScrollSection 
                            title={currentSectionData.title}
                            descriptions={currentSectionData.descriptions} 
                            centralImage={currentSectionData.centralImage} 
                            currentSectionIndex={currentSectionIndex}
                            currentDescIndex={currentDescIndex} 
                        />
                    </div>
                    
                    {/* 3. VIDEO SECTION (Follows the ScrollSection) */}
                    <VideoSection />
                    <Footer />
                </>
            )}
        </div>
    );
};

export default Index;