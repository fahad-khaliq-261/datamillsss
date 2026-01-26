import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <main className="min-h-screen pt-20">
        <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
          {/* Background gradient effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a192f] via-[#0d1f3c] to-[#0a192f]" />
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          
          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Welcome to Datamills
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-100 via-cyan-200 to-blue-100 bg-clip-text text-transparent">
                Transforming Data
              </span>
              <br />
              <span className="text-blue-100/90">Into Intelligence</span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              We leverage cutting-edge AI and analytics to unlock the power of your data.
              From research to production, we build solutions that scale.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-sm hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5">
                Explore Our Services
              </button>
              <button className="px-8 py-4 border border-blue-400/30 text-blue-100 font-semibold rounded-sm hover:bg-blue-400/10 hover:border-blue-400/50 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-blue-100/40">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-6 h-10 border-2 border-blue-100/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-24 px-6 border-t border-blue-900/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-100">
              Our Capabilities
            </h2>
            <p className="text-center text-blue-100/60 mb-16 max-w-2xl mx-auto">
              Comprehensive solutions across research, technology, and analytics
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Research', desc: 'Math, CS, Finance & Economic modeling', icon: '📊' },
                { title: 'AI & Gen AI', desc: 'Vision, Text, Speech & Agentic systems', icon: '🤖' },
                { title: 'Cloud & DevOps', desc: 'Scalable infrastructure solutions', icon: '☁️' },
                { title: 'Analytics', desc: 'Tableau & Power BI dashboards', icon: '📈' },
                { title: 'Integration', desc: 'FastAPI & Docker deployments', icon: '🔗' },
                { title: 'Security', desc: 'Cybersecurity & Data governance', icon: '🔒' },
              ].map((item, i) => (
                <div 
                  key={i}
                  className="p-6 bg-blue-900/20 border border-blue-900/30 rounded-sm hover:border-cyan-500/30 hover:bg-blue-900/30 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-blue-100 mb-2 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-blue-100/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
