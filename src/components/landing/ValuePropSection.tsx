"use client";

const features = [
  {
    number: "01",
    title: "Partagez vos experiences",
    description:
      "Publiez vos sorties, photos et videos. Racontez ce qui a marche (ou pas) pour aider d'autres familles a se lancer.",
  },
  {
    number: "02",
    title: "Decouvrez des lieux adaptes",
    description:
      "Trouvez des activites et etablissements filtres par type de handicap. Fini les mauvaises surprises a l'arrivee.",
  },
  {
    number: "03",
    title: "Reservez en confiance",
    description:
      "Consultez les avis verifies de la communaute et reservez directement. Simple, transparent, sans stress.",
  },
] as const;

export function ValuePropSection() {
  return (
    <section className="py-24 px-4 bg-hc-bg-secondary">
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <p className="text-xs font-semibold uppercase tracking-widest text-hc-text-muted text-center">
          Comment ca marche
        </p>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-hc-text text-center mt-4">
          Simple comme un fil d&apos;actu
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {features.map((f, index) => (
            <div
              key={f.number}
              className="bg-white rounded-2xl p-8 card-hover animate-fade-in-up"
              style={{
                animationDelay: `${(index + 1) * 0.1}s`,
                boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
              }}
            >
              {/* Big number */}
              <span className="text-5xl font-extrabold text-gradient-warm leading-none">
                {f.number}
              </span>

              {/* Title */}
              <h3 className="font-bold text-lg text-hc-text mt-5 mb-3">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-hc-text-secondary text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
