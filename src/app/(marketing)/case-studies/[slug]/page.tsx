// ============================================
// CASE STUDY PAGE
// Dynamic route for individual case studies
// Renders CKEditor HTML content from Supabase
// ============================================

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  getUseCaseBySlugServer,
  getAllUseCasesServer,
  getUseCasesServer,
} from "@/services/supabase";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all case studies (optional, for SSG)
export async function generateStaticParams() {
  const useCases = await getAllUseCasesServer();
  return useCases
    .filter((uc) => uc.slug)
    .map((uc) => ({
      slug: uc.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = await getUseCaseBySlugServer(slug);

  if (!useCase) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${useCase.title} | Case Study`,
    description: useCase.summary || `Read our case study: ${useCase.title}`,
    openGraph: {
      title: useCase.title,
      description: useCase.summary || undefined,
      images: useCase.image ? [useCase.image] : undefined,
    },
  };
}

// Format date for display
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Estimate reading time
function getReadingTime(html: string | null): number {
  if (!html) return 1;
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Category colors
const categoryColors: Record<string, { bg: string; text: string; glow: string }> = {
  "Case Study": { bg: "bg-cyan-500/10", text: "text-cyan-400", glow: "shadow-cyan-500/20" },
  Article: { bg: "bg-blue-500/10", text: "text-blue-400", glow: "shadow-blue-500/20" },
  Report: { bg: "bg-purple-500/10", text: "text-purple-400", glow: "shadow-purple-500/20" },
  Whitepaper: { bg: "bg-emerald-500/10", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
  Webinar: { bg: "bg-amber-500/10", text: "text-amber-400", glow: "shadow-amber-500/20" },
};

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const useCase = await getUseCaseBySlugServer(slug);

  if (!useCase) {
    notFound();
  }

  // Fetch related case studies from the same industry
  const relatedCases = (await getUseCasesServer(useCase.industry))
    .filter((uc) => uc.slug !== useCase.slug && uc.slug)
    .slice(0, 3);

  const readingTime = getReadingTime(useCase.content_html);
  const colors = categoryColors[useCase.category] || categoryColors["Case Study"];

  return (
    <article className="min-h-screen bg-[#0a192f] overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/3 rounded-full blur-[80px] animate-pulse delay-500" />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Hero Section */}
      <header className="relative pt-28 pb-12 md:pt-36 md:pb-20">
        {/* Hero Image Background */}
        {useCase.image && (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={useCase.image}
              alt={useCase.title}
              fill
              className="object-cover opacity-15 scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-[#0a192f]/95 to-[#0a192f]" />
          </div>
        )}

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <nav className="mb-10">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="text-slate-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link
                  href={`/industries/${useCase.industry}`}
                  className="text-slate-500 hover:text-cyan-400 transition-colors capitalize"
                >
                  {useCase.industry.replace(/-/g, " ")}
                </Link>
              </li>
              <li className="text-slate-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-slate-400 truncate max-w-[200px]">{useCase.title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Main Title Area */}
            <div className="lg:col-span-2">
              {/* Category Badge */}
              <div className="mb-6 inline-block">
                <span
                  className={`inline-flex items-center gap-2 px-4 py-2 ${colors.bg} ${colors.text} text-sm font-semibold rounded-full border border-current/20 shadow-lg ${colors.glow}`}
                >
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  {useCase.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                {useCase.title}
              </h1>

              {/* Summary */}
              {useCase.summary && (
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light">
                  {useCase.summary}
                </p>
              )}
            </div>

            {/* Sidebar Info Card */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 sticky top-28">
                {/* Meta Stats */}
                <div className="space-y-5">
                  {/* Date */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Published</p>
                      <p className="text-white font-medium">{formatDate(useCase.date)}</p>
                    </div>
                  </div>

                  {/* Reading Time */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Read Time</p>
                      <p className="text-white font-medium">{readingTime} min read</p>
                    </div>
                  </div>

                  {/* Industry */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">Industry</p>
                      <p className="text-white font-medium capitalize">{useCase.industry.replace(/-/g, " ")}</p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />

                {/* Share Section */}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Share this</p>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-lg bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-105">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 rounded-lg bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-105">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 rounded-lg bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-105">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {useCase.image && (
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 mb-16">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-slate-700/50 group">
            <Image
              src={useCase.image}
              alt={useCase.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/50 via-transparent to-transparent" />
            
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-cyan-500/50 rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-cyan-500/50 rounded-br-lg" />
          </div>
        </div>
      )}

      {/* Content Section */}
      <section className="relative z-10 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Decorative line */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
            <span className="text-slate-500 text-sm font-medium">Full Story</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          </div>

          {/* CKEditor HTML Content */}
          {useCase.content_html ? (
            <div
              className="case-study-content"
              dangerouslySetInnerHTML={{ __html: useCase.content_html }}
            />
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
                <svg className="w-10 h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-400 text-lg">Content coming soon...</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedCases.length > 0 && (
        <section className="relative z-10 py-16 md:py-24 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase block mb-2">
                  Continue Reading
                </span>
                <h2 className="text-3xl font-bold text-white">Related Case Studies</h2>
              </div>
              <Link
                href={`/industries/${useCase.industry}`}
                className="hidden md:flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group"
              >
                View all
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedCases.map((related) => (
                <Link
                  key={related.id}
                  href={`/case-studies/${related.slug}`}
                  className="group relative bg-slate-800/30 backdrop-blur rounded-xl border border-slate-700/50 overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] relative overflow-hidden bg-slate-800">
                    {related.image ? (
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-slate-900/80 backdrop-blur text-xs font-medium text-white rounded-full">
                        {related.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {related.title}
                    </h3>
                    {related.summary && (
                      <p className="text-slate-400 text-sm line-clamp-2 mb-3">
                        {related.summary}
                      </p>
                    )}
                    <div className="flex items-center text-cyan-400 text-sm font-medium">
                      Read more
                      <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-sm" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-12 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Want to achieve similar results?
              </h2>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how we can help transform your business with data-driven solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105"
                >
                  Get in Touch
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/industries/${useCase.industry}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-700/50 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all border border-slate-600/50"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Back to {useCase.industry.replace(/-/g, " ")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
