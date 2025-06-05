"use client"

import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import axios from "axios"
import LeaderAndFooter from "../components/LeaderAndFooter"


const Contact = () => {
  // Animation Variants
  const bottomAnimation = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const leftAnimation = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const rightAnimation = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
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

  // Intersection Observer Hooks
  const [headerRef, headerInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [contactRef, contactInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [mapRef, mapInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [leaderRef, leaderInView] = useInView({ threshold: 0.2, triggerOnce: false })

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState("")

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData)
      setStatus(response.data.message)
      setFormData({ name: "", email: "", message: "" }) // Reset form
    } catch (error) {
      setStatus(error.response?.data?.error || "An error occurred. Please try again.")
    }
  }

  return (
    <div className="m-0 p-0 overflow-x-hidden">
      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navbar />
      </div>

      {/* Contact Header with Dark Overlay */}
      <motion.div
        ref={headerRef}
        className="relative h-[300px] sm:h-[350px] md:h-[400px] bg-cover bg-top flex items-center justify-between px-4 sm:px-6 md:px-10 mt-0"
        style={{
          backgroundImage: `url('https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/breadcrumb-img.webp')`,
        }}
        variants={fadeIn}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.h1
          className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white z-10"
          variants={bottomAnimation}
        >
          Contact
        </motion.h1>
        <motion.div
          className="absolute bottom-3 sm:bottom-4 md:bottom-5 right-3 sm:right-4 md:right-5 bg-gray-700 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded z-10 text-sm sm:text-base"
          variants={bottomAnimation}
        >
          <Link to="/" className="text-gray-300 hover:text-orange-500">
            HOME
          </Link>
          <span className="text-orange-500 mx-2"></span>
          <span className="text-orange-500">Contact</span>
        </motion.div>
      </motion.div>

      {/* Contact Section */}
      <motion.section
        ref={contactRef}
        className="bg-white py-8 sm:py-12 md:py-16 lg:py-20"
        variants={container}
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8 sm:mb-12 md:mb-16" variants={bottomAnimation}>
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <motion.img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                alt="Star"
                className="w-6 sm:w-8 h-6 sm:h-8 mr-3 sm:mr-4"
                variants={fadeIn}
              />
              <p className="text-base sm:text-lg font-semibold">Contact Us</p>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Get In Touch</h2>
          </motion.div>

          <motion.div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8" variants={container}>
            {/* Left Side - Image */}
            <motion.div className="w-full lg:w-1/2" variants={leftAnimation}>
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/c1-img-1.webp"
                alt="Modern Architecture Building"
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[600px] object-cover rounded-lg"
              />
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div className="w-full lg:w-1/2" variants={rightAnimation}>
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 md:space-y-8">
                {/* Name and Email Row */}
                <motion.div
                  className="flex flex-col sm:flex-row sm:space-x-4 md:space-x-6 lg:space-x-8 space-y-5 sm:space-y-0"
                  variants={fadeIn}
                >
                  <div className="flex-1">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <img
                        src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                        alt="Star"
                        className="w-3 sm:w-4 h-3 sm:h-4 mr-2 sm:mr-3"
                      />
                      <label className="text-base sm:text-lg font-semibold">Name*</label>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border-b-2 border-black bg-transparent pb-2 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <img
                        src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                        alt="Star"
                        className="w-3 sm:w-4 h-3 sm:h-4 mr-2 sm:mr-3"
                      />
                      <label className="text-base sm:text-lg font-semibold">Email*</label>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-b-2 border-black bg-transparent pb-2 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </div>
                </motion.div>

                {/* Message Field */}
                <motion.div variants={fadeIn}>
                  <div className="flex items-center mb-3 sm:mb-4">
                    <img
                      src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                      alt="Star"
                      className="w-3 sm:w-4 h-3 sm:h-4 mr-2 sm:mr-3"
                    />
                    <label className="text-base sm:text-lg font-semibold">Message*</label>
                  </div>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border-b-2 border-black bg-transparent pb-2 focus:outline-none focus:border-orange-500 resize-none"
                    required
                  ></textarea>
                </motion.div>

                {/* Status Message */}
                {status && (
                  <motion.div
                    variants={fadeIn}
                    className={`text-sm sm:text-base lg:text-lg ${
                      status.includes("error") ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {status}
                  </motion.div>
                )}

                {/* Checkbox and Description */}
                <motion.div
                  className="flex items-start space-x-3 sm:space-x-4 mt-6 sm:mt-8 lg:mt-12"
                  variants={fadeIn}
                >
                  <input
                    type="checkbox"
                    className="mt-1 sm:mt-2 w-4 sm:w-5 h-4 sm:h-5 border-2 border-black"
                  />
                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                    Architecture and interior design studio based in Dubai that combines modernity with the rich
                    heritage of the Middle East We are Komplice, your Payroll
                  </p>
                </motion.div>

                {/* Contact Button */}
                <motion.div className="mt-6 sm:mt-8" variants={fadeIn}>
                  <button
                    type="submit"
                    className="inline-flex items-center bg-[#ff5e14] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full hover:bg-orange-600 transition-colors text-sm sm:text-base"
                  >
                    CONTACT US
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 sm:h-5 w-4 sm:w-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </motion.div>

                {/* Statistics */}
                <motion.div
                  className="flex flex-row space-x-4 sm:space-x-8 lg:space-x-16 mt-8 sm:mt-12 lg:mt-16"
                  variants={container}
                >
                  <motion.div variants={fadeIn}>
                    <div className="text-5xl sm:text-6xl lg:text-8xl font-bold">28</div>
                    <div className="border-b-4 border-black w-16 sm:w-20 mb-2"></div>
                    <div className="text-xs sm:text-sm font-semibold">
                      YEARS
                      <br />
                      EXPERIENCE
                    </div>
                  </motion.div>
                  <motion.div variants={fadeIn}>
                    <div className="text-5xl sm:text-6xl lg:text-8xl font-bold">99</div>
                    <div className="border-b-4 border-black w-16 sm:w-20 mb-2"></div>
                    <div className="text-xs sm:text-sm font-semibold">
                      PROJECTS
                      <br />
                      COMPLETED
                    </div>
                  </motion.div>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section
        ref={mapRef}
        className="bg-white py-8 sm:py-12 md:py-16 lg:py-20"
        variants={fadeIn}
        initial="hidden"
        animate={mapInView ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-4">
          <motion.iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462563.0326327737!2d54.94769376953125!3d25.07565817066437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1696936621318!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-sm h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
            variants={fadeIn}
          ></motion.iframe>
        </div>
      </motion.section>

      {/* Leader and Footer Section */}
      <LeaderAndFooter />
    </div>
  )
}

export default Contact
