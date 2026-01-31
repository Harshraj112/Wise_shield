'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiShield, FiClock, FiZap } from 'react-icons/fi';

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-100, 100], [10, -10]);
  const rotateY = useTransform(xSpring, [-100, 100], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="min-h-screen flex items-center pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-6xl font-bitcount-custom text-gray-900 mb-6 leading-tight">
              Browse the Web Safely with{' '}
              <span className="text-gradient">AI-Powered Protection</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              WiseShield AI stops phishing attacks before they happen. Real-time protection powered by machine learning. 99.2%(XGBOOST) detection rate.
            </p>

            {/* Try It Now Button */}
            <motion.div variants={itemVariants} className="mb-6">
              <button 
                onClick={() => {
                  const demoSection = document.querySelector('#live-demo');
                  demoSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center justify-between gap-4 px-6 py-3 bg-white border-3 border-teal-500 rounded-full font-semibold text-lg text-black transition-all duration-500 ease-in-out hover:border-green-400 min-w-[220px] overflow-hidden cursor-pointer"
              >
                <span className="transition-all duration-500 ease-in-out group-hover:translate-x-[70px]">
                  Try It Now
                </span>
                <span className="flex items-center justify-center w-10 h-10 bg-teal-500 rounded-full text-white transition-all duration-500 ease-in-out group-hover:bg-green-500 group-hover:translate-x-[-120px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 7L18 12L13 17M6 12H18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </motion.div>
            {/* Additional Info */}
            <motion.p className="mt-6 text-gray-500 text-sm" variants={itemVariants}>
              ✓ No credit card required • ✓ Install in 30 seconds • ✓ Free forever
            </motion.p>
          </motion.div>

          {/* Visual Section */}
          <div style={{ perspective: 2000 }}>
            <motion.div
              className="relative h-96 bg-white rounded-2xl shadow-[0_25px_80px_-12px_rgba(59,130,246,0.4)] p-8 flex items-center justify-center overflow-hidden"
              variants={itemVariants}
              style={{ rotateX, rotateY }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                x.set(0);
                y.set(0);
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 90 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="/hero-bg.png" 
                  alt="Security Background" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="relative w-full h-full z-10">
              {/* Animated Shield */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <FiShield className="w-32 h-32 text-blue-600 opacity-100" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-green-600 rounded-full opacity-80 blur-xl" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Browser Chrome Indicator */}
              <motion.div
                className="absolute top-4 right-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
              </motion.div>
            </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
