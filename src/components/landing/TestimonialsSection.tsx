"use client";

const testimonials = [
  {
    quote:
      "Grace a HandiConnect, nous avons decouvert l'equitation adaptee pour notre fils. Une experience inoubliable !",
    author: "Sophie M.",
    city: "Paris",
    offsetClass: "mt-0",
  },
  {
    quote:
      "Enfin un espace ou je peux echanger avec des parents qui comprennent notre quotidien.",
    author: "Karim B.",
    city: "Marseille",
    offsetClass: "md:mt-8",
  },
  {
    quote:
      "La communaute nous a aide a trouver un restaurant accessible pour l'anniversaire de ma fille.",
    author: "Claire D.",
    city: "Lyon",
    offsetClass: "md:mt-4",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-28 px-4 bg-hc-cream-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="uppercase tracking-widest text-xs text-hc-sage font-semibold">
            Temoignages
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-hc-text mt-3">
            Ce que dit la communaute
          </h2>
        </div>

        {/* Testimonials grid with staggered offset */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={t.author}
              className={`${t.offsetClass} animate-fade-in-up`}
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="card-editorial p-8 relative">
                {/* Decorative quotation mark */}
                <span
                  className="absolute top-4 left-6 text-6xl leading-none text-hc-orange/20 font-heading select-none pointer-events-none"
                  aria-hidden="true"
                >
                  &#10077;
                </span>

                {/* Quote */}
                <p className="italic text-lg font-heading text-hc-text leading-relaxed mt-10 mb-6">
                  {t.quote}
                </p>

                {/* Author */}
                <div>
                  <p className="font-semibold text-hc-text">{t.author}</p>
                  <p className="text-sm text-hc-text-muted">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
