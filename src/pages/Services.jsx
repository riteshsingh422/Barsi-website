"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import axios from "axios"

const Services = () => {
  const [selectedProject, setSelectedProject] = useState(0)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isChecked, setIsChecked] = useState(false)

  const projects = [
    {
      name: "Poolscape Villa",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/p1-img-1.webp",
    },
    {
      name: "European Lard Station",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/p1-img-2.webp",
    },
    {
      name: "Dalbourne Villa",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/p1-img-3.webp",
    },
    {
      name: "Music Theatre",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/p1-img-3.webp",
    },
  ]

  const handleProjectHover = (index) => {
    setSelectedProject(index)
  }

  const handleProjectClick = (index) => {
    setSelectedProject(index)
  }

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
      setFormData({ name: "", email: "", message: "" })
      setIsChecked(false)
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
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
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
  const [servicesRef, servicesInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [ourServicesRef, ourServicesInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [contactRef, contactInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [leaderRef, leaderInView] = useInView({ threshold: 0.2, triggerOnce: false })

  return (
    <div className="m-0 p-0 overflow-x-hidden">
      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navbar />
      </div>

      {/* Services Header with Dark Overlay */}
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
          Our Services
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
          <span className="text-orange-500">OUR SERVICES</span>
        </motion.div>
      </motion.div>

      {/* Services Section */}
      <motion.section
        ref={servicesRef}
        className="bg-white py-8 sm:py-12 md:py-16 lg:py-20"
        variants={container}
        initial="hidden"
        animate={servicesInView ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" variants={container}>
            {/* Architectural Building */}
            <motion.div className="text-center" variants={fadeIn}>
              <div className="mb-4 sm:mb-6 flex justify-center">
                <motion.img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/cf-icon-1.webp"
                  alt="Architectural Building"
                  className="w-16 h-16 sm:w-20 sm:h-20"
                  variants={bottomAnimation}
                />
              </div>
              <motion.h3 className="text-lg sm:text-xl font-bold mb-2" variants={fadeIn}>
                Architectural Building
              </motion.h3>
              <motion.p className="text-gray-600 text-sm sm:text-base" variants={fadeIn}>
                Favorable orientation
              </motion.p>
            </motion.div>

            {/* Development */}
            <motion.div className="text-center" variants={fadeIn}>
              <div className="mb-4 sm:mb-6 flex justify-center">
                <motion.img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/cf-icon-2.webp"
                  alt="Development"
                  className="w-16 h-16 sm:w-20 sm:h-20"
                  variants={bottomAnimation}
                />
              </div>
              <motion.h3 className="text-lg sm:text-xl font-bold mb-2" variants={fadeIn}>
                Development
              </motion.h3>
              <motion.p className="text-gray-600 text-sm sm:text-base" variants={fadeIn}>
                Growth and progress
              </motion.p>
            </motion.div>

            {/* Execution */}
            <motion.div className="text-center" variants={fadeIn}>
              <div className="mb-4 sm:mb-6 flex justify-center">
                <motion.img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/cf-icon-3.webp"
                  alt="Execution"
                  className="w-16 h-16 sm:w-20 sm:h-20"
                  variants={bottomAnimation}
                />
              </div>
              <motion.h3 className="text-lg sm:text-xl font-bold mb-2" variants={fadeIn}>
                Execution
              </motion.h3>
              <motion.p className="text-gray-600 text-sm sm:text-base" variants={fadeIn}>
                Effective implementation
              </motion.p>
            </motion.div>

            {/* Natural Light Home */}
            <motion.div className="text-center" variants={fadeIn}>
              <div className="mb-4 sm:mb-6 flex justify-center">
                <motion.img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/cf-icon-4.webp"
                  alt="Natural Light Home"
                  className="w-16 h-16 sm:w-20 sm:h-20"
                  variants={bottomAnimation}
                />
              </div>
              <motion.h3 className="text-lg sm:text-xl font-bold mb-2" variants={fadeIn}>
                Natural Light Home
              </motion.h3>
              <motion.p className="text-gray-600 text-sm sm:text-base" variants={fadeIn}>
                Bright, Airy, Tranquil
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Services Section */}
      <motion.section
        ref={ourServicesRef}
        className="bg-white pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-0"
        variants={container}
        initial="hidden"
        animate={ourServicesInView ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-4">
          {/* Our Services Header */}
          <motion.div className="flex items-center mb-4 sm:mb-6 md:mb-8 ml-0" variants={fadeIn}>
            <img
              src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
              alt="Star"
              className="w-6 sm:w-8 h-6 sm:h-8 mr-3 sm:mr-4"
            />
            <p className="text-base sm:text-lg font-semibold">Our Services</p>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 md:mb-16 ml-0"
            variants={bottomAnimation}
          >
            Luxury Interiors
            <br />
            That Redefine Your Space
          </motion.h2>

          {/* Interactive Projects Section */}
          <motion.div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8" variants={container}>
            {/* Left Side - Project Names */}
            <motion.div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 md:space-y-8" variants={container}>
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  onMouseEnter={() => handleProjectHover(index)}
                  onClick={() => handleProjectClick(index)}
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light cursor-pointer transition-all duration-300 ${
                    selectedProject === index ? "text-black font-normal" : "text-gray-400 hover:text-gray-600"
                  }`}
                  variants={leftAnimation}
                >
                  {project.name}
                </motion.div>
              ))}
              {/* Decorative architectural pattern image - Hidden on mobile */}
              <motion.div className="mt-12 absolute left-0 hidden md:block" variants={bottomAnimation}>
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/p1-bg-img-1.webp"
                  alt="Architectural Pattern"
                  className="w-36 sm:w-48 h-36 sm:h-48 object-cover rounded-lg"
                />
              </motion.div>
            </motion.div>

            {/* Right Side - Project Image */}
            <motion.div className="w-full lg:w-1/2 mt-6 lg:mt-0" variants={rightAnimation}>
              <div className="relative overflow-hidden">
                <motion.img
                  key={selectedProject}
                  src={projects[selectedProject].image || "/placeholder.svg"}
                  alt={projects[selectedProject].name}
                  className="w-full lg:w-[80%] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] object-cover rounded-lg"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        ref={contactRef}
        className="bg-white py-8 sm:py-12 md:py-16 lg:py-20"
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
              <form className="space-y-5 sm:space-y-6 md:space-y-8" onSubmit={handleSubmit}>
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

                {/* Checkbox and Description */}
                <motion.div className="flex items-start space-x-3 sm:space-x-4 mt-6 sm:mt-8 lg:mt-12" variants={fadeIn}>
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
              <div className="absolute top-40 right-0 w-80 h-[390px] sm:h-[500px] rounded-lg flex items-center justify-center overflow-hidden">
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
  )
}

export default Services
