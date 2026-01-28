import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aerospace & Defense | Datamills",
  description: "How Datamills helps aerospace and defense organizations with advanced analytics, AI, and digital transformation.",
};

// How We Help Data
const helpAreas = [
  {
    title: "Defense Analytics",
    description: "Advanced threat detection, intelligence analysis, and predictive modeling for defense operations.",
    icon: "🛡️",
  },
  {
    title: "Supply Chain Optimization",
    description: "End-to-end supply chain visibility, demand forecasting, and logistics optimization.",
    icon: "📦",
  },
  {
    title: "Predictive Maintenance",
    description: "AI-powered maintenance scheduling to maximize aircraft and equipment availability.",
    icon: "⚙️",
  },
  {
    title: "Cybersecurity Solutions",
    description: "Advanced threat detection and security analytics for critical infrastructure.",
    icon: "🔒",
  },
  {
    title: "Mission Planning",
    description: "Data-driven mission planning and operational analytics platforms.",
    icon: "🎯",
  },
  {
    title: "Digital Transformation",
    description: "Modernizing legacy systems and implementing cloud-native solutions.",
    icon: "🚀",
  },
];

// Featured Insights
const insights = [
  {
    category: "Article",
    title: "The future of defense: AI-powered decision making",
    date: "January 2026",
    image: "/insights/defense-ai.jpg",
  },
  {
    category: "Case Study",
    title: "How we helped a defense contractor reduce maintenance costs by 40%",
    date: "December 2025",
    image: "/insights/maintenance.jpg",
  },
  {
    category: "Report",
    title: "Aerospace supply chain resilience in the digital age",
    date: "November 2025",
    image: "/insights/supply-chain.jpg",
  },
];

export default function AerospaceDefensePage() {
  return (
    <main className="min-h-screen pt-14">
      {/* Hero Section */}
      <section className="relative bg-[#0a192f] overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/90 to-[#0a192f]/70" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/industries/aerospace-hero.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/industries" className="hover:text-white transition-colors">Industries</Link>
            <span>/</span>
            <span className="text-white">Aerospace & Defense</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Aerospace & Defense
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
              Transforming defense and aerospace operations through advanced analytics, 
              artificial intelligence, and cutting-edge technology solutions.
            </p>
          </div>
        </div>
        
        {/* Decorative bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-sm text-slate-400">Defense Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">$2B+</div>
              <div className="text-sm text-slate-400">Cost Savings Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-sm text-slate-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-sm text-slate-400">System Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16">
            <span className="text-blue-600 text-sm font-semibold tracking-[0.15em] uppercase mb-4 block">
              Our Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a192f] mb-4">
              How we help clients
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              We partner with aerospace and defense organizations to solve their most 
              complex challenges through data-driven solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpAreas.map((area, index) => (
              <div 
                key={index}
                className="group p-8 border border-slate-200 rounded-sm hover:border-blue-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-semibold text-[#0a192f] mb-3 group-hover:text-blue-600 transition-colors">
                  {area.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Insights Section */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-blue-600 text-sm font-semibold tracking-[0.15em] uppercase mb-4 block">
                Insights
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a192f]">
                Featured insights
              </h2>
            </div>
            <Link 
              href="/insights" 
              className="mt-6 md:mt-0 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 group"
            >
              View all insights
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((insight, index) => (
              <Link 
                key={index}
                href="#"
                className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/90 text-xs font-semibold text-slate-700 rounded-sm">
                      {insight.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#0a192f] mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {insight.title}
                  </h3>
                  <span className="text-sm text-slate-500">{insight.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0a192f] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to transform your operations?
            </h2>
            <p className="text-lg text-slate-400 mb-10">
              Let&apos;s discuss how our aerospace and defense expertise can help 
              you achieve your strategic objectives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="px-8 py-4 bg-white text-[#0a192f] font-semibold rounded-sm hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Contact Us
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/industries"
                className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-sm hover:border-slate-400 hover:text-white transition-all duration-300"
              >
                Explore Other Industries
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Industries */}
      <section className="bg-slate-900 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <h3 className="text-xl font-semibold text-white mb-8">Related Industries</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Technology & Telecommunications", slug: "technology" },
              { name: "Public Sector", slug: "public-sector" },
              { name: "Energy & Utilities", slug: "energy" },
            ].map((industry) => (
              <Link 
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group flex items-center justify-between p-4 border border-slate-700 rounded-sm hover:border-slate-500 transition-colors"
              >
                <span className="text-slate-300 group-hover:text-white transition-colors">
                  {industry.name}
                </span>
                <svg 
                  className="w-4 h-4 text-slate-500 group-hover:text-white transition-all group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

