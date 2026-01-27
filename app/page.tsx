import { Navbar } from "./components/Navbar";
import { InteractiveOrb } from "./components/InteractiveOrb";

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <main className="min-h-screen pt-20">
        <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
          {/* Subtle background */}
          <div className="absolute inset-0 bg-[#0a192f]" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}
          />
          
          {/* Subtle gradient accent */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-800/20 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-3xl">
              {/* Tag */}
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="w-12 h-[1px] bg-slate-500" />
                <span className="text-slate-400 text-sm font-medium tracking-[0.2em] uppercase">
                  Tech Agency
                </span>
              </div>
              
              {/* Main heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-8">
                <span className="text-white">Building the future</span>
                <br />
                <span className="text-slate-400">with data & AI</span>
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-xl leading-relaxed">
                We transform complex data into actionable intelligence. 
                From research to production, our solutions drive real business outcomes.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-white text-[#0a192f] font-semibold rounded-sm hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-2">
                  Start a Project
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-sm hover:border-slate-400 hover:text-white transition-all duration-300">
                  View Our Work
                </button>
              </div>
              
              {/* Stats */}
              <div className="mt-20 pt-10 border-t border-slate-800 grid grid-cols-3 gap-8 max-w-lg">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
                  <div className="text-sm text-slate-500">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">98%</div>
                  <div className="text-sm text-slate-500">Client Retention</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-slate-500">Support Available</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side interactive decorative element */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[450px] xl:w-[550px] h-[450px] xl:h-[550px]">
            <InteractiveOrb />
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-6 md:left-12 lg:left-20 flex items-center gap-4 text-slate-500">
            <div className="w-[1px] h-16 bg-gradient-to-b from-slate-500 to-transparent" />
            <span className="text-xs tracking-[0.2em] uppercase rotate-90 origin-left translate-x-3">Scroll</span>
          </div>
        </section>
        
        {/* Services Preview Section */}
        <section className="py-32 px-6 md:px-12 lg:px-20 border-t border-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
              <div>
                <span className="text-slate-500 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
                  What We Do
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Our Services
                </h2>
              </div>
              <a href="#" className="mt-6 md:mt-0 text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                View All Services
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800/50">
              {[
                { 
                  title: 'AI & Machine Learning', 
                  desc: 'Custom AI solutions including computer vision, NLP, and predictive analytics.',
                  num: '01'
                },
                { 
                  title: 'Data Engineering', 
                  desc: 'Scalable data pipelines, ETL processes, and real-time data processing.',
                  num: '02'
                },
                { 
                  title: 'Cloud Architecture', 
                  desc: 'AWS, Azure, and GCP infrastructure design and implementation.',
                  num: '03'
                },
                { 
                  title: 'Analytics & BI', 
                  desc: 'Tableau, Power BI dashboards and custom analytics solutions.',
                  num: '04'
                },
                { 
                  title: 'DevOps & MLOps', 
                  desc: 'CI/CD pipelines, containerization, and model deployment.',
                  num: '05'
                },
                { 
                  title: 'Consulting', 
                  desc: 'Strategic technology consulting and digital transformation.',
                  num: '06'
                },
              ].map((service, i) => (
                <div 
                  key={i}
                  className="group bg-[#0a192f] p-8 md:p-10 hover:bg-slate-800/30 transition-all duration-500 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-slate-600 text-sm font-mono">{service.num}</span>
                    <svg 
                      className="w-5 h-5 text-slate-600 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
