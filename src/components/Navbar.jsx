import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // To highlight the active route

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Animation for navbar coming from top
  const topAnimation = {
    hidden: { y: '-100%', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
  };

  return (
    <>
      <motion.nav
        className="text-white px-2 sm:px-4 py-2 sm:py-4 flex items-center justify-between"
        variants={topAnimation}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex flex-col mr-1 sm:mr-2">
            <div className="w-3 sm:w-4 h-3 sm:h-4 bg-orange-500"></div>
            <div className="w-3 sm:w-4 h-3 sm:h-4 bg-blue-900"></div>
          </div>
          <span className="text-2xl sm:text-[35px] font-bold">BARSI</span>
        </div>

        {/* Right Section: Call Us, Contact Us, and Hamburger Menu */}
        <div className="flex items-center space-x-1 sm:space-x-4">
          <span className="text-xs sm:text-sm text-orange-500 font-semibold">
            Call Us: (+88) 169 787 5256
          </span>
          <a href="/contact">
            <button className="bg-orange-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-base">
              CONTACT US
            </button>
          </a>
          {/* Hamburger Menu */}
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 sm:w-8 h-6 sm:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white text-black transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div className="flex flex-col mr-2">
              <div className="w-3 sm:w-4 h-3 sm:h-4 bg-orange-500"></div>
              <div className="w-3 sm:w-4 h-3 sm:h-4 bg-blue-900"></div>
            </div>
            <span className="text-lg sm:text-xl font-bold">BARSI</span>
          </div>
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-5 sm:w-6 h-5 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="black"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <ul className="flex-col space-y-4 p-4">
          <li>
            <Link
              to="/"
              className={`flex justify-between items-center hover:text-orange-600 text-sm sm:text-base ${
                location.pathname === '/' ? 'text-orange-600' : ''
              }`}
              onClick={toggleMenu}
            >
              Home
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="black"
                  d="M9 5l7 7-7m7-7m0 0l-7 7m-7v7"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`flex justify-between items-center hover:text-orange-600 text-sm sm:text-base ${
                location.pathname === '/about' ? 'text-orange-600' : ''
              }`}
              onClick={toggleMenu}
            >
              About Us
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="black"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              to="/project"
              className={`flex justify-between items-center hover:text-orange-600 text-sm sm:text-base ${
                location.pathname === '/project' ? 'text-orange-600' : ''
              }`}
              onClick={toggleMenu}
            >
              Project
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="black"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={`flex justify-between items-center hover:text-orange-600 text-sm sm:text-base ${
                location.pathname === '/services' ? 'text-orange-600' : ''
              }`}
              onClick={toggleMenu}
            >
              Services
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="black"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`flex justify-between items-center hover:text-orange-600 text-sm sm:text-base ${
                location.pathname === '/contact' ? 'text-orange-600' : ''
              }`}
              onClick={toggleMenu}
            >
              Contact Us
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="black"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              to="/admin-login"
              className={`flex justify-between items-center hover:text-orange-600 text-sm sm:text-base ${
                location.pathname === '/admin-login' ? 'text-orange-600' : ''
              }`}
              onClick={toggleMenu}
            >
              Admin Login
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="black"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </li>
        </ul>

        {/* Social Media Section */}
        <div className="absolute bottom-4 left-4">
          <p className="text-xs sm:text-sm font-semibold mb-2">We're On Social Media:</p>
          <div className="flex space-x-2">
            <a
              href="#"
              className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
            >
              <span className="text-base sm:text-lg">in</span>
            </a>
            <a
              href="#"
              className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
            >
              <span className="text-base sm:text-lg">f</span>
            </a>
            <a
              href="#"
              className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
            >
              <span className="text-base sm:text-lg">X</span>
            </a>
            <a
              href="#"
              className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
            >
              <span className="text-base sm:text-lg">📷</span>
            </a>
          </div>
        </div>
      </div>

      {/* Overlay when Sidebar is Open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default Navbar;
