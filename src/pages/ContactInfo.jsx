"use client"

import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import axios from "axios"

const ContactInfo = () => {
  const navigate = useNavigate()
  const [contactDetails, setContactDetails] = useState([])
  const [filteredDetails, setFilteredDetails] = useState([])
  const [error, setError] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact")
        console.log("API Response:", response.data)
        if (!Array.isArray(response.data) || response.data.length === 0) {
          setError("No contact data received from the server.")
          return
        }
        // Sort by created_at (descending), fallback to id if created_at is missing
        const sortedData = response.data.sort((a, b) => {
          const parseDate = (str) => {
            if (!str || typeof str !== "string") return null
            const date = new Date(str)
            return isNaN(date.getTime()) ? null : date
          }
          const dateA = parseDate(a.created_at)
          const dateB = parseDate(b.created_at)

          if (!dateA && !dateB) return b.id - a.id // Fallback to id descending
          if (!dateA) return 1 // Invalid dates to bottom
          if (!dateB) return -1
          return dateB - dateA // Latest first
        })
        console.log("Sorted Data:", sortedData)
        setContactDetails(sortedData)
        setFilteredDetails(sortedData)
      } catch (err) {
        setError("Failed to fetch contact data. Please check the server.")
        console.error("Error fetching data:", err.message, err.response?.data)
      }
    }
    fetchData()
  }, [])

  // Filter by selected date
  useEffect(() => {
    if (selectedDate) {
      const filtered = contactDetails.filter((contact) => {
        if (!contact.created_at || typeof contact.created_at !== "string") {
          console.warn("Skipping filter for invalid date:", contact.created_at)
          return false
        }
        const date = new Date(contact.created_at)
        if (isNaN(date.getTime())) {
          console.warn("Invalid date in filter:", contact.created_at)
          return false
        }
        const contactDate = date.toISOString().split("T")[0]
        console.debug("Filtering:", contact.created_at, "->", contactDate)
        return contactDate === selectedDate
      })
      setFilteredDetails(filtered)
    } else {
      setFilteredDetails(contactDetails)
    }
  }, [selectedDate, contactDetails])

  const handleLogout = () => {
    navigate("/")
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value)
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

  const rightAnimation = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
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
    <div className="relative min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
          backgroundImage: `url('https://www.stitchtools.com/assets/images/contact/contact-banner.jpg')`,
        }}
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </motion.div>

      {/* Contact Info Section */}
      <motion.div
        className="relative z-10 w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-xl p-4 sm:p-6 lg:p-8 border border-white/20"
        variants={cardAnimation}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4"
          variants={container}
        >
          <motion.h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white" variants={bottomAnimation}>
            Contact Information
          </motion.h2>
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
            variants={rightAnimation}
          >
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full sm:w-auto bg-white/20 text-white border border-white/30 rounded-lg py-2 px-3 sm:px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 text-sm"
            />
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300 text-sm"
            >
              Logout
            </button>
          </motion.div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div className="text-red-500 text-center mb-4 text-sm sm:text-base" variants={fadeIn}>
            {error}
          </motion.div>
        )}

        {/* Contact Details Table with Scrollbar */}
        <motion.div
          className="max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] overflow-y-auto overflow-x-auto"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-4">
            {filteredDetails.length > 0 ? (
              filteredDetails.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30"
                  variants={fadeIn}
                >
                  <div className="space-y-2">
                    <div>
                      <span className="text-white/70 text-sm font-semibold">Name:</span>
                      <p className="text-white text-sm">{contact.name || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-white/70 text-sm font-semibold">Email:</span>
                      <p className="text-white text-sm break-all">{contact.email || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-white/70 text-sm font-semibold">Message:</span>
                      <p className="text-white text-sm">{contact.message || "N/A"}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div className="text-center text-white py-8" variants={fadeIn}>
                No contact data available.
              </motion.div>
            )}
          </div>

          {/* Desktop Table View */}
          <table className="hidden sm:table w-full text-left text-white min-w-full">
            <thead className="sticky top-0 bg-white/20">
              <motion.tr variants={fadeIn}>
                <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base lg:text-lg">Name</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base lg:text-lg">Email</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base lg:text-lg">Message</th>
              </motion.tr>
            </thead>
            <tbody>
              {filteredDetails.length > 0 ? (
                filteredDetails.map((contact, index) => (
                  <motion.tr
                    key={contact.id}
                    className={`border-b border-white/20 hover:bg-white/30 transition-all duration-300 ${
                      index % 2 === 0 ? "bg-white/10" : "bg-transparent"
                    }`}
                    variants={fadeIn}
                  >
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm lg:text-base">
                      {contact.name || "N/A"}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm lg:text-base break-all">
                      {contact.email || "N/A"}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm lg:text-base">
                      <div className="max-w-xs lg:max-w-sm xl:max-w-md truncate" title={contact.message || "N/A"}>
                        {contact.message || "N/A"}
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr variants={fadeIn}>
                  <td colSpan="3" className="py-4 sm:py-6 px-2 sm:px-4 text-center text-sm sm:text-base">
                    No contact data available.
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ContactInfo
