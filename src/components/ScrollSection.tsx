import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer"; 

const random = (min: number, max: number) => Math.random() * (max - min) + min;

// --- Interface Definitions ---
interface ScrollSectionProps {
  title: string;
  descriptions: string[];
  centralImage: string;
  currentSectionIndex: number; 
  currentDescIndex: number; 
}

const ScrollSection = ({
  title,
  descriptions,
  centralImage,
  currentSectionIndex,
  currentDescIndex,
}: ScrollSectionProps) => {
  const [ref] = useInView({ threshold: 0.1, triggerOnce: false });

  const centralContentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.0, ease: "easeOut" } },
  };

  return (
    <section
      ref={ref} 
      // 1. TOTAL HEIGHT: Must be HUGE (9 steps * 100vh = 900vh) 
       // This is the total scrollable area for the narrative.
      className="scroll-section relative min-h-[900vh] flex flex-col justify-start items-center snap-start bg-white" 
      style={{ overflow: 'hidden' }}
    >
      
      {/* 2. STICKY CONTAINER: This box contains the image/text and STAYS FIXED. */}
      <div 
          // 'sticky top-24' locks the content into place, and 'h-screen' ensures it occupies the viewport.
          className="sticky top-24 h-screen w-full flex flex-col items-center justify-start z-20 pointer-events-none"
      >
        <motion.div
          className="relative w-full"
          initial="hidden"
          animate="visible"
          variants={centralContentVariants}
        >
          
          {/* Main Content Holder (Image + Description) */}
          <div className="flex flex-col items-center justify-start">

            {/* A. Central Image Container (FIXED WIDTH/HEIGHT) */}
            <div 
              className="overflow-hidden rounded-2xl shadow-2xl bg-white mb-6 mt-4 pointer-events-auto" 
              style={{ width: '500px', height: '600px' }} 
            > 
                <img
                    src={centralImage} // This image changes based on props from Index.tsx
                    alt={title}
                    className="w-full h-full object-cover" 
                />
            </div>

            {/* B. Scrolling Description Area (This text changes with scroll) */}
            <div className="w-full max-w-xl text-center pointer-events-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentDescIndex} // This key triggers the text change animation
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="p-4" 
                    >
                        <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800"> 
                            {title}
                        </h3>
                        <p className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed">
                            **{currentSectionIndex + 1}.{currentDescIndex + 1}** {descriptions[currentDescIndex]}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* 3. SCROLL SPACERS: These empty divs create the scroll distance. */}
      {/* For 9 narrative steps, you need 9 empty h-screen blocks to scroll through. */}
      {[...Array(9)].map((_, i) => (
          <div key={i} className="h-screen w-full" /> 
      ))}
    </section>
  );
};

export default ScrollSection;