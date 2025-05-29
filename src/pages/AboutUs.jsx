"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"

const About = () => {
  const [teamIndex, setTeamIndex] = useState(2) // Start with middle person (index 2)
  const [selectedAward, setSelectedAward] = useState(1) // Start with second award (2012) selected
  const [selectedProcess, setSelectedProcess] = useState(-1) // For work process hover

  const awards = [
    {
      year: "2019",
      title: "World Architecture Fest",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/a5-item-img-1.webp",
    },
    {
      year: "2012",
      title: "International Architecture Awards",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/a5-item-img-2.webp",
    },
    {
      year: "2016",
      title: "Best In Modern Architecture",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/a5-item-img-3.webp",
    },
    {
      year: "2018",
      title: "Leading The Way In Design",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/a5-item-img-4.webp",
    },
    {
      year: "2022",
      title: "Outstanding Architectural Innovations",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/a5-item-img-5.webp",
    },
    {
      year: "2024",
      title: "Architectural Achievements In Focus",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/a5-item-img-4.webp",
    },
  ]

  const teamMembers = [
    {
      name: "Jessica Smith",
      position: "Lead Architect",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/t1-img-4.webp",
    },
    {
      name: "Michael Johnson",
      position: "Interior Designer",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/t1-img-4.webp",
    },
    {
      name: "Marox Woller",
      position: "Manager IT Support",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/t1-img-3.webp",
    },
    {
      name: "Emily Davis",
      position: "Project Manager",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/t1-img-4.webp",
    },
    {
      name: "David Wilson",
      position: "Senior Designer",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/t1-img-3.webp",
    },
    {
      name: "Sarah Brown",
      position: "Creative Director",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/t1-img-6.webp",
    },
    {
      name: "James Miller",
      position: "Construction Manager",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/t1-img-4.webp",
    },
  ]

  const handleTeamNavigation = (direction) => {
    if (direction === "next") {
      setTeamIndex((prev) => (prev + 1) % teamMembers.length)
    } else {
      setTeamIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
    }
  }

  const getVisibleTeamMembers = () => {
    const visible = []
    for (let i = -2; i <= 2; i++) {
      const index = (teamIndex + i + teamMembers.length) % teamMembers.length
      visible.push({
        ...teamMembers[index],
        isCenter: i === 0,
        position: i,
      })
    }
    return visible
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
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [videoRef, videoInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [teamRef, teamInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [awardsRef, awardsInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [processRef, processInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [newVideoRef, newVideoInView] = useInView({ threshold: 0.2, triggerOnce: false })
  const [leaderRef, leaderInView] = useInView({ threshold: 0.2, triggerOnce: false })

  return (
    <div className="m-0 p-0 overflow-x-hidden">
      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navbar />
      </div>

      {/* About Us Header with Dark Overlay */}
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
          About
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
          <span className="text-orange-500">ABOUT</span>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        className="bg-white py-12 sm:py-16 md:py-20"
        variants={container}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-4">
          {/* Feature Icons */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20"
            variants={container}
          >
            {/* Feature 1 */}
            <motion.div className="text-center" variants={leftAnimation}>
              <div className="flex justify-center mb-3 sm:mb-4">
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/cf-icon-1.webp"
                  alt="Architectural Building"
                  className="w-16 sm:w-20 h-16 sm:h-20"
                />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Architectural Building</h3>
              <p className="text-gray-600 text-sm sm:text-base">Favorable orientation</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div className="text-center" variants={leftAnimation}>
              <div className="flex justify-center mb-3 sm:mb-4">
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/cf-icon-2.webp"
                  alt="Development"
                  className="w-16 sm:w-20 h-16 sm:h-20"
                />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Development</h3>
              <p className="text-gray-600 text-sm sm:text-base">Growth and progress</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div className="text-center" variants={leftAnimation}>
              <div className="flex justify-center mb-3 sm:mb-4">
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/cf-icon-3.webp"
                  alt="Execution"
                  className="w-16 sm:w-20 h-16 sm:h-20"
                />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Execution</h3>
              <p className="text-gray-600 text-sm sm:text-base">Effective implementation</p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div className="text-center" variants={leftAnimation}>
              <div className="flex justify-center mb-3 sm:mb-4">
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/cf-icon-4.webp"
                  alt="Natural Light Home"
                  className="w-16 sm:w-20 h-16 sm:h-20"
                />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Natural Light Home</h3>
              <p className="text-gray-600 text-sm sm:text-base">Bright, Airy, Tranquil</p>
            </motion.div>
          </motion.div>

          {/* Custom Interiors Section */}
          <motion.div className="mb-8 sm:mb-12 md:mb-16" variants={leftAnimation}>
            <div className="flex items-center mb-3 sm:mb-4">
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                alt="Star"
                className="w-6 sm:w-8 h-6 sm:h-8 mr-3 sm:mr-4"
              />
              <p className="text-base sm:text-lg font-semibold">We're Investing SINCE 1990</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Custom Interiors
              <br />
              Award Winning Interior Design
            </h2>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            className="mb-8 sm:mb-12 md:mb-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
            variants={container}
          >
            <motion.div variants={fadeIn}>
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/a1-img-1.webp"
                alt="Modern Architecture Villa"
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover rounded-lg"
              />
            </motion.div>
            <motion.div variants={fadeIn}>
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/a1-img-2.webp"
                alt="Interior Design Living Room"
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover rounded-lg"
              />
            </motion.div>
            <motion.div variants={fadeIn}>
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/a1-img-3.webp"
                alt="Architectural Details"
                className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover rounded-lg"
              />
            </motion.div>
          </motion.div>

          {/* Text and Button Section */}
          <motion.div
            className="mb-8 sm:mb-12 md:mb-16 flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8"
            variants={leftAnimation}
          >
            <div className="w-full lg:w-4/5">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                Our professionals manage every phase of the project
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2">
                From start to finish. <span className="font-bold">Save time, reduces stress & ensure a</span>
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">cohesive look throughout your space.</p>
            </div>
            <div className="w-full lg:w-auto">
              <a
                href="#"
                className="inline-flex items-center bg-[#ff5e14] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-sm sm:text-base"
              >
                LEARN MORE ABOUT
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 sm:h-5 w-4 sm:w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Statistics Section */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            variants={container}
          >
            {/* Projects Completed */}
            <motion.div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg text-center" variants={fadeIn}>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                Projects Completed
              </h3>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                {featuresInView ? <CountUp end={15} duration={2} /> : "0"}
                <span className="text-orange-500">K+</span>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Showcasing innovative architecture through completed landmark projects.
              </p>
            </motion.div>

            {/* Years Of Experience */}
            <motion.div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg text-center" variants={fadeIn}>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                Years Of Experience
              </h3>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                {featuresInView ? <CountUp end={23} duration={2} /> : "0"}
                <span className="text-orange-500">+</span>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Over a decade of expertise crafting innovative architectural solutions.
              </p>
            </motion.div>

            {/* Client Satisfaction Rate */}
            <motion.div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg text-center" variants={fadeIn}>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                Client Satisfaction Rate
              </h3>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                {featuresInView ? <CountUp end={98} duration={2} /> : "0"}
                <span className="text-orange-500">%</span>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                98% client satisfaction rate achieved through exceptional architectural services.
              </p>
            </motion.div>

            {/* Award Winning */}
            <motion.div className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg text-center" variants={fadeIn}>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                Award Winning
              </h3>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                {featuresInView ? <CountUp end={21} duration={2} /> : "0"}
                <span className="text-orange-500">+</span>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Transforming visions into award-winning architectural designs timeless elegance.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Video Section */}
      <motion.div
        ref={videoRef}
        className="mb-8 sm:mb-12 md:mb-16"
        variants={fadeIn}
        initial="hidden"
        animate={videoInView ? "visible" : "hidden"}
      >
        <div className="w-full">
          <img
            src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/v1-img-1.webp"
            alt="Modern Architecture Building"
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
          />
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.section
        ref={teamRef}
        className="bg-white py-12 sm:py-16 md:py-20"
        variants={container}
        initial="hidden"
        animate={teamInView ? "visible" : "hidden"}
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
              <p className="text-base sm:text-lg font-semibold">Our Team</p>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Meet Our Team</h2>
          </motion.div>

          {/* Team Carousel - Mobile: Single card, Desktop: Multiple cards */}
          <div className="relative">
            {/* Mobile View - Single Card */}
            <div className="block lg:hidden">
              <motion.div className="flex justify-center mb-6" variants={fadeIn}>
                <div className="w-80 h-96 relative">
                  <img
                    src={teamMembers[teamIndex].image || "/placeholder.svg"}
                    alt={teamMembers[teamIndex].name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-[#ff5e14] text-white p-4 rounded-b-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{teamMembers[teamIndex].name}</h3>
                        <p className="text-sm">{teamMembers[teamIndex].position}</p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">
                          <span className="text-white text-sm">f</span>
                        </div>
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">
                          <span className="text-white text-sm">@</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Desktop View - Multiple Cards */}
            <div className="hidden lg:block">
              <motion.div className="flex items-center justify-center space-x-4 mb-8" variants={container}>
                {getVisibleTeamMembers().map((member, index) => (
                  <motion.div
                    key={`${member.name}-${index}`}
                    className={`relative transition-all duration-500 ${
                      member.isCenter ? "w-80 h-96" : "w-64 h-80 opacity-70"
                    }`}
                    variants={fadeIn}
                  >
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {member.isCenter && (
                      <div className="absolute bottom-0 left-0 right-0 bg-[#ff5e14] text-white p-4 rounded-b-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-sm">{member.position}</p>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">
                              <span className="text-white text-sm">f</span>
                            </div>
                            <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">
                              <span className="text-white text-sm">@</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center space-x-4 mb-6 sm:mb-8">
              <button
                onClick={() => handleTeamNavigation("prev")}
                className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange-500 transition-colors"
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => handleTeamNavigation("next")}
                className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange-500 transition-colors"
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2 mb-8 sm:mb-12 md:mb-16">
              {teamMembers.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${index === teamIndex ? "bg-orange-500" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Awards Section */}
      <motion.section
        ref={awardsRef}
        className="bg-white py-12 sm:py-16 md:py-20"
        variants={container}
        initial="hidden"
        animate={awardsInView ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
            {/* Left Side - Title and Single Image */}
            <motion.div className="w-full lg:w-1/2" variants={leftAnimation}>
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-300 mr-3 sm:mr-4">08</span>
                  <span className="text-base sm:text-lg font-semibold">Award</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                  Showcasing Our
                  <br />
                  Prestigious Achieved
                  <br />
                  Awards
                </h2>
              </div>

              {/* Single Architectural Image */}
              <div>
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/a5-img-1-1.webp"
                  alt="Modern Architecture"
                  className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover rounded-lg"
                />
              </div>
            </motion.div>

            {/* Right Side - Awards List with Overlay Images */}
            <motion.div className="w-full lg:w-1/2" variants={rightAnimation}>
              <div className="space-y-4 sm:space-y-6">
                {awards.map((award, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setSelectedAward(index)}
                    onMouseLeave={() => setSelectedAward(1)} // Reset to default (2012)
                    onClick={() => setSelectedAward(selectedAward === index ? 1 : index)} // Toggle on mobile
                  >
                    <div
                      className={`flex items-center justify-between p-4 sm:p-6 rounded-lg border transition-all duration-300 cursor-pointer ${
                        selectedAward === index
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center">
                        <span
                          className={`text-2xl sm:text-3xl lg:text-4xl font-bold mr-4 sm:mr-6 ${
                            selectedAward === index ? "text-white" : "text-gray-300"
                          }`}
                        >
                          {award.year}
                        </span>
                        <span className="text-base sm:text-lg lg:text-xl font-semibold">{award.title}</span>
                      </div>
                      <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 rounded-full border-2 border-current flex items-center justify-center">
                        <svg
                          className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Award Image Overlay - appears on hover/click */}
                    {selectedAward === index && (
                      <div className="absolute top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-black bg-opacity-80 rounded-lg">
                        <img
                          src={award.image || "/placeholder.svg"}
                          alt={award.title}
                          className="max-w-[90%] max-h-[90%] object-contain rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Work Process Section */}
      <motion.section
        ref={processRef}
        className="relative py-12 sm:py-16 md:py-20"
        style={{
          backgroundImage: `url('https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/w5-bg-img.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        variants={container}
        initial="hidden"
        animate={processInView ? "visible" : "hidden"}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-60"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div className="mb-8 sm:mb-12 md:mb-16" variants={bottomAnimation}>
            <div className="flex items-center mb-4 sm:mb-6">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-300 mr-3 sm:mr-4">05</span>
              <span className="text-base sm:text-lg font-semibold">Work Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Streamlined Architecture Process
              <br />
              For Exceptional Results.
            </h2>
          </motion.div>

          {/* Process Cards - Responsive Grid */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" variants={container}>
            {/* Card 1 - Initial Consultation */}
            <motion.div
              className="relative group cursor-pointer"
              variants={fadeIn}
              onMouseEnter={() => setSelectedProcess(0)}
              onMouseLeave={() => setSelectedProcess(-1)}
              onClick={() => setSelectedProcess(selectedProcess === 0 ? -1 : 0)} // Toggle on mobile
            >
              <div
                className={`p-4 sm:p-6 border-2 rounded-lg transition-all duration-300 relative overflow-hidden ${
                  selectedProcess === 0
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-200 hover:border-gray-400"
                }`}
                style={{ minHeight: "280px" }}
              >
                {/* Large Background Number */}
                <div
                  className={`absolute bottom-4 right-4 text-6xl sm:text-7xl lg:text-8xl font-bold opacity-50 select-none ${
                    selectedProcess === 0 ? "text-white" : "text-gray-100"
                  }`}
                >
                  01
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-current flex items-center justify-center">
                      <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3
                    className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${selectedProcess === 0 ? "text-white" : "text-black"}`}
                  >
                    Initial Consultation
                  </h3>
                  <p className={`text-sm leading-relaxed ${selectedProcess === 0 ? "text-white" : "text-gray-600"}`}>
                    We begin by understanding your vision, goals, and needs, followed brainstor.
                  </p>
                </div>
              </div>

              {/* Process Image Overlay */}
              {selectedProcess === 0 && (
                <div className="absolute top-0 left-0 right-0 bottom-0 z-20 flex items-center justify-center bg-black bg-opacity-90 rounded-lg">
                  <img
                    src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/w5-img-1.webp"
                    alt="Initial Consultation"
                    className="max-w-[85%] max-h-[85%] object-contain rounded-lg"
                  />
                </div>
              )}
            </motion.div>

            {/* Card 2 - Design & Planning */}
            <motion.div
              className="relative group cursor-pointer"
              variants={fadeIn}
              onMouseEnter={() => setSelectedProcess(1)}
              onMouseLeave={() => setSelectedProcess(-1)}
              onClick={() => setSelectedProcess(selectedProcess === 1 ? -1 : 1)}
            >
              <div
                className={`p-4 sm:p-6 border-2 rounded-lg transition-all duration-300 relative overflow-hidden ${
                  selectedProcess === 1
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-200 hover:border-gray-400"
                }`}
                style={{ minHeight: "280px" }}
              >
                <div
                  className={`absolute bottom-4 right-4 text-6xl sm:text-7xl lg:text-8xl font-bold opacity-50 select-none ${
                    selectedProcess === 1 ? "text-white" : "text-gray-100"
                  }`}
                >
                  02
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-current flex items-center justify-center">
                      <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3
                    className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${selectedProcess === 1 ? "text-white" : "text-black"}`}
                  >
                    Design & Planning
                  </h3>
                  <p className={`text-sm leading-relaxed ${selectedProcess === 1 ? "text-white" : "text-gray-600"}`}>
                    Our team creates detailed designs that reflect your requirements.
                  </p>
                </div>
              </div>

              {selectedProcess === 1 && (
                <div className="absolute top-0 left-0 right-0 bottom-0 z-20 flex items-center justify-center bg-black bg-opacity-90 rounded-lg">
                  <img
                    src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/w5-img-2.webp"
                    alt="Design & Planning"
                    className="max-w-[85%] max-h-[85%] object-contain rounded-lg"
                  />
                </div>
              )}
            </motion.div>

            {/* Card 3 - Implementation */}
            <motion.div
              className="relative group cursor-pointer"
              variants={fadeIn}
              onMouseEnter={() => setSelectedProcess(2)}
              onMouseLeave={() => setSelectedProcess(-1)}
              onClick={() => setSelectedProcess(selectedProcess === 2 ? -1 : 2)}
            >
              <div
                className={`p-4 sm:p-6 border-2 rounded-lg transition-all duration-300 relative overflow-hidden ${
                  selectedProcess === 2
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-200 hover:border-gray-400"
                }`}
                style={{ minHeight: "280px" }}
              >
                <div
                  className={`absolute bottom-4 right-4 text-6xl sm:text-7xl lg:text-8xl font-bold opacity-50 select-none ${
                    selectedProcess === 2 ? "text-white" : "text-gray-100"
                  }`}
                >
                  03
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-current flex items-center justify-center">
                      <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3
                    className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${selectedProcess === 2 ? "text-white" : "text-black"}`}
                  >
                    Implementation
                  </h3>
                  <p className={`text-sm leading-relaxed ${selectedProcess === 2 ? "text-white" : "text-gray-600"}`}>
                    With carefully selected contractors, we manage every phase.
                  </p>
                </div>
              </div>

              {selectedProcess === 2 && (
                <div className="absolute top-0 left-0 right-0 bottom-0 z-20 flex items-center justify-center bg-black bg-opacity-90 rounded-lg">
                  <img
                    src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/w5-img-3.webp"
                    alt="Implementation"
                    className="max-w-[85%] max-h-[85%] object-contain rounded-lg"
                  />
                </div>
              )}
            </motion.div>

            {/* Card 4 - Project Handover */}
            <motion.div
              className="relative group cursor-pointer"
              variants={fadeIn}
              onMouseEnter={() => setSelectedProcess(3)}
              onMouseLeave={() => setSelectedProcess(-1)}
              onClick={() => setSelectedProcess(selectedProcess === 3 ? -1 : 3)}
            >
              <div
                className={`p-4 sm:p-6 border-2 rounded-lg transition-all duration-300 relative overflow-hidden ${
                  selectedProcess === 3
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-200 hover:border-gray-400"
                }`}
                style={{ minHeight: "280px" }}
              >
                <div
                  className={`absolute bottom-4 right-4 text-6xl sm:text-7xl lg:text-8xl font-bold opacity-50 select-none ${
                    selectedProcess === 3 ? "text-white" : "text-gray-100"
                  }`}
                >
                  04
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-current flex items-center justify-center">
                      <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3
                    className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${selectedProcess === 3 ? "text-white" : "text-black"}`}
                  >
                    Project Handover
                  </h3>
                  <p className={`text-sm leading-relaxed ${selectedProcess === 3 ? "text-white" : "text-gray-600"}`}>
                    Upon completion, we conduct a thorough review, making sure all details.
                  </p>
                </div>
              </div>

              {selectedProcess === 3 && (
                <div className="absolute top-0 left-0 right-0 bottom-0 z-20 flex items-center justify-center bg-black bg-opacity-90 rounded-lg">
                  <img
                    src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/w5-img-4.webp"
                    alt="Project Handover"
                    className="max-w-[85%] max-h-[85%] object-contain rounded-lg"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* New Video Section with Dark Overlay */}
      <motion.div
        ref={newVideoRef}
        className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://themexriver.com/wp/barsi/wp-content/uploads/2025/04/ch4-bg-img-1.webp')`,
        }}
        variants={fadeIn}
        initial="hidden"
        animate={newVideoInView ? "visible" : "hidden"}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </motion.div>

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

export default About
