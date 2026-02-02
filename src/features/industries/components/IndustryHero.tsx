import Link from "next/link";

interface IndustryHeroProps {
  title: string;
  description: string;
  backgroundImage?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function IndustryHero({
  title,
  description,
  backgroundImage,
  breadcrumbs = [],
}: IndustryHeroProps) {
  // Default breadcrumbs if none provided
  const defaultBreadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Industries", href: "/industries" },
    { label: title },
  ];
  
  const navItems = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

  return (
    <section className="relative bg-[#0a192f] overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f] via-[#0a192f]/90 to-[#0a192f]/70" />
      {backgroundImage && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          {navItems.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white">{item.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
    </section>
  );
}

