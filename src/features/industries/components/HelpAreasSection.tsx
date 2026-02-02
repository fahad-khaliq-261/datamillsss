import { HelpArea, accentColorClasses, IndustryConfig } from "../types";

interface HelpAreasSectionProps {
  helpAreas: HelpArea[];
  description: string;
  accentColor: IndustryConfig["accentColor"];
}

export default function HelpAreasSection({
  helpAreas,
  description,
  accentColor,
}: HelpAreasSectionProps) {
  const colors = accentColorClasses[accentColor];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="mb-16">
          <span
            className={`${colors.text} text-sm font-semibold tracking-[0.15em] uppercase mb-4 block`}
          >
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a192f] mb-4">
            How we help clients
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {helpAreas.map((area, index) => (
            <div
              key={index}
              className={`group p-8 border border-slate-200 rounded-sm ${colors.border} hover:shadow-lg transition-all duration-300`}
            >
              <div className="text-4xl mb-4">{area.icon}</div>
              <h3
                className={`text-xl font-semibold text-[#0a192f] mb-3 ${colors.groupHover} transition-colors`}
              >
                {area.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

