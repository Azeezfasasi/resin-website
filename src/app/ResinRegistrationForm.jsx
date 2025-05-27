import React, { useState } from "react";
import { Helmet } from "react-helmet";
import MainHeader from "../assets/components/home-components/MainHeader";
import Footer from "../assets/components/home-components/Footer";
import TopHeader from "../assets/components/home-components/TopHeader";
import WhatsAppChatRibbon from "../assets/components/home-components/WhatsappChatRibbon";

const ResinRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    phone: "",
    whatsapp: "",
    message: "",
    experience: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Map frontend fields to backend fields (all required by schema)
    const payload = {
      name: formData.name,
      gender: formData.gender,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      message: formData.message,
      experience: formData.experience,
    };

    try {
      const response = await fetch("https://resin-backend.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Registration failed");
      }
      // WhatsApp integration
      const whatsappNumber = "2348125925447";
      const whatsappMessage =
        `New Resin Art Training Registration:%0A` +
        `Name: ${formData.name}%0A` +
        `Gender: ${formData.gender}%0A` +
        `Email: ${formData.email}%0A` +
        `Phone: ${formData.phone}%0A` +
        `WhatsApp: ${formData.whatsapp}%0A` +
        `Experience: ${formData.experience}%0A` +
        `Message: ${formData.message}`;
      window.open(
        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
        "_blank"
      );
      setSubmitted(true);
      setFormData({
        name: "",
        gender: "",
        email: "",
        phone: "",
        whatsapp: "",
        message: "",
        experience: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Learn How to Make Resin</title>
      </Helmet>
      <TopHeader />
      <MainHeader />
      <div className="max-w-[95%] md:max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-[40px] mb-[60px]">
        <h2 className="text-2xl font-bold text-center mb-6">Register for "Resin Art Training" Workshop</h2>
        {submitted ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold">Thank you for registering!</h3>
            <p className="mt-2">We will contact you with more details soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 text-red-600 text-center">{error}</div>
            )}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your full name"
                autoCapitalize="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender:</label>
              <select name="gender" id="gender" value={formData.gender}
                onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email"
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Your personal phone number"
                autoComplete="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp:</label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                placeholder="Your WhatsApp number"
                autoComplete="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">What is your experience with Resin?</label>
              <select name="experience" id="experience" value={formData.experience}
                onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Choose Experience</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">What would you like to learn:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe what you would like to learn in the workshop"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
      <Footer />
      <WhatsAppChatRibbon />
    </>
  );
};

export default ResinRegistrationForm;
