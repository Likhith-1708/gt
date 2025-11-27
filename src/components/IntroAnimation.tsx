import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const random = (min: number, max: number) => Math.random() * (max - min) + min;
const TILE_COLS = 7; 

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [percentage, setPercentage] = useState(0);
  const [taglineLines, setTaglineLines] = useState([
    "Deepwoods Green ",
    "Initiatives",
    "Loading Experience",
  ]);
  const [phase, setPhase] = useState("loading"); // 'loading', 'tiles', 'done'

  const percentageMotion = useMotionValue(0);
  // Controls UPWARD MOVEMENT: When percentage is 0, y is '40vh' (near bottom). When 100, y is '10vh' (near center-left).
  const yTransform = useTransform(percentageMotion, [0, 100], ["40vh", "10vh"]); 
  // Controls OPACITY: Fades out after the count hits 100 (value 100 to 106)
  const opacityTransform = useTransform(percentageMotion, [100, 106], [1, 0]); 

  useEffect(() => {
    percentageMotion.set(percentage);
  }, [percentage, percentageMotion]);

  // --- Animation Logic (Timing & Counting) ---
  const startAnimation = useCallback(() => {
    let currentStep = 0;
    
    const animateToValue = (target, duration, taglineUpdate, callback) => {
      const steps = target - currentStep;
      let startTime = null;
      let startValue = currentStep;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(1, elapsed / duration);
        const newValue = Math.floor(startValue + steps * progress);
        setPercentage((p) => Math.max(p, newValue));

        if (progress < 1) requestAnimationFrame(step);
        else {
          currentStep = target;
          callback?.();
        }
      };

      if (taglineUpdate)
        setTimeout(() => setTaglineLines(taglineUpdate), 120);

      requestAnimationFrame(step);
    };

    setTimeout(() => {
      animateToValue(40, 800, ["Establishing Connection", "Deepwoods Initiative", "Loading Data"], () => {
        animateToValue(75, 900, ["Verifying Assets", "Low Emission", "Ocean Transportation"], () => {
          animateToValue(95, 600, ["Calculating Impact", "Deepwoods", "Green Initiatives"], () => {
            animateToValue(100, 600, ["Experience Ready", "Deepwoods", "Pvt. Ltd."], () => {
              
              // Start the content fade-out and tile drop process
              let fadeValue = 100;
              const fadeOut = () => {
                fadeValue += 1;
                percentageMotion.set(fadeValue); 
                
                if (fadeValue < 106) {
                  requestAnimationFrame(fadeOut);
                } else {
                  setPhase("tiles"); 
                  
                  // Wait for tiles to fall completely before calling onComplete
                  setTimeout(() => {
                    setPhase("done");
                    onComplete(); 
                  }, 1800); 
                }
              };
              fadeOut();

            });
          });
        });
      });
    }, 600);
  }, [onComplete, percentageMotion]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  // --- Tile Rendering: Full-Height Vertical Bars ---
  const renderTiles = () =>
    Array.from({ length: TILE_COLS }, (_, i) => {
      const tileWidth = 100 / TILE_COLS;
      const delay = i * 0.08 + random(0, 0.15); 
      const duration = 0.8 + random(0.2, 0.4);

      return (
        <motion.div
          key={i}
          className="fixed top-0 left-0"
          style={{
            left: `${i * tileWidth}%`,
            width: `${tileWidth}%`,
            height: "100vh",
            background: "#D73027",
            zIndex: 110,
          }}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: "110vh", opacity: 0 }} 
          transition={{
            duration,
            delay,
            ease: "easeIn",
          }}
        />
      );
    });

  return (
    <AnimatePresence>
      {/* RENDER TILES IF PHASE IS 'tiles' */}
      {phase === "tiles" && (
          // This container must have the same background as your Hero Section ("white")
          // to prevent the underlying document body from flickering through.
          <motion.div
            key="tile-drop-container"
            className="fixed inset-0 z-[100] pointer-events-none" 
            style={{ backgroundColor: "white" }} 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
          >
            {renderTiles()}
          </motion.div>
      )}

      {/* RENDER LOADING CONTENT IF PHASE IS 'loading' */}
      {phase === "loading" && (
        <motion.div
          key="loading"
          // This is the solid red screen with the content moving inside it
          className="fixed inset-0 z-50 flex items-start justify-start bg-[#D73027]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }} 
        >
          {/* Content panel: Uses yTransform/opacityTransform for movement and fade */}
          <motion.div
            className="px-8 sm:px-12 lg:px-20 absolute left-0 w-full"
            // The yTransform moves the element up over the 0-100% count
            style={{ y: yTransform, opacity: opacityTransform, maxWidth: "820px" }}
          >
            <div className="text-white text-[12vw] md:text-[14vw] lg:text-[16vw] font-extralight tracking-tight leading-none mb-4 text-left">
              {percentage}%
            </div>
            <div
              className="h-[2px] bg-white mb-8"
              style={{ width: "30vw", maxWidth: "450px", opacity: 1 }}
            />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={taglineLines[0]}
                className="text-white text-2xl md:text-3xl lg:text-4xl font-normal leading-relaxed text-left"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div>{taglineLines[0]}</div>
                <div>{taglineLines[1]}</div>
                <div>{taglineLines[2]}</div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
      
      {/* FINAL EXIT: This ensures the component is completely removed from the DOM when finished. */}
      {phase === "done" && (
          <motion.div key="final-exit" initial={{opacity: 1}} exit={{opacity: 0}} />
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;