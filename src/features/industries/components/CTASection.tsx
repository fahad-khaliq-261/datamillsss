import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

export default function CTASection({
  title,
  description,
  primaryButtonText = "Contact Us",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Explore Other Industries",
  secondaryButtonHref = "/industries",
}: CTASectionProps) {
  return (
    <section className="bg-[#0a192f] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-lg text-slate-400 mb-10">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryButtonHref}
              className="px-8 py-4 bg-white text-[#0a192f] font-semibold rounded-sm hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {primaryButtonText}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href={secondaryButtonHref}
              className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-sm hover:border-slate-400 hover:text-white transition-all duration-300"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

