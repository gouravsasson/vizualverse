"use client";

import { useState } from "react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { FaInstagram, FaBehance } from "react-icons/fa";
import { Mail, Phone, MapPin, Send, Loader2, ArrowLeft } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <CldImage
            src="vizualverse/Logo"
            alt="Vizualverse Logo"
            width={120}
            height={35}
          />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-gray-400 text-lg mb-12">
              Have a project in mind? We&apos;d love to hear about it. Reach out
              and let&apos;s bring your vision to life.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] border border-gray-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <a
                    href="mailto:sagar@vizualverse.com"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    sagar@vizualverse.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] border border-gray-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <a
                    href="tel:+971588180257"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +971 588 180 257
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] border border-gray-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="text-gray-400">Dubai, UAE</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/vizual.verse?igsh=Z3U4dzhjMzZqMDBu&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-[#1a1a1a] border border-gray-800 flex items-center justify-center hover:border-gray-600 transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.behance.net/vizualverse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-[#1a1a1a] border border-gray-800 flex items-center justify-center hover:border-gray-600 transition-colors"
                >
                  <FaBehance className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-8">
            <h2 className="text-xl font-semibold mb-6">Send us a message</h2>

            {success && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                Thank you! Your message has been sent. We&apos;ll get back to you soon.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors"
                  placeholder="+971 XXX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
