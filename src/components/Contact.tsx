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
                        className="glass rounded-2xl p-6 md:p-10 max-w-2xl mx-auto relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 via-transparent to-[#3b82f6]/5 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            animate={{
                                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            style={{
                                backgroundSize: "200% 200%",
                            }}
                        />
                        <motion.div
                            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#a855f7]"
                            animate={{
                                backgroundSize: ["200% 100%", "100% 100%"],
                                backgroundPosition: ["0% 50%", "100% 50%"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            style={{
                                backgroundSize: "200% 100%",
                            }}
                        />
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12 relative z-10"
                            >
                                <motion.div
                                    className="w-24 h-24 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] flex items-center justify-center mx-auto mb-6 relative"
                                    animate={{ 
                                        rotate: [0, 10, -10, 0],
                                        boxShadow: [
                                            "0 0 30px rgba(139, 92, 246, 0.4)",
                                            "0 0 50px rgba(139, 92, 246, 0.6)",
                                            "0 0 30px rgba(139, 92, 246, 0.4)",
                                        ],
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.div
                                        className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] opacity-50"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <FaPaperPlane className="text-4xl text-white relative z-10" />
                                </motion.div>
                                <motion.h3 
                                    className="text-3xl font-bold text-white mb-3"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Message Sent!
                                </motion.h3>
                                <motion.p 
                                    className="text-gray-400"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Thank you for reaching out. I&apos;ll get back to you soon!
                                </motion.p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                {submitError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                                    >
                                        {submitError}
                                    </motion.div>
                                )}

                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        Name
                                    </label>
                                    <motion.input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"
                                            } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300`}
                                        placeholder="Your name"
                                        whileFocus={{
                                            scale: 1.01,
                                            borderColor: "#8b5cf6",
                                            boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
                                        }}
                                    />
                                    {errors.name && (
                                        <motion.p 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-red-500 text-sm mt-1"
                                        >
                                            {errors.name}
                                        </motion.p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-300 mb-2"
                                    >
                                        Email
                                    </label>
                                    <motion.input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"
                                            } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300`}
                                        placeholder="your.email@example.com"
                                        whileFocus={{
                                            scale: 1.01,
                                            borderColor: "#8b5cf6",
                                            boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
                                        }}
                                    />
                                    {errors.email && (
                                        <motion.p 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-red-500 text-sm mt-1"
                                        >
                                            {errors.email}
                                        </motion.p>
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
                                    <motion.textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className={`w-full px-4 py-3 bg-white/5 border ${errors.message ? "border-red-500" : "border-white/10"
                                            } rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none`}
                                        placeholder="Tell me about your project or just say hi!"
                                        whileFocus={{
                                            scale: 1.01,
                                            borderColor: "#8b5cf6",
                                            boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
                                        }}
                                    />
                                    {errors.message && (
                                        <motion.p 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-red-500 text-sm mt-1"
                                        >
                                            {errors.message}
                                        </motion.p>
                                    )}
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                    <motion.div
                                        className="absolute inset-0"
                                        animate={{
                                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        style={{
                                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                                            backgroundSize: "200% 100%",
                                        }}
                                    />
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            >
                                                <FaPaperPlane />
                                            </motion.span>
                                            <span className="relative z-10">Send Message</span>
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
