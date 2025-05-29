"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"
import Navbar from "../components/Navbar"
import axios from "axios"

const Home = () => {
  const [translateX, setTranslateX] = useState(0)
  const [selectedProject, setSelectedProject] = useState(0)
  const [recentWorkTranslateX, setRecentWorkTranslateX] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [teamIndex, setTeamIndex] = useState(2)
  const [faqCategory, setFaqCategory] = useState("general")
  const [expandedFaq, setExpandedFaq] = useState(0)
  const carouselRef = useRef(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isChecked, setIsChecked] = useState(false)

  // Intersection observers for counting animations
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: contactRef, inView: contactInView } = useInView({ triggerOnce: true, threshold: 0.5 })

  const images = [
    "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/a1-img-1.webp",
    "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/a1-img-2.webp",
    "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/a1-img-3.webp",
    "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/a1-img-4.webp",
  ]

  const projects = [
    { name: "Poolscape Villa", image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/p1-img-1.webp" },
    {
      name: "European Lard Station",
      image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/p1-img-2.webp",
    },
    { name: "Dalbourne Villa", image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/p1-img-3.webp" },
    { name: "Music Theatre", image: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/p1-img-3.webp" },
  ]

  const recentWorkImages = [
    "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/s1-img-1.webp",
    "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/s1-img-2.webp",
    "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/s1-img-3.webp",
    "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/s1-img-4.webp",
    "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/s1-img-5.webp",
  ]

  const testimonials = [
    {
      authorImage: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/t1-author-2.webp",
      mainImage: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/t1-img-1-1.webp",
      name: "Jhenko Danial",
      position: "Marketing Manager",
      text: "Our professionals manage every phase of the project From start to finish. Save time, reduces stress & ensure a cohesive look throughout your space.",
    },
    {
      authorImage: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/t1-author-1.webp",
      mainImage: "https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/t1-img-2.webp",
      name: "Sarah Johnson",
      position: "Project Director",
      text: "Our professionals manage every phase of the project From start to finish. Save time, reduces stress & ensure a cohesive look throughout your space.",
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
    { name: "Emily Davis", position: "Project Manager", image: "" },
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

  const faqData = {
    general: [
      { title: "Capturing The Essence Of Home", content: "Architecture and interior design studio based in Dubai..." },
      {
        title: "Reinventing Reclaimed Wood",
        content: "Our sustainable approach to architecture focuses on using reclaimed materials...",
      },
      { title: "Inspiring Presence Of Design", content: "Every space we create tells a story..." },
      {
        title: "Great Architecture Is The Design",
        content: "We believe that exceptional architecture goes beyond mere construction...",
      },
    ],
    pricing: [
      { title: "Transparent Pricing Structure", content: "Our pricing is straightforward and transparent..." },
      {
        title: "Flexible Payment Options",
        content: "We offer various payment plans to accommodate different budgets...",
      },
      { title: "Value-Based Investment", content: "Our pricing reflects the value we deliver..." },
      { title: "Cost Optimization Strategies", content: "We work closely with clients to optimize costs..." },
    ],
    dashboard: [
      { title: "Real-Time Project Tracking", content: "Monitor your project progress in real-time..." },
      { title: "Interactive Design Collaboration", content: "Collaborate directly with our design team..." },
      { title: "Resource Management System", content: "Access detailed information about materials..." },
      { title: "Performance Analytics", content: "Gain insights into project performance..." },
    ],
    api: [
      { title: "RESTful API Integration", content: "Our robust RESTful API allows seamless integration..." },
      { title: "Developer-Friendly Documentation", content: "Comprehensive API documentation with code examples..." },
      { title: "Scalable Architecture", content: "Built on scalable cloud infrastructure..." },
      { title: "Security & Compliance", content: "Enterprise-grade security with OAuth 2.0 authentication..." },
    ],
  }

  const allImages = [...images, ...images]
  const allRecentWorkImages = [...recentWorkImages, ...recentWorkImages]

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((prev) => {
        const newTranslateX = prev - 33.33
        if (newTranslateX <= -133.32) return 0
        return newTranslateX
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setRecentWorkTranslateX((prev) => {
        const newTranslateX = prev - 25
        const imageWidth = 25
        const totalImages = recentWorkImages.length
        const newIndex = Math.floor(Math.abs(newTranslateX) / imageWidth) % totalImages
        setCurrentImageIndex(newIndex)
        if (newTranslateX <= -(totalImages * imageWidth)) {
          setCurrentImageIndex(0)
          return 0
        }
        return newTranslateX
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [recentWorkImages.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleProjectHover = (index) => setSelectedProject(index)
  const handleProjectClick = (index) => setSelectedProject(index)

  const handleTeamNavigation = (direction) => {
    setTeamIndex((prev) => {
      if (direction === "next") return (prev + 1) % teamMembers.length
      return (prev - 1 + teamMembers.length) % teamMembers.length
    })
  }

  const getVisibleTeamMembers = () => {
    const visible = []
    for (let i = -2; i <= 2; i++) {
      const index = (teamIndex + i + teamMembers.length) % teamMembers.length
      visible.push({ ...teamMembers[index], isCenter: i === 0, position: i })
    }
    return visible
  }

  const handleFaqCategoryChange = (category) => {
    setFaqCategory(category)
    setExpandedFaq(0)
  }

  const toggleFaq = (index) => setExpandedFaq(expandedFaq === index ? -1 : index)

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked)
  }

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

  const leftAnimation = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
  }

  const bottomAnimation = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
  }

  const rightAnimation = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <motion.div
        className="min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url('https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/h1-bg.webp')" }}
      >
        <Navbar />

        {/* Mobile Hero Content */}
        <div className="block lg:hidden px-4 pt-24 pb-8">
          <motion.h1
            className="text-white text-4xl sm:text-5xl font-bold mb-8"
            variants={leftAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            Luxury.
          </motion.h1>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-transparent mb-4"
            style={{ WebkitTextStroke: "1px white" }}
            variants={leftAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            Architectural
          </motion.h2>
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-transparent mb-4"
            style={{ WebkitTextStroke: "1px white" }}
            variants={leftAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            Building Project
          </motion.h2>
          <motion.h1
            className="text-white text-4xl sm:text-5xl font-bold mb-8"
            variants={leftAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            Management.
          </motion.h1>

          <motion.div
            className="mb-8"
            variants={bottomAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <img
              src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/h1-img-2.webp"
              alt="Modern Architecture"
              className="w-full h-[300px] sm:h-[400px] object-cover rounded-md mb-4"
            />
          </motion.div>

         {/* Counter and Building Image Side by Side */}
         <motion.div
            className="flex mb-8" 
            variants={leftAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {/* Left side - Building Image */}
            <div className="w-1/3 -mt-[50px]">
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/h1-img-1.webp"
                alt="Modern Building"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Right side - Counter (smaller width) */}
            <div className="w-2/3">
              <motion.div
                className="bg-[#e6eef8] p-4 sm:p-6 shadow-lg rounded-lg"
                ref={heroRef}
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <div className="bg-[#ff5e14] py-2 sm:py-3 px-4 sm:px-6 -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 mb-1 sm:mb-1 rounded-t-lg">
                  <h2 className="text-white text-xs sm:text-sm font-bold">
                    WE'RE INVESTING SINCE 1000
                  </h2>
                </div>

                <div className="flex items-center justify-center space-x-4 sm:space-x-6">
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-black">
                      <span className="block lg:hidden">250</span>
                      <span className="hidden lg:block">
                        {heroInView ? <CountUp start={0} end={250} duration={2} /> : 0}
                      </span>
                    </p>
                    <p className="text-xs uppercase font-semibold mt-1 sm:mt-2">PROJECTS</p>
                  </div>
                  <div className="text-xl text-gray-400">✱</div>
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-black">
                      <span className="block lg:hidden">18</span>
                      <span className="hidden lg:block">
                        {heroInView ? <CountUp start={0} end={18} duration={2} /> : 0}
                      </span>
                    </p>
                    <p className="text-xs uppercase font-semibold mt-1 sm:mt-2">AWARDS</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div variants={leftAnimation} initial="hidden" whileInView="visible" viewport={{ once: false }}>
            <a
              href="#"
              className="inline-flex items-center bg-[#ff5e14] text-white font-bold py-3 px-6 rounded-full text-sm sm:text-base"
            >
              MANAGE MY PROJECT
              <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>
        {/* Desktop Hero Content */}
        <div className="hidden lg:block">
          <div className="absolute top-36 right-20 max-w-lg">
            <motion.h2
              className="text-white text-4xl font-bold"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              We Invested $430 Millions Every
              <br />
              Renovative Projects
            </motion.h2>
            <motion.div
              className="mt-8"
              variants={bottomAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/h1-img-2.webp"
                alt="Modern Architecture"
                className="w-full h-[800px] object-cover rounded-md"
              />
            </motion.div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-start md:-ml-16">
              <div className="w-full md:w-1/4 md:mb-0 relative">
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/h1-img-1.webp"
                  alt="Building"
                  className="w-full max-w-xs"
                />
              </div>
              <motion.div
                className="w-full md:w-2/3 flex justify-start mt-33 md:mt-44"
                style={{ marginLeft: "-10px" }}
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <div
                  className="relative bg-[#e6eef8] p-8 shadow-lg w-full max-w-md"
                  style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
                  ref={heroRef}
                >
                  <motion.div
                    className="absolute -top-0 left-0 right-0 bg-[#ff5e14] py-4 px-8"
                    variants={leftAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                  >
                    <h2 className="text-white text-lg font-bold">WE'RE INVESTING SINCE 1000</h2>
                  </motion.div>
                  <motion.div
                    className="mt-16 flex items-center justify-center space-x-12"
                    variants={leftAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                  >
                    <div className="text-center">
                      <p className="text-6xl font-bold text-black">
                        {heroInView ? <CountUp start={0} end={250} duration={2} /> : 0}
                      </p>
                      <p className="text-sm uppercase font-semibold mt-2">PROJECTS</p>
                    </div>
                    <div className="text-4xl text-gray-400">✱</div>
                    <div className="text-center">
                      <p className="text-6xl font-bold text-black">
                        {heroInView ? <CountUp start={0} end={18} duration={2} /> : 0}
                      </p>
                      <p className="text-sm uppercase font-semibold mt-2">AWARDS</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <motion.div className="mt-20 md:mt-32 max-w-3xl">
              <motion.h1
                className="text-white text-6xl md:text-7xl font-bold"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                Luxury.
              </motion.h1>
              <motion.h2
                className="text-7xl md:text-8xl font-bold text-transparent"
                style={{ WebkitTextStroke: "1px white" }}
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                Architectural
              </motion.h2>
              <motion.h2
                className="text-7xl md:text-8xl font-bold text-transparent"
                style={{ WebkitTextStroke: "1px white" }}
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                Building Project
              </motion.h2>
              <motion.h1
                className="text-white text-6xl md:text-7xl font-bold mt-2"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                Management.
              </motion.h1>
              <motion.div
                className="mt-10"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <a
                  href="#"
                  className="inline-flex items-center bg-[#ff5e14] text-white font-bold py-4 px-8 rounded-full"
                >
                  MANAGE MY PROJECT
                  <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div className="bg-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
            <div className="text-center">
              <div className="flex justify-center mb-3 sm:mb-4">
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/cf-icon-1.webp"
                  alt="Architectural Building"
                  className="w-16 sm:w-20 h-16 sm:h-20 hover:animate-rotate360"
                />
              </div>
              <motion.h3
                className="text-lg sm:text-xl lg:text-2xl font-bold mb-2"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                Architectural Building
              </motion.h3>
              <motion.p
                className="text-gray-600 text-sm sm:text-base"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                Favorable orientation
              </motion.p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-3 sm:mb-4">
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/cf-icon-2.webp"
                  alt="Development"
                  className="w-16 sm:w-20 h-16 sm:h-20"
                />
              </div>
              <motion.h3
                className="text-lg sm:text-xl lg:text-2xl font-bold mb-2"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                Development
              </motion.h3>
              <motion.p
                className="text-gray-600 text-sm sm:text-base"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                Growth and progress
              </motion.p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-3 sm:mb-4">
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/cf-icon-3.webp"
                  alt="Execution"
                  className="w-16 sm:w-20 h-16 sm:h-20"
                />
              </div>
              <motion.h3
                className="text-lg sm:text-xl lg:text-2xl font-bold mb-2"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                Execution
              </motion.h3>
              <motion.p
                className="text-gray-600 text-sm sm:text-base"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                Effective implementation
              </motion.p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-3 sm:mb-4">
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/cf-icon-4.webp"
                  alt="Natural Light Home"
                  className="w-16 sm:w-20 h-16 sm:h-20"
                />
              </div>
              <motion.h3
                className="text-lg sm:text-xl lg:text-2xl font-bold mb-2"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                Natural Light Home
              </motion.h3>
              <motion.p
                className="text-gray-600 text-sm sm:text-base"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                Bright, Airy, Tranquil
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className="mb-8 sm:mb-12 md:mb-16"
            variants={leftAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <motion.div
              className="flex items-center mb-3 sm:mb-4"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                alt="Star"
                className="w-6 sm:w-8 h-6 sm:h-8 mr-3 sm:mr-4"
              />
              <p className="text-base sm:text-lg font-semibold">We're Investing SINCE 1990</p>
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              Custom Interiors
              <br />
              Award Winning Interior Design
            </motion.h2>
          </motion.div>

          <motion.div className="mb-8 sm:mb-12 md:mb-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 overflow-hidden">
            {allImages.slice(0, 3).map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Architecture ${index + 1}`}
                  className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover rounded-lg"
                />
              </div>
            ))}
          </motion.div>

          <motion.div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8">
            <motion.div
              className="w-full lg:w-4/5"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                Our professionals manage every phase of the project
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2">
                From start to finish. <span className="font-bold">Save time, reduces stress & ensure a</span>
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">cohesive look throughout your space.</p>
            </motion.div>
            <motion.div
              className="w-full lg:w-auto"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <a
                href="#"
                className="inline-flex items-center bg-[#ff5e14] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-sm sm:text-base"
              >
                LEARN MORE ABOUT
                <svg className="h-4 sm:h-5 w-4 sm:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.div className="bg-white pt-12 sm:pt-16 md:pt-20 pb-0">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex items-center mb-6 sm:mb-8"
            variants={leftAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <img
              src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
              alt="Star"
              className="w-6 sm:w-8 h-6 sm:h-8 mr-3 sm:mr-4"
            />
            <p className="text-base sm:text-lg font-semibold">Our Services</p>
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 md:mb-16"
            variants={leftAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            Luxury Interiors
            <br />
            That Redefine Your Space
          </motion.h2>
          <motion.div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
            <motion.div
              className="w-full lg:w-1/2 space-y-6 sm:space-y-8"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  onMouseEnter={() => handleProjectHover(index)}
                  onClick={() => handleProjectClick(index)}
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light cursor-pointer transition-all duration-300 ${
                    selectedProject === index ? "text-black font-normal" : "text-gray-400 hover:text-gray-600"
                  }`}
                  variants={leftAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                >
                  {project.name}
                </motion.div>
              ))}
              <motion.div
                className="mt-8 hidden md:block"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: false }}
              >
                {/* <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/p1-bg-img-1.webp"
                  alt="Architectural Pattern"
                  className="w-36 sm:w-48 h-36 sm:h-48 object-cover rounded-lg"
                /> */}
              </motion.div>
            </motion.div>
            <motion.div
              className="w-full lg:w-1/2"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <div className="relative overflow-hidden">
                <img
                  key={selectedProject}
                  src={projects[selectedProject].image || "/placeholder.svg"}
                  alt={projects[selectedProject].name}
                  className="w-full lg:w-[80%] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] object-cover rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Video Section */}
      <motion.div className="mt-8 sm:mt-12 md:mt-16">
        <div className="w-full">
          <motion.div variants={bottomAnimation} initial="hidden" whileInView="visible" viewport={{ once: false }}>
            <img
              src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/v1-img-1.webp"
              alt="Modern Architecture Building"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Recent Work Section */}
      <motion.div className="bg-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div className="flex flex-col lg:flex-row justify-between items-start mb-8 sm:mb-12 md:mb-16 gap-6 lg:gap-8">
            <motion.div variants={leftAnimation} initial="hidden" whileInView="visible" viewport={{ once: false }}>
              <motion.div
                className="flex items-center mb-6 sm:mb-8"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                  alt="Star"
                  className="w-6 sm:w-8 h-6 sm:h-8 mr-3 sm:mr-4"
                />
                <p className="text-base sm:text-lg font-semibold">Recent Work</p>
              </motion.div>
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                Interior Design With
                <br />
                Different Approach
              </motion.h2>
            </motion.div>
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <div className="relative">
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-gray-400">
                  <line x1="10" y1="10" x2="30" y2="30" stroke="currentColor" strokeWidth="2" />
                  <line x1="30" y1="10" x2="10" y2="30" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-4 text-lg sm:text-xl lg:text-2xl xl:text-3xl font-normal text-gray-800">
                {["All", "Culture", "Events", "News", "Research"].map((item) => (
                  <motion.span
                    key={item}
                    className="cursor-pointer hover:text-black transition-colors"
                    variants={leftAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-hidden">
            {allRecentWorkImages.slice(0, 4).map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Recent Work ${index + 1}`}
                  className="w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover rounded-lg"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div className="bg-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* Mobile Testimonials */}
          <div className="block lg:hidden">
            <div className="text-center mb-8">
              <img
                key={testimonialIndex}
                src={testimonials[testimonialIndex].authorImage || "/placeholder.svg"}
                alt={testimonials[testimonialIndex].name}
                className="w-32 h-40 object-cover rounded-lg mx-auto mb-4"
              />
              <motion.h3
                className="text-xl font-bold mb-2"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                {testimonials[testimonialIndex].name}
              </motion.h3>
              <motion.div
                className="flex items-center justify-center mb-4"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                  alt="Star"
                  className="w-4 h-4 mr-2"
                />
                <p className="text-gray-600">{testimonials[testimonialIndex].position}</p>
              </motion.div>
            </div>

            <div className="mb-8">
              <img
                key={`main-${testimonialIndex}`}
                src={testimonials[testimonialIndex].mainImage || "/placeholder.svg"}
                alt="Architecture Project"
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>

            <div className="text-center">
              <motion.div
                className="mb-6"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <motion.div
                  className="flex items-baseline justify-center mb-4"
                  variants={leftAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                >
                  <span className="text-4xl font-bold">4,8</span>
                  <span className="text-xl text-gray-500 ml-2">/5.0</span>
                </motion.div>
                <motion.div
                  className="flex justify-center mb-4"
                  variants={leftAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                >
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ★
                    </span>
                  ))}
                </motion.div>
              </motion.div>
              <motion.p
                className="text-lg leading-relaxed mb-6"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                {testimonials[testimonialIndex].text}
              </motion.p>
              <motion.div
                className="flex justify-center space-x-2"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full ${index === testimonialIndex ? "bg-orange-500 w-8" : "bg-black w-8"}`}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Desktop Testimonials */}
          <motion.div className="hidden lg:flex items-start">
            <motion.div
              className="w-1/4 text-center"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <img
                key={testimonialIndex}
                src={testimonials[testimonialIndex].authorImage || "/placeholder.svg"}
                alt={testimonials[testimonialIndex].name}
                className="w-48 h-80 object-cover rounded-lg mx-auto mb-6"
              />
              <motion.h3
                className="text-3xl font-bold mb-2"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                {testimonials[testimonialIndex].name}
              </motion.h3>
              <motion.div
                className="flex items-center justify-center mb-2"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <img
                  src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                  alt="Star"
                  className="w-4 h-4 mr-2"
                />
                <p className="text-gray-600">{testimonials[testimonialIndex].position}</p>
              </motion.div>
            </motion.div>
            <motion.div
              className="w-1/2 px-8"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <img
                key={`main-${testimonialIndex}`}
                src={testimonials[testimonialIndex].mainImage || "/placeholder.svg"}
                alt="Architecture Project"
                className="w-full h-[700px] object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              className="w-1/4 pl-8"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <motion.div
                className="mb-8"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <motion.div
                  className="flex items-baseline mb-4"
                  variants={leftAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                >
                  <span className="text-6xl font-bold">4,8</span>
                  <span className="text-2xl text-gray-500 ml-2">/5.0</span>
                </motion.div>
                <motion.div
                  className="flex mb-6"
                  variants={leftAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                >
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">
                      ★
                    </span>
                  ))}
                </motion.div>
                <motion.div
                  className="flex items-center mb-6"
                  variants={leftAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                >
                  <img
                    src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                    alt="Star"
                    className="w-6 h-6 mr-3"
                  />
                  <span className="text-lg font-semibold">
                    Our professionals manage every phase of the project From start to finish. Save time, reduces stress
                    & ensure
                  </span>
                </motion.div>
                <hr className="border-gray-300 mb-8" />
              </motion.div>
              <motion.p
                className="text-2xl leading-relaxed"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                {testimonials[testimonialIndex].text}
              </motion.p>
              <motion.div
                className="flex space-x-2"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full ${index === testimonialIndex ? "bg-orange-500 w-8" : "bg-black w-8"}`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

 {/* Contact Section */}
 <motion.div className="bg-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8 sm:mb-12 md:mb-16">
            <motion.div
              className="flex items-center justify-center mb-4 sm:mb-6"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                alt="Star"
                className="w-6 sm:w-8 h-6 sm:h-8 mr-3 sm:mr-4"
              />
              <p className="text-base sm:text-lg font-semibold">Contact Us</p>
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              Get In Touch
            </motion.h2>
          </motion.div>
          <motion.div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
            <motion.div
              className="w-full lg:w-1/2"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/c1-img-1.webp"
                alt="Modern Architecture Building"
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[600px] object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              className="w-full lg:w-1/2"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              ref={contactRef}
            >
              <form className="space-y-5 sm:space-y-6 md:space-y-8" onSubmit={handleSubmit}>
                {/* Success/Error Messages */}
                {successMessage && (
                  <motion.div
                    className="text-green-500 text-center mb-4"
                    variants={leftAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                  >
                    {successMessage}
                  </motion.div>
                )}
                {errorMessage && (
                  <motion.div
                    className="text-red-500 text-center mb-4"
                    variants={leftAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                  >
                    {errorMessage}
                  </motion.div>
                )}
                <motion.div
                  className="flex flex-col sm:flex-row sm:space-x-4 md:space-x-6 lg:space-x-8 space-y-5 sm:space-y-0"
                  variants={leftAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                >
                  <motion.div
                    className="flex-1"
                    variants={leftAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                  >
                    <motion.div
                      className="flex items-center mb-3 sm:mb-4"
                      variants={leftAnimation}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false }}
                    >
                      <img
                        src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                        alt="Star"
                        className="w-3 sm:w-4 h-3 sm:h-4 mr-2 sm:mr-3"
                      />
                      <label className="text-base sm:text-lg font-semibold">Name*</label>
                    </motion.div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border-b-2 border-black bg-transparent pb-2 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </motion.div>
                  <motion.div
                    className="flex-1"
                    variants={leftAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                  >
                    <motion.div
                      className="flex items-center mb-3 sm:mb-4"
                      variants={leftAnimation}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false }}
                    >
                      <img
                        src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                        alt="Star"
                        className="w-3 sm:w-4 h-3 sm:h-4 mr-2 sm:mr-3"
                      />
                      <label className="text-base sm:text-lg font-semibold">Email*</label>
                    </motion.div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-b-2 border-black bg-transparent pb-2 focus:outline-none focus:border-orange-500"
                      required
                    />
                  </motion.div>
                </motion.div>
                <motion.div variants={leftAnimation} initial="hidden" whileInView="visible" viewport={{ once: false }}>
                  <motion.div
                    className="flex items-center mb-3 sm:mb-4"
                    variants={leftAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                  >
                    <img
                      src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                      alt="Star"
                      className="w-3 sm:w-4 h-3 sm:h-4 mr-2 sm:mr-3"
                    />
                    <label className="text-base sm:text-lg font-semibold">Message*</label>
                  </motion.div>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border-b-2 border-black bg-transparent pb-2 focus:outline-none focus:border-orange-500 resize-none"
                    required
                  ></textarea>
                </motion.div>
                <motion.div
                  className="flex items-start space-x-3 sm:space-x-4 mt-6 sm:mt-8 lg:mt-12"
                  variants={leftAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                >
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
                <motion.div
                  className="mt-6 sm:mt-8"
                  variants={leftAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                >
                  <button
                    type="submit"
                    className="inline-flex items-center bg-[#ff5e14] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full hover:bg-orange-600 transition-colors text-sm sm:text-base"
                  >
                    CONTACT US
                    <svg className="h-4 sm:h-5 w-4 sm:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </motion.div>
                <motion.div
                  className="flex flex-row space-x-4 sm:space-x-12 lg:space-x-16 mt-8 sm:mt-12 lg:mt-16"
                  variants={leftAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                >
                  <motion.div
                    variants={leftAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="flex-1"
                  >
                    <div className="text-4xl sm:text-6xl lg:text-8xl font-bold">
                      <span className="block">{contactInView ? <CountUp start={0} end={28} duration={2} /> : 28}</span>
                    </div>
                    <div className="border-b-4 border-black w-16 sm:w-20 mb-2"></div>
                    <div className="text-xs sm:text-sm font-semibold">
                      YEARS
                      <br />
                      EXPERIENCE
                    </div>
                  </motion.div>
                  <motion.div
                    variants={leftAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="flex-1"
                  >
                    <div className="text-4xl sm:text-6xl lg:text-8xl font-bold">
                      <span className="block">{contactInView ? <CountUp start={0} end={99} duration={2} /> : 99}</span>
                    </div>
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
      </motion.div>


      {/* Team Section */}
      <motion.div className="bg-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8 sm:mb-12 md:mb-16">
            <motion.div
              className="flex items-center justify-center mb-4 sm:mb-6"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                alt="Star"
                className="w-6 sm:w-8 h-6 sm:h-8 mr-3 sm:mr-4"
              />
              <p className="text-base sm:text-lg font-semibold">Our Team</p>
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              Meet Our Team
            </motion.h2>
          </motion.div>

          {/* Mobile Team View */}
          <div className="block lg:hidden">
            <motion.div
              className="flex justify-center mb-6"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
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

          {/* Desktop Team View */}
          <div className="hidden lg:block">
            <motion.div className="relative">
              <motion.div
                className="flex items-center justify-center space-x-4 mb-8"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                {getVisibleTeamMembers().map((member, index) => (
                  <motion.div
                    key={`${member.name}-${index}`}
                    className={`relative transition-all duration-500 ${member.isCenter ? "w-80 h-96" : "w-64 h-80 opacity-70"}`}
                    variants={leftAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                  >
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {member.isCenter && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-[#ff5e14] text-white p-4 rounded-b-lg"
                        variants={leftAnimation}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                      >
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
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="flex justify-center space-x-4 mb-6 sm:mb-8"
            variants={leftAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
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
          </motion.div>
          <motion.div
            className="flex justify-center space-x-2 mb-8 sm:mb-12 md:mb-16"
            variants={leftAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {teamMembers.map((_, index) => (
              <div
                key={index}
                className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${index === teamIndex ? "bg-orange-500" : "bg-gray-300"}`}
              />
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-16 pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16 mt-8 sm:mt-12 md:mt-16 border-t border-b border-gray-200"
            variants={leftAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <motion.div
              className="text-center"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">The Architect</h3>
              <p className="text-xs sm:text-sm text-gray-600">Architecture Studio</p>
            </motion.div>
            <img
              src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
              alt="Star"
              className="w-4 sm:w-6 h-4 sm:h-6"
            />
            <motion.div
              className="text-center"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wider">ARCHITECT</h3>
              <p className="text-xs sm:text-sm text-gray-600">Premium Design</p>
            </motion.div>
            <img
              src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
              alt="Star"
              className="w-4 sm:w-6 h-4 sm:h-6"
            />
            <motion.div
              className="text-center"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">IMPERIAL</h3>
              <p className="text-xs sm:text-sm text-gray-600">REAL ESTATE AGENTS</p>
            </motion.div>
            <img
              src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
              alt="Star"
              className="w-4 sm:w-6 h-4 sm:h-6"
            />
            <motion.div
              className="text-center"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">VIRTUPS</h3>
              <p className="text-xs sm:text-sm text-gray-600">COWORKING</p>
            </motion.div>
            <img
              src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
              alt="Star"
              className="w-4 sm:w-6 h-4 sm:h-6"
            />
            <motion.div
              className="text-center"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
                Alpha <span className="font-light">house</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">Company slogan</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div className="bg-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8 sm:mb-12 md:mb-16">
            <motion.div
              className="flex items-center justify-center mb-4 sm:mb-6"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              <img
                src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                alt="Star"
                className="w-6 sm:w-8 h-6 sm:h-8 mr-3 sm:mr-4"
              />
              <p className="text-base sm:text-lg font-semibold">FAQs</p>
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              variants={leftAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              Frequently Asked Questions
            </motion.h2>
          </motion.div>
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 md:mb-16"
            variants={leftAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {["general", "pricing", "dashboard", "api"].map((category) => (
              <motion.button
                key={category}
                onClick={() => handleFaqCategoryChange(category)}
                className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full font-semibold text-sm sm:text-base lg:text-lg transition-colors ${
                  faqCategory === category ? "bg-[#ff5e14] text-white" : "bg-black text-white hover:bg-gray-800"
                }`}
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </motion.div>
          <motion.div className="max-w-4xl mx-auto space-y-4">
            {faqData[faqCategory].map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-gray-200"
                variants={leftAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-4 sm:py-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <motion.div
                    className="flex items-center"
                    variants={leftAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                  >
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4 sm:mr-6">
                      <img
                        src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                        alt="Icon"
                        className="w-6 sm:w-8 h-6 sm:h-8"
                      />
                    </div>
                    <motion.h3
                      className="text-lg sm:text-xl lg:text-2xl font-bold"
                      variants={leftAnimation}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false }}
                    >
                      {faq.title}
                    </motion.h3>
                  </motion.div>
                  <motion.div
                    className="flex items-center"
                    variants={leftAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                  >
                    <svg
                      className={`w-5 sm:w-6 h-5 sm:h-6 transition-transform ${expandedFaq === index ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>
                {expandedFaq === index && (
                  <motion.div
                    className="pb-4 sm:pb-6 pl-16 sm:pl-22"
                    variants={leftAnimation}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                  >
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{faq.content}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Blog Section */}
      <motion.div className="w-full">
        <img
          src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/f1-bg-img-1.webp"
          alt="Architecture Background"
          className="w-full h-auto object-cover"
          style={{ opacity: 0.3 }}
        />
      </motion.div>

      {/* As A National Leader Section */}
      <motion.section className="bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div className="flex flex-col xl:flex-row items-center justify-between gap-8">
            {/* Left Side - Header and Location Cards */}
            <motion.div className="w-full xl:w-3/5">
              {/* Header */}
              <div className="mb-8 sm:mb-12">
                <motion.div className="flex items-center mb-3 sm:mb-4">
                  <img
                    src="https://themexriver.com/wp/barsi/wp-content/uploads/2025/03/star-shape.webp"
                    alt="Star"
                    className="w-6 sm:w-8 h-6 sm:h-8 mr-3 sm:mr-4"
                  />
                  <p className="text-base sm:text-lg font-semibold">We're Investing SINCE 1990</p>
                </motion.div>
                <motion.h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                  As A National Leader
                </motion.h2>
              </div>

              {/* Location Cards */}
              <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {/* Lyon */}
                <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
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
                <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
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
                <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm md:col-span-2 xl:col-span-1">
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
            <div className="text-center lg:text-left">
              <div className="flex items-center mb-4 sm:mb-6 justify-center lg:justify-start">
                <div className="w-5 sm:w-6 h-5 sm:h-6 bg-orange-500 mr-2"></div>
                <div className="w-5 sm:w-6 h-5 sm:h-6 bg-blue-900"></div>
                <h3 className="text-2xl sm:text-3xl font-bold ml-3">Barsi</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                A profound design process eventually makes the patron, the architect, and every occasional visitor in
                the space a slightly better human being.
              </p>
            </div>

            {/* About and Products Side by Side */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">About</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    "Who We Are",
                    "What We Do",
                    "After Care",
                    "Sustainability",
                    "Wellbeing",
                  ].map((item) => (
                    <li key={item} className="flex items-center">
                      <span className="text-gray-400 mr-2">{">"}</span>
                      <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Products</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {["All Products", "New Designs", "CAD Blocks", "Moodboards", "Finishes"].map((item) => (
                    <li key={item} className="flex items-center">
                      <span className="text-gray-400 mr-2">{">"}</span>
                      <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Inspiration and Contact Side by Side */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Inspiration</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {["Projects", "Blog", "Videos", "Social Media", "Feed"].map((item) => (
                    <li key={item} className="flex items-center">
                      <span className="text-gray-400 mr-2">{">"}</span>
                      <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contact</h4>
                <ul className="space-y-2 sm:space-y-3">
                  {["United Kingdom", "North America", "Frovi Showrooms", "Careers"].map((item) => (
                    <li key={item} className="flex items-center">
                      <span className="text-gray-400 mr-2">{">"}</span>
                      <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <hr className="border-gray-300 my-8 sm:my-12" />
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-600 text-sm">Copyright 2025 Barsi</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              {["North America Terms & Conditions", "Privacy Policy"].map((item) => (
                <a key={item} href="#" className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Top Button */}
        <button
          onClick={scrollToTop}
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
      </footer>

      <style jsx>{`
        @keyframes rotate360 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-rotate360 {
          animation: rotate360 1s linear;
        }
      `}</style>
    </div>
  )
}

export default Home
