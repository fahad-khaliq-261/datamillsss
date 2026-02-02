import { Stat } from "../types";

interface IndustryStatsProps {
  stats: Stat[];
}

export default function IndustryStats({ stats }: IndustryStatsProps) {
  return (
    <section className="bg-slate-900 py-12 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

