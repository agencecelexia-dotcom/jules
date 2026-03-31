"use client";

import { Users, Compass, MessageCircle } from "lucide-react";

const cards = [
  {
    icon: Users,
    title: "Partagez vos experiences",
    desc: "Rejoignez une communaute bienveillante de familles qui partagent leurs decouvertes, conseils et retours d'experience.",
  },
  {
    icon: Compass,
    title: "Trouvez des activites adaptees",
    desc: "Decouvrez des etablissements testes et approuves par des familles partageant les memes besoins.",
  },
  {
    icon: MessageCircle,
    title: "Echangez et connectez-vous",
    desc: "Discutez avec d'autres familles et des professionnels engages pour l'inclusion.",
  },
] as const;

export function ValuePropSection() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl font-bold text-center mb-16 text-hc-text">
          Pourquoi HandiConnect ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-border p-8 text-center animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 0.05}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-hc-blue/10 text-hc-blue mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-hc-text mb-3">
                  {card.title}
                </h3>
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
