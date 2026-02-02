// ============================================
// CONTACT PAGE
// Simple contact form with email + query
// ============================================

import { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact Us | Datamills",
  description: "Get in touch with our team. We'd love to hear about your project.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0a192f] overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center justify-center gap-2 text-sm">
                <li>
                  <Link href="/" className="text-slate-500 hover:text-cyan-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-slate-600">/</li>
                <li className="text-slate-400">Contact</li>
              </ol>
            </nav>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Touch
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Have a question or want to discuss a project? We&apos;d love to hear from you.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-slate-800/20 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-white mb-2">Send us a message</h2>
                <p className="text-slate-400 mb-8">Fill out the form and we&apos;ll respond within 24 hours.</p>
                <ContactForm />
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Contact Info Cards */}
              <div className="space-y-4">
                {/* Email Card */}
                <div className="group bg-slate-800/30 backdrop-blur rounded-2xl border border-slate-700/50 p-6 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Email us at</p>
                      <a href="mailto:contact@datamills.com" className="text-white font-semibold hover:text-cyan-400 transition-colors">
                        contact@datamills.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Response Time Card */}
                <div className="group bg-slate-800/30 backdrop-blur rounded-2xl border border-slate-700/50 p-6 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Response Time</p>
                      <p className="text-white font-semibold">Within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Location Card */}
                <div className="group bg-slate-800/30 backdrop-blur rounded-2xl border border-slate-700/50 p-6 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">Based in</p>
                      <p className="text-white font-semibold">Global / Remote</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Contact Us */}
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur rounded-2xl border border-slate-700/50 p-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  What happens next?
                </h3>
                <ul className="space-y-4">
                  {[
                    { num: "01", text: "We'll review your message" },
                    { num: "02", text: "Our team will reach out within 24 hours" },
                    { num: "03", text: "We'll schedule a call to discuss your needs" },
                  ].map((item) => (
                    <li key={item.num} className="flex items-start gap-3">
                      <span className="text-cyan-400 font-mono text-sm font-bold">{item.num}</span>
                      <span className="text-slate-300">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

