"use client"

import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import axios from "axios"
import LeaderAndFooter from "../components/LeaderAndFooter"


const Projects = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isChecked, setIsChecked] = useState(false)

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccessMessage("")
    setErrorMessage("")

    try {
      const response = await axios.post("http://localhost:5000/api/contact", formData)
      setSuccessMessage(response.data.message)
      setFormData({ name: "", email: "", message: "" }) // Clear form
      setIsChecked(false) // Clear checkbox
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Failed to submit form. Please try again.")
    }
  }

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

  // Intersection Observer Hooks for Each Section
  const [headerRef, headerInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [caseStudiesRef, caseStudiesInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [fullWidthRef, fullWidthInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [twoColumnRef, twoColumnInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [contactRef, contactInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [leaderRef, leaderInView] = useInView({ threshold: 0.2, triggerOnce: false })

  return (
    <div className="m-0 p-0 overflow-x-hidden">
      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navbar />
      </div>

      {/* Projects Header with Dark Overlay */}
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
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Title */}
        <motion.h1
          className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white z-10"
          variants={bottomAnimation}
        >
          Our Projects
        </motion.h1>

        {/* Breadcrumb Navigation */}
        <motion.div
          className="absolute bottom-3 sm:bottom-4 md:bottom-5 right-3 sm:right-4 md:right-5 bg-gray-700 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded z-10 text-sm sm:text-base"
          variants={bottomAnimation}
        >
          <Link to="/" className="text-gray-300 hover:text-orange-500">
            HOME
          </Link>
          <span className="text-orange-500 mx-2"></span>
          <span className="text-orange-500">OUR PROJECTS</span>
        </motion.div>
      </motion.div>

      {/* Recent Case Studies Section */}
      <motion.section
        ref={caseStudiesRef}
        className="bg-white py-12 sm:py-16 md:py-20 relative"
        variants={container}
        initial="hidden"
        animate={caseStudiesInView ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-4">
          {/* Recent Case Studies Text - Centered with proper spacing */}
          <motion.div className="text-center mb-8 sm:mb-12 md:mb-16" variants={bottomAnimation}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-black">Recent</span> <span className="text-gray-300">Case</span>
              <br />
              <span className="text-gray-300">Studies</span>
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8"
            variants={container}
          >
            {/* Left Side Image - Smaller (1/3 width on desktop) */}
            <motion.div className="w-full lg:w-1/3 relative" variants={leftAnimation}>
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/p5-img-1-1.webp"
                alt="The Luxurious Sky Penthouse"
                className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover rounded-lg"
              />
              <div className="mt-4 lg:mt-6">
                <motion.h3 className="text-lg sm:text-xl font-bold mb-2" variants={fadeIn}>
                  The Luxurious Sky Penthouse.
                </motion.h3>
                <motion.p className="text-gray-600 text-sm sm:text-base" variants={fadeIn}>
                  House // Architecture // Design
                </motion.p>
              </div>
            </motion.div>

            {/* Right Side Image - Larger (2/3 width on desktop) */}
            <motion.div className="w-full lg:w-2/3 relative" variants={rightAnimation}>
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/p5-img-2-1.webp"
                alt="Times Square In The Heart Of Kuala Lumpur"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-lg"
              />
              <div className="mt-4 lg:mt-6">
                <motion.h3 className="text-lg sm:text-xl font-bold mb-2" variants={fadeIn}>
                  Times Square In The Heart Of Kuala Lumpur, Malaysia.
                </motion.h3>
                <motion.p className="text-gray-600 text-sm sm:text-base" variants={fadeIn}>
                  Building // Creative // Architecture Design
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Full Width Project Section */}
      <motion.section
        ref={fullWidthRef}
        className="bg-white py-12 sm:py-16 md:py-20"
        variants={container}
        initial="hidden"
        animate={fullWidthInView ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-4">
          <motion.div className="w-full" variants={leftAnimation}>
            <img
              src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/p5-img-3-1.webp"
              alt="Contemporary Interior Design"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-lg"
            />
            <div className="mt-4 lg:mt-6">
              <motion.h3 className="text-xl sm:text-2xl font-bold mb-2" variants={fadeIn}>
                Contemporary Interior Design - Design Your Dream Home
              </motion.h3>
              <motion.p className="text-gray-600 text-sm sm:text-base" variants={fadeIn}>
                Building // Creative // Architecture Design
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Two Column Projects Section */}
      <motion.section
        ref={twoColumnRef}
        className="bg-white py-12 sm:py-16 md:py-20"
        variants={container}
        initial="hidden"
        animate={twoColumnInView ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8"
            variants={container}
          >
            {/* Left Side Image - Wider (2/3 width on desktop) */}
            <motion.div className="w-full lg:w-2/3 relative" variants={leftAnimation}>
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/p5-img-4.webp"
                alt="Residential Construction Site"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-lg"
              />
              <div className="mt-4 lg:mt-6">
                <motion.h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2" variants={fadeIn}>
                  Residential Construction Site In San Francisco, CA
                </motion.h3>
                <motion.p className="text-gray-600 text-sm sm:text-base" variants={fadeIn}>
                  Building // Creative // Architecture Design
                </motion.p>
              </div>
            </motion.div>

            {/* Right Side Image - Narrower (1/3 width on desktop) */}
            <motion.div className="w-full lg:w-1/3 relative" variants={rightAnimation}>
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/p5-img-5.webp"
                alt="Azure Beachfront Villa"
                className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover rounded-lg"
              />
              <div className="mt-4 lg:mt-6">
                <motion.h3 className="text-lg sm:text-xl font-bold mb-2" variants={fadeIn}>
                  Azure Beachfront Villa
                </motion.h3>
                <motion.p className="text-gray-600 text-sm sm:text-base" variants={fadeIn}>
                  Building // Creative // Design
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        ref={contactRef}
        className="bg-white py-12 sm:py-16 md:py-20"
        variants={container}
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div className="text-center mb-8 sm:mb-12 md:mb-16" variants={bottomAnimation}>
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                alt="Star"
                className="w-6 sm:w-8 h-6 sm:h-8 mr-3 sm:mr-4"
              />
              <p className="text-base sm:text-lg font-semibold">Contact Us</p>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Get In Touch</h2>
          </motion.div>

          <motion.div className="flex flex-col lg:flex-row items-start gap-8" variants={container}>
            {/* Left Side - Image */}
            <motion.div className="w-full lg:w-1/2" variants={leftAnimation}>
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/c1-img-1.webp"
                alt="Modern Architecture Building"
                className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover rounded-lg"
              />
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div className="w-full lg:w-1/2" variants={rightAnimation}>
              <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
                {/* Success/Error Messages */}
                {successMessage && (
                  <motion.div className="text-green-500 text-center mb-4" variants={fadeIn}>
                    {successMessage}
                  </motion.div>
                )}
                {errorMessage && (
                  <motion.div className="text-red-500 text-center mb-4" variants={fadeIn}>
                    {errorMessage}
                  </motion.div>
                )}

                {/* Name and Email Row */}
                <motion.div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0" variants={fadeIn}>
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

                {/* Checkbox and Description */}
                <motion.div className="flex items-start space-x-3 sm:space-x-4 mt-8 sm:mt-12" variants={fadeIn}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </motion.div>

                {/* Statistics */}
                <motion.div
                  className="flex flex-row space-x-4 sm:space-x-8 lg:space-x-16 mt-12 sm:mt-16"
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

      {/* Leader and Footer Section */}
      <LeaderAndFooter />
    </div>
  )
}

export default Projects
