import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const leftAnimation = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const rightAnimation = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const bottomAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const LeaderAndFooter = () => {
  const leaderRef = useRef(null);
  const [leaderInView, setLeaderInView] = useState(false);
  const isInView = useInView(leaderRef, { once: false });

  useEffect(() => {
    setLeaderInView(isInView);
  }, [isInView]);

  return (
    <div>
      {/* As A National Leader Section */}
      <motion.section
        ref={leaderRef}
        className="bg-gray-50 py-12 sm:py-16 md:py-20"
        variants={container}
        initial="hidden"
        animate={leaderInView ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-4">
          <motion.div className="flex flex-col xl:flex-row items-center justify-between gap-8" variants={container}>
            {/* Left Side - Header and Location Cards */}
            <motion.div className="w-full xl:w-3/5" variants={leftAnimation}>
              {/* Header */}
              <div className="mb-8 sm:mb-12">
                <motion.div className="flex items-center mb-3 sm:mb-4" variants={fadeIn}>
                  <img
                    src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                    alt="Star"
                    className="w-6 sm:w-8 h-6 sm:h-8 mr-3 sm:mr-4"
                  />
                  <p className="text-base sm:text-lg font-semibold">We're Investing SINCE 1990</p>
                </motion.div>
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
                  variants={bottomAnimation}
                >
                  As A National Leader
                </motion.h2>
              </div>

              {/* Location Cards */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
                variants={container}
              >
                {/* Lyon */}
                <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm" variants={fadeIn}>
                  <div className="mb-4">
                    <img
                      src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/a1-img-1.webp"
                      alt="Lyon Office"
                      className="w-full h-24 sm:h-32 object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Lyon</h3>
                  <p className="text-gray-600 mb-1 text-sm sm:text-base">25,Rue Saint Jermoe</p>
                  <p className="text-gray-600 mb-3 text-sm sm:text-base">89883 Lyon . France</p>
                  <p className="font-semibold text-sm sm:text-base">+22 (0)3 789 41 41</p>
                  <a href="#" className="text-orange-500 hover:underline text-xs sm:text-sm">
                    See On Maps
                  </a>
                </motion.div>

                {/* Culture */}
                <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm" variants={fadeIn}>
                  <div className="mb-4">
                    <img
                      src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/a1-img-2.webp"
                      alt="Culture Office"
                      className="w-full h-24 sm:h-32 object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Culture</h3>
                  <p className="text-gray-600 mb-1 text-sm sm:text-base">81 Sierra Street Kings</p>
                  <p className="text-gray-600 mb-3 text-sm sm:text-base">Mountain, NC 28086</p>
                  <p className="font-semibold text-sm sm:text-base">+28 (0)3 978 41 97</p>
                  <a href="#" className="text-orange-500 hover:underline text-xs sm:text-sm">
                    See On Maps
                  </a>
                </motion.div>

                {/* Architectural */}
                <motion.div
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-sm md:col-span-2 xl:col-span-1"
                  variants={fadeIn}
                >
                  <div className="mb-4">
                    <img
                      src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/a1-img-3.webp"
                      alt="Architectural Office"
                      className="w-full h-24 sm:h-32 object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Architectural</h3>
                  <p className="text-gray-600 mb-1 text-sm sm:text-base">9828 Myrtle Drive Gainesville,</p>
                  <p className="text-gray-600 mb-3 text-sm sm:text-base">VA 20155</p>
                  <p className="font-semibold text-sm sm:text-base">+22 (0)5 100 80 77</p>
                  <a href="#" className="text-orange-500 hover:underline text-xs sm:text-sm">
                    See On Maps
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Side - Professional Image */}
            <motion.div className="w-1/2 pl-8 relative h-[500px] sm:h-[500px]" variants={rightAnimation}>
              <div className="absolute top-40 right-0 w-80 h-[390px] sm:h-[450px] rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/o1-bg-img-1.webp"
                  alt="Professional working on architectural plans"
                  className="object-contain w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <footer className="bg-gray-100 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Logo and Description */}
            <div className="text-center lg:text-left">
              <div className="flex items-center mb-4 sm:mb-6 justify-center lg:justify-start">
                <div className="w-5 sm:w-6 h-5 sm:h-6 bg-orange-500 mr-2"></div>
                <div className="w-5 sm:w-6 h-5 sm:h-6 bg-blue-900"></div>
                <h3 className="text-2xl sm:text-3xl font-bold ml-3">Barsi</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                A profound design process eventually makes the patron, the architect, and every occasional process
                eventually makes the patron
              </p>
            </div>

            {/* About and Products Side by Side */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {/* About Column */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">About</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      Who We Are
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      What We Do
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      After Care
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      Sustainability
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      Wellbeing
                    </a>
                  </li>
                </ul>
              </div>

              {/* Products Column */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Products</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      All Products
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      New Designs
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      CAD Blocks
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      Moodboards
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      Finishes
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Inspiration and Contact Side by Side */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              {/* Inspiration Column */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Inspiration</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      Projects
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      Blog
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      Videos
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      Specification Guide
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      Bamboo Configurator
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      Colony Configurator
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Column */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      United Kingdom
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      North America
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      Frovi Showrooms
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">{">"}</span>
                    <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-300 my-8 sm:my-12" />

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-600 text-sm">Copyright 2025 Barsi</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                North America Terms & Conditions
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                Privacy Policy
              </a>

              {/* Top Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-gray-400 text-gray-700 p-2 sm:p-3 text-xs sm:text-sm font-medium hover:bg-gray-300 transition-colors flex flex-col items-center justify-center fixed bottom-4 right-4"
                style={{
                  clipPath: "polygon(50% 0%, 100% 50%, 75% 50%, 75% 100%, 25% 100%, 25% 50%, 0% 50%)",
                  width: "36px",
                  height: "44px",
                }}
                title="Scroll to top"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 sm:h-5 w-4 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span className="text-xs mt-1">Top</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LeaderAndFooter;