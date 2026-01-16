"use client";

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import AnimatedSection from "./AnimatedSection";
import { FaPaperPlane } from "react-icons/fa";

const enquiryTypes = [
    "General Inquiry",
    "Job Opportunity",
    "Project Collaboration",
    "Freelance Work",
    "Other",
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        enquiryType: "",
        message: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.enquiryType) {
            newErrors.enquiryType = "Please select an enquiry type";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", enquiryType: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#3b82f6]/10 rounded-full blur-[120px]" />
            </div>

            <div className="container-custom relative z-10">
                <AnimatedSection className="text-center mb-16">
                    <p className="text-[#8b5cf6] font-medium mb-2 tracking-wider uppercase text-sm">
                        Get In Touch
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text inline-block">
                        Let&apos;s Connect
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Ready to collaborate on exciting projects? Let&apos;s discuss how we can work together!
                    </p>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                    <motion.div
                        className="glass rounded-2xl p-6 md:p-10 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <motion.div
                                    className="w-20 h-20 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] flex items-center justify-center mx-auto mb-6"
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FaPaperPlane className="text-3xl text-white" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Message Sent!
                                </h3>
                                <p className="text-gray-400">
                                    Thank you for reaching out. I&apos;ll get back to you soon!
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full ${errors.name ? "border-red-500" : ""
                                            }`}
                                        placeholder="Your name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full ${errors.email ? "border-red-500" : ""
                                            }`}
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Enquiry Type */}
                                <div>
                                    <label
                                        htmlFor="enquiryType"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        Enquiry Type
                                    </label>
                                    <select
                                        id="enquiryType"
                                        name="enquiryType"
                                        value={formData.enquiryType}
                                        onChange={handleChange}
                                        className={`w-full ${errors.enquiryType ? "border-red-500" : ""
                                            }`}
                                    >
                                        <option value="">Select an option</option>
                                        {enquiryTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.enquiryType && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.enquiryType}
                                        </p>
                                    )}
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className={`w-full resize-none ${errors.message ? "border-red-500" : ""
                                            }`}
                                        placeholder="Tell me about your project or just say hi!"
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </AnimatedSection>
            </div>
        </section>
    );
}
