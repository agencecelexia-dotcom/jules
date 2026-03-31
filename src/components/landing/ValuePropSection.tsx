"use client";

import { Users, Compass, MessageCircle } from "lucide-react";

const cards = [
  {
    icon: Users,
    title: "Partagez vos experiences",
    desc: "Rejoignez une communaute bienveillante de familles qui partagent leurs decouvertes, conseils et retours d'experience.",
    accentColor: "bg-hc-blue",
    iconBg: "bg-hc-blue-muted",
    iconColor: "text-hc-blue",
  },
  {
    icon: Compass,
    title: "Trouvez des lieux adaptes",
    desc: "Decouvrez des etablissements testes et approuves par des familles partageant les memes besoins que les votres.",
    accentColor: "bg-hc-orange",
    iconBg: "bg-hc-orange-muted",
    iconColor: "text-hc-orange",
  },
  {
    icon: MessageCircle,
    title: "Connectez-vous entre familles",
    desc: "Discutez avec d'autres familles et des professionnels engages pour l'inclusion au quotidien.",
    accentColor: "bg-hc-sage",
    iconBg: "bg-hc-sage-muted",
    iconColor: "text-hc-sage",
  },
] as const;

export function ValuePropSection() {
  return (
    <section className="py-28 px-4 bg-white/80">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <span className="uppercase tracking-widest text-xs text-hc-sage font-semibold">
            Notre mission
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-hc-text mt-3">
            Pourquoi HandiConnect ?
          </h2>
        </div>

        {/* Editorial diamond divider */}
        <div className="divider-editorial" />

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="card-editorial card-hover p-8 relative overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 0.08}s` }}
              >
                {/* Top accent bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${card.accentColor}`}
                />

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${card.iconBg} ${card.iconColor} mb-6`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-semibold text-hc-text mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-hc-text-light leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
