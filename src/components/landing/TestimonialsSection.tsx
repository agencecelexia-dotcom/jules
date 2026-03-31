"use client";

const testimonials = [
  {
    quote:
      "Grace a HandiConnect, nous avons decouvert l'equitation adaptee pour notre fils. Une experience inoubliable !",
    author: "Sophie M.",
    city: "Paris",
    initials: "SM",
  },
  {
    quote:
      "Enfin un espace ou je peux echanger avec des parents qui comprennent notre quotidien. On se sent moins seuls.",
    author: "Karim B.",
    city: "Marseille",
    initials: "KB",
  },
  {
    quote:
      "La communaute nous a aide a trouver un restaurant accessible pour l'anniversaire de ma fille. Merci !",
    author: "Claire D.",
    city: "Lyon",
    initials: "CD",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-hc-text-muted">
            Ils temoignent
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-hc-text mt-4">
            Des familles comme la votre
          </h2>
        </div>

        {/* Testimonial cards — horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {testimonials.map((t, index) => (
            <div
              key={t.author}
              className="card-social p-6 min-w-[300px] md:min-w-0 snap-center relative animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              {/* Decorative quote mark */}
              <span
                className="absolute top-4 left-5 text-4xl leading-none text-hc-coral/20 select-none pointer-events-none"
                aria-hidden="true"
              >
                &#10077;
              </span>

              {/* Quote text */}
              <p className="text-lg font-medium text-hc-text leading-relaxed mt-10 mb-8">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar with gradient ring */}
                <div className="avatar-ring">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xs font-bold text-hc-text">
                    {t.initials}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-sm text-hc-text">{t.author}</p>
                  <p className="text-xs text-hc-text-muted">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
