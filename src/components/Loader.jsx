import { motion, useMotionValue, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

const Loader = ({ progress = 0 }) => {
  const progressValue = useMotionValue(0);
  const springProgress = useSpring(progressValue, {
    stiffness: 100,
    damping: 30,
  });
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    progressValue.set(progress);
  }, [progress, progressValue]);

  useMotionValueEvent(springProgress, "change", (latest) => {
    setDisplayProgress(Math.round(latest));
  });
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const dots = [0, 1, 2];

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Loading Text */}
        <motion.div
          variants={textVariants}
          className="text-2xl font-semibold text-slate-100 md:text-3xl"
        >
          Loading Portfolio
        </motion.div>

        {/* Animated Dots */}
        <div className="flex items-center gap-2 mt-3">
          {dots.map((index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2
              }}
              className="h-3 w-3 rounded-full bg-brand-500"
            />
          ))}
        </div>

        {/* Progress Bar Container */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ 
            width: "280px", 
            opacity: 1,
            transition: { duration: 0.4, delay: 0.2 }
          }}
          className="relative h-2 w-[280px] overflow-hidden rounded-full bg-slate-800"
        >
          {/* Progress Bar Fill */}
          <motion.div
            initial={{ width: "0%" }}
            style={{ 
              width: useTransform(springProgress, (latest) => `${latest}%`)
            }}
            className="h-full bg-gradient-to-r from-brand-500 via-cyan-500 to-brand-500 shadow-lg"
          />
        </motion.div>

        {/* Progress Percentage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 0.3 }
          }}
          className="text-sm font-medium text-slate-400"
        >
          {displayProgress}%
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;

