"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { motion } from "framer-motion"

const Admin = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    const adminUsername = "admin"
    const adminPassword = "admin123"

    if (username === adminUsername && password === adminPassword) {
      setError("")
      navigate("/contact-info")
    } else {
      setError("Invalid username or password")
    }
  }

  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const bottomAnimation = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const topAnimation = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const cardAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Navbar */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20"
        variants={topAnimation}
        initial="hidden"
        animate="visible"
      >
        <Navbar />
      </motion.div>

      {/* Background Image with Low Opacity */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg')`,
        }}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </motion.div>

      {/* Admin Login Card */}
      <motion.div
        className="relative w-full max-w-sm sm:max-w-md bg-white/10 backdrop-blur-lg shadow-2xl rounded-xl p-6 sm:p-8 border border-white/20 transform transition-all duration-300 hover:scale-105"
        variants={cardAnimation}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex justify-center mb-4 sm:mb-6" variants={bottomAnimation}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 sm:h-12 sm:w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c0-1.1.9-2 2-2h1a2 2 0 012 2v4a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1m0 0c0-1.1-.9-2-2-2H9a2 2 0 00-2 2v1a2 2 0 002 2h1a2 2 0 002-2v-1m-6-4V7a2 2 0 012-2h1a2 2 0 012 2v1"
            />
          </svg>
        </motion.div>

        <motion.h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white mb-4 sm:mb-6"
          variants={bottomAnimation}
        >
          Admin Login
        </motion.h2>

        <motion.form onSubmit={handleLogin} variants={container} initial="hidden" animate="visible">
          <motion.div className="mb-4" variants={fadeIn}>
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all duration-300 placeholder-gray-300 text-sm sm:text-base"
              placeholder="Enter username"
              required
            />
          </motion.div>

          <motion.div className="mb-4 sm:mb-6" variants={fadeIn}>
            <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all duration-300 placeholder-gray-300 text-sm sm:text-base"
              placeholder="Enter password"
              required
            />
          </motion.div>

          {error && (
            <motion.p className="text-red-400 text-sm text-center mb-4" variants={fadeIn}>
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 sm:py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 text-sm sm:text-base"
            variants={fadeIn}
          >
            Login
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default Admin
