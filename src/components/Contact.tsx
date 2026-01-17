"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent, useRef, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import { FaPaperPlane, FaChevronDown, FaCheck } from "react-icons/fa6";

const enquiryTypes = [
    { value: "general", label: "General Inquiry", emoji: "💬" },
    { value: "job", label: "Job Opportunity", emoji: "💼" },
    { value: "project", label: "Project Collaboration", emoji: "🤝" },
    { value: "freelance", label: "Freelance Work", emoji: "💻" },
    { value: "other", label: "Other", emoji: "✨" },
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
    const [submitError, setSubmitError] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
        setSubmitError("");

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const selectedEnquiry = enquiryTypes.find(t => t.value === formData.enquiryType);
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    enquiryType: selectedEnquiry?.label || formData.enquiryType,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setIsSubmitted(true);
            setFormData({ name: "", email: "", enquiryType: "", message: "" });

            // Reset success message after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch {
            setSubmitError("Failed to send message. Please try again or email directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleEnquirySelect = (value: string) => {
        setFormData((prev) => ({ ...prev, enquiryType: value }));
        setIsDropdownOpen(false);
        if (errors.enquiryType) {
            setErrors((prev) => ({ ...prev, enquiryType: "" }));
        }
    };

    const selectedEnquiry = enquiryTypes.find(t => t.value === formData.enquiryType);

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
                                {submitError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                                    >
                                        {submitError}
                                    </motion.div>
                                )}

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
                                        className={`w-full px-4 py-3 bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"
                                            } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6] transition-colors`}
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
                                        className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"
                                            } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6] transition-colors`}
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Modern Custom Dropdown */}
                                <div ref={dropdownRef}>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Enquiry Type
                                    </label>
                                    <div className="relative">
                                        <motion.button
                                            type="button"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className={`w-full px-4 py-3 bg-white/5 border ${errors.enquiryType ? "border-red-500" : "border-white/10"
                                                } rounded-xl text-left flex items-center justify-between focus:outline-none focus:border-[#8b5cf6] transition-colors`}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            <span className={selectedEnquiry ? "text-white" : "text-gray-500"}>
                                                {selectedEnquiry ? (
                                                    <span className="flex items-center gap-2">
                                                        <span>{selectedEnquiry.emoji}</span>
                                                        <span>{selectedEnquiry.label}</span>
                                                    </span>
                                                ) : (
                                                    "Select an option"
                                                )}
                                            </span>
                                            <motion.span
                                                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <FaChevronDown className="text-gray-400" />
                                            </motion.span>
                                        </motion.button>

                                        <AnimatePresence>
                                            {isDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute z-50 w-full mt-2 py-2 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                                                >
                                                    {enquiryTypes.map((type, index) => (
                                                        <motion.button
                                                            key={type.value}
                                                            type="button"
                                                            onClick={() => handleEnquirySelect(type.value)}
                                                            className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-[#8b5cf6]/20 transition-colors ${formData.enquiryType === type.value
                                                                    ? "bg-[#8b5cf6]/10 text-[#8b5cf6]"
                                                                    : "text-gray-300"
                                                                }`}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                        >
                                                            <span className="flex items-center gap-3">
                                                                <span className="text-lg">{type.emoji}</span>
                                                                <span>{type.label}</span>
                                                            </span>
                                                            {formData.enquiryType === type.value && (
                                                                <FaCheck className="text-[#8b5cf6]" />
                                                            )}
                                                        </motion.button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    {errors.enquiryType && (
                                        <p className="text-red-500 text-sm mt-1">{errors.enquiryType}</p>
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
                                        className={`w-full px-4 py-3 bg-white/5 border ${errors.message ? "border-red-500" : "border-white/10"
                                            } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#8b5cf6] transition-colors resize-none`}
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
