import { motion } from "framer-motion";

// --- Asset Import (Ensure this path is correct) ---
import forestHero from "@/assets/forest-hero.jpg";

const HeroSection = () => {
    return (
        // 1. HERO SECTION (Scrolls away normally)
        <section 
            id="home" 
            className="scroll-section min-h-screen flex items-center justify-center relative overflow-hidden snap-start" 
            style={{ 
                // Apply background image and overlay directly here
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95)), url(${forestHero})`, 
                backgroundSize: "cover", 
                backgroundPosition: "center" 
            }}
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
    );
};

export default HeroSection;