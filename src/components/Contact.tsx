"use client";

import { FormEvent, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";

const enquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "job", label: "Job Opportunity" },
    { value: "project", label: "Project Collaboration" },
    { value: "freelance", label: "Freelance Work" },
    { value: "other", label: "Other" },
];

const socialLinks = [
    { name: "GitHub", href: "https://github.com/vandan08" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/vandan-sheth08/" },
    { name: "X", href: "https://x.com/vandans08" },
    { name: "LeetCode", href: "https://leetcode.com/u/vandan08/" },
    { name: "Medium", href: "https://medium.com/@vandanbsheth9" },
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
            const selectedEnquiry = enquiryTypes.find(
                (t) => t.value === formData.enquiryType
            );
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
            setTimeout(() => setIsSubmitted(false), 6000);
        } catch {
            setSubmitError(
                "The message didn't go through. Please try again, or email me directly."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    return (
        <section id="contact" className="py-20 md:py-28 bg-night text-night-ink scroll-mt-16">
            <div className="container-page">
                <AnimatedSection>
                    <SectionHeading
                        dark
                        number="05"
                        label="Correspondence"
                        title={
                            <>
                                Let&apos;s build something{" "}
                                <em className="italic text-accent-light font-normal">
                                    worth keeping
                                </em>
                            </>
                        }
                    />
                </AnimatedSection>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Invitation */}
                    <AnimatedSection className="lg:col-span-5" delay={0.05}>
                        <div>
                            <p className="text-lg text-night-soft leading-relaxed mb-8 max-w-md">
                                Whether it&apos;s a role, a project, or a good idea
                                that needs an engineer — my inbox is open. I read
                                everything and reply to most of it.
                            </p>

                            <p className="eyebrow text-night-soft mb-2">Write to me</p>
                            <a
                                href="mailto:vandanbsheth9@gmail.com"
                                className="link-night text-xl md:text-2xl font-display"
                            >
                                vandanbsheth9@gmail.com
                            </a>

                            <div className="border-t border-night-rule mt-10 pt-6">
                                <p className="eyebrow text-night-soft mb-3">Elsewhere</p>
                                <ul className="space-y-2">
                                    {socialLinks.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="link-night"
                                            >
                                                {link.name} ↗
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Letter form */}
                    <AnimatedSection className="lg:col-span-7" delay={0.15}>
                        {isSubmitted ? (
                            <div className="border border-night-rule p-10 text-center">
                                <p className="font-display text-3xl mb-3">
                                    Message sent.
                                </p>
                                <p className="text-night-soft">
                                    Thank you for writing — I&apos;ll get back to you
                                    soon.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                                {submitError && (
                                    <p className="border border-accent text-accent-light px-4 py-3 text-sm">
                                        {submitError}
                                    </p>
                                )}

                                <div className="grid sm:grid-cols-2 gap-8">
                                    <div>
                                        <label htmlFor="name" className="eyebrow text-night-soft block mb-1">
                                            Your name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="field-night"
                                            placeholder="Jane Doe"
                                        />
                                        {errors.name && (
                                            <p className="text-accent-light text-sm mt-2 italic">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="eyebrow text-night-soft block mb-1">
                                            Your email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="field-night"
                                            placeholder="jane@example.com"
                                        />
                                        {errors.email && (
                                            <p className="text-accent-light text-sm mt-2 italic">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="enquiryType" className="eyebrow text-night-soft block mb-1">
                                        Regarding
                                    </label>
                                    <select
                                        id="enquiryType"
                                        name="enquiryType"
                                        value={formData.enquiryType}
                                        onChange={handleChange}
                                        className={`field-night ${
                                            formData.enquiryType ? "" : "text-night-soft"
                                        }`}
                                    >
                                        <option value="" disabled>
                                            Choose a subject…
                                        </option>
                                        {enquiryTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.enquiryType && (
                                        <p className="text-accent-light text-sm mt-2 italic">
                                            {errors.enquiryType}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="message" className="eyebrow text-night-soft block mb-1">
                                        Your message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className="field-night resize-none"
                                        placeholder="Tell me about your project, or just say hello."
                                    />
                                    {errors.message && (
                                        <p className="text-accent-light text-sm mt-2 italic">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn-ink !bg-night-ink !text-night !border-night-ink hover:!bg-accent-light hover:!border-accent-light disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Sending…" : "Send the letter →"}
                                </button>
                            </form>
                        )}
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
